import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import styles from './Start.module.css';

import { InputSchema } from '@contracts/input.schema';
import { sanitizeUserName, detectScriptType } from '@contracts/shared/nameSanitize';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean | null;
    timezone: 'Asia/Seoul';
}

interface Errors {
    [key: string]: string | undefined;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        birthDate: '',
        birthTime: '',
        timeUnknown: false,
        sex: '',
        calendar: '',
        isLeapMonth: null,
        timezone: 'Asia/Seoul'
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const leapValid = formData.calendar !== 'lunar' || formData.isLeapMonth !== null;
        const timeValid = formData.timeUnknown || formData.birthTime !== '';

        setIsValid(
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '' &&
            leapValid &&
            timeValid
        );
    }, [formData]);

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFormData(prev => ({ ...prev, birthDate: val }));
        if (touched.birthDate) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                setErrors(prev => ({ ...prev, birthDate: '생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).' }));
            } else {
                setErrors(prev => ({ ...prev, birthDate: undefined }));
            }
        }
    };

    const handleSexChange = (sex: 'male' | 'female') => {
        setFormData(prev => ({ ...prev, sex }));
        setTouched(prev => ({ ...prev, sex: true }));
        setErrors(prev => ({ ...prev, sex: undefined }));
    };

    const handleCalendarChange = (calendar: 'solar' | 'lunar') => {
        setFormData(prev => ({
            ...prev,
            calendar,
            isLeapMonth: calendar === 'solar' ? null : prev.isLeapMonth
        }));
        setTouched(prev => ({ ...prev, calendar: true }));
        setErrors(prev => ({ ...prev, calendar: undefined }));
    };

    const handleTimeUnknownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            timeUnknown: checked,
            birthTime: checked ? '' : prev.birthTime
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'userName' && isComposing) return;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isComposing, setIsComposing] = useState(false);

    const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
        if (e.type === 'compositionstart') {
            setIsComposing(true);
        } else if (e.type === 'compositionend') {
            setIsComposing(false);
            const finalValue = sanitizeUserName(e.currentTarget.value);
            setFormData(prev => ({ ...prev, userName: finalValue }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // [REFACTOR-R1] Final Sanitize & Trim on Submit.
        const safeName = sanitizeUserName(formData.userName).trim();

        // [REFACTOR-R2] Use Shared Input Schema for Runtime Validation
        const validationResult = InputSchema.safeParse({
            ...formData,
            userName: safeName || undefined // userName is optional
        });

        if (!validationResult.success) {
            const newErrors: Errors = {};
            validationResult.error.issues.forEach(issue => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        const payload = validationResult.data;
        navigate('/processing', {
            state: {
                ...payload,
                scriptType: safeName ? detectScriptType(safeName) : undefined
            }
        });
    };

    return (
        <Container>
            <Header />
            <main className={styles.main}>
                <Card className={styles.startCard}>
                    <h1 className={styles.title}>운명의 기원을 찾아서</h1>
                    <p className={styles.subtitle}>정확한 명식 분석을 위해 정보를 입력해주세요.</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* 이름 입력 */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>이름 (선택)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onCompositionStart={handleComposition}
                                onCompositionEnd={handleComposition}
                                onBlur={handleBlur}
                                placeholder="이름을 입력해주세요 (선택)"
                                className={styles.input}
                                autoComplete="name"
                            />
                            <p className={styles.hint}>한글, 한자, 영문 입력이 가능합니다. (IME 보호 적용)</p>
                            {errors.userName && <p className={styles.error}>{errors.userName}</p>}
                        </div>

                        {/* 생년월일 */}
                        <div className={styles.field}>
                            <label htmlFor="birthDate" className={styles.label}>생년월일</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleBirthDateChange}
                                onBlur={handleBlur}
                                className={styles.input}
                                required
                            />
                            {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                        </div>

                        {/* 성별 선택 */}
                        <div className={styles.field}>
                            <label className={styles.label}>성별</label>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => handleSexChange('male')}
                                    className={`${styles.selectionButton} ${formData.sex === 'male' ? styles.active : ''}`}
                                >
                                    남성
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSexChange('female')}
                                    className={`${styles.selectionButton} ${formData.sex === 'female' ? styles.active : ''}`}
                                >
                                    여성
                                </button>
                            </div>
                            {errors.sex && <p className={styles.error}>{errors.sex}</p>}
                        </div>

                        {/* 양력/음력 */}
                        <div className={styles.field}>
                            <label className={styles.label}>양력/음력</label>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => handleCalendarChange('solar')}
                                    className={`${styles.selectionButton} ${formData.calendar === 'solar' ? styles.active : ''}`}
                                >
                                    양력
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCalendarChange('lunar')}
                                    className={`${styles.selectionButton} ${formData.calendar === 'lunar' ? styles.active : ''}`}
                                >
                                    음력
                                </button>
                            </div>
                            {errors.calendar && <p className={styles.error}>{errors.calendar}</p>}
                        </div>

                        {/* 음력일 경우 윤달 여부 */}
                        {formData.calendar === 'lunar' && (
                            <div className={styles.field}>
                                <label className={styles.label}>윤달 여부</label>
                                <div className={styles.buttonGroup}>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isLeapMonth: false }))}
                                        className={`${styles.selectionButton} ${formData.isLeapMonth === false ? styles.active : ''}`}
                                    >
                                        평달
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isLeapMonth: true }))}
                                        className={`${styles.selectionButton} ${formData.isLeapMonth === true ? styles.active : ''}`}
                                    >
                                        윤달
                                    </button>
                                </div>
                                {errors.isLeapMonth && <p className={styles.error}>{errors.isLeapMonth}</p>}
                            </div>
                        )}

                        {/* 태어난 시간 */}
                        <div className={styles.field}>
                            <div className={styles.labelRow}>
                                <label htmlFor="birthTime" className={styles.label}>태어난 시간</label>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.timeUnknown}
                                        onChange={handleTimeUnknownChange}
                                    />
                                    모름
                                </label>
                            </div>
                            {!formData.timeUnknown && (
                                <input
                                    type="time"
                                    id="birthTime"
                                    name="birthTime"
                                    value={formData.birthTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={styles.input}
                                    required
                                />
                            )}
                            {errors.birthTime && <p className={styles.error}>{errors.birthTime}</p>}
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!isValid}
                        >
                            기원 분석 시작
                        </button>
                    </form>
                </Card>
            </main>
        </Container>
    );
};
