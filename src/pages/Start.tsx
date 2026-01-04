import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { detectScriptType } from '../lib/text';
import styles from './Start.module.css';

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
    userName?: string;
    birthDate?: string;
    birthTime?: string;
    sex?: string;
    calendar?: string;
    isLeapMonth?: string;
}

import { sanitizeUserName, NAME_SANITIZE } from '../lib/nameSanitize';

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
    const [isComposing, setIsComposing] = useState(false);

    useEffect(() => {
        const leapValid = formData.calendar !== 'lunar' || formData.isLeapMonth !== null;
        const isFormValid =
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '' &&
            leapValid;
        setIsValid(isFormValid);
    }, [formData]);

    useEffect(() => {
        // timeUnknown 토글 시 즉각 검증/메시지 반영
        validate('birthTime');
    }, [formData.timeUnknown]);

    const validate = (name?: string) => {
        const newErrors: Errors = { ...errors };

        if (!name || name === 'birthDate') {
            if (!formData.birthDate) {
                newErrors.birthDate = '생년월일을 선택해주세요.';
            } else {
                const year = parseInt(formData.birthDate.split('-')[0]);
                if (year < 1900 || year > 2099) {
                    newErrors.birthDate = '1900년~2099년 사이의 유효한 날짜를 입력하세요.';
                } else {
                    delete newErrors.birthDate;
                }
            }
        }

        if (!name || name === 'sex') {
            if (!formData.sex) newErrors.sex = '성별을 선택해주세요.';
            else delete newErrors.sex;
        }

        if (!name || name === 'calendar') {
            if (!formData.calendar) newErrors.calendar = '달력 종류를 선택해주세요.';
            else delete newErrors.calendar;
        }

        // [P1-ATOMIC-003] Lunar Calendar & Leap Month Validation
        if (!name || name === 'calendar' || name === 'isLeapMonth') {
            if (formData.calendar === 'lunar') {
                if (formData.isLeapMonth === null) {
                    newErrors.isLeapMonth = '윤달 여부를 선택해주세요.';
                } else {
                    delete newErrors.isLeapMonth;
                }
            } else {
                delete newErrors.isLeapMonth;
            }
        }

        // [P1-ATOMIC-004] Time Unknown & Birth Time Validation
        if (!name || name === 'birthTime' || name === 'timeUnknown') {
            if (!formData.timeUnknown) {
                // If time is KNOWN, birthTime is REQUIRED.
                if (!formData.birthTime) {
                    newErrors.birthTime = '태어난 시간을 입력해주세요. (모를 경우 "시간 모름" 체크)'; // Korean Error
                } else {
                    // Simple format check (HH:mm)
                    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                    if (!timeRegex.test(formData.birthTime)) {
                        newErrors.birthTime = '시간 형식이 올바르지 않습니다 (HH:mm).';
                    } else {
                        delete newErrors.birthTime;
                    }
                }
            } else {
                // If time is UNKNOWN, clear any birthTime errors
                delete newErrors.birthTime;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        let filteredValue: string | boolean = value;

        if (name === 'userName') {
            // [ATOMIC-02] IME Safe: Update raw value immediately. Do NOT sanitize here.
            filteredValue = value;
        }

        // Handle Checkboxes
        if (name === 'isLeapMonth' && type === 'radio') {
            filteredValue = value === 'true';
        } else if (type === 'checkbox') {
            filteredValue = checked;
        }

        setFormData(prev => ({ ...prev, [name]: filteredValue }));

        if (name === 'isLeapMonth') {
            setTouched(prev => ({ ...prev, isLeapMonth: true }));
        }
    };

    const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
        if (e.type === 'compositionstart') {
            setIsComposing(true);
        } else if (e.type === 'compositionend') {
            setIsComposing(false);
            // [P1-ATOMIC-001/002] Final sanitize on composition end using shared utility
            const finalValue = sanitizeUserName(e.currentTarget.value);
            setFormData(prev => ({
                ...prev,
                userName: finalValue
            }));
        }
    };

    const handleSegmentChange = (name: string, value: string) => {
        setFormData(prev => {
            if (name === 'calendar') {
                // 음력 선택 시 윤달 여부를 반드시 다시 선택하도록 초기화
                const nextLeap = value === 'lunar' ? null : false;
                return { ...prev, calendar: value as any, isLeapMonth: nextLeap };
            }
            return { ...prev, [name]: value };
        });
        setTouched(prev => ({ ...prev, [name]: true, ...(name === 'calendar' ? { isLeapMonth: false } : {}) }));
        validate(name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // [P1-ATOMIC-001/002] Final Sanitize on Submit
        const safeName = sanitizeUserName(formData.userName).trim();

        if (validate()) {
            const payload: any = {
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                timeUnknown: formData.timeUnknown,
                sex: formData.sex,
                calendar: formData.calendar,
                isLeapMonth: formData.isLeapMonth,
                timezone: formData.timezone
            };

            // Only include userName and scriptType if name is provided
            if (safeName.length > 0) {
                payload.userName = safeName;
                payload.scriptType = detectScriptType(safeName);
            }

            navigate('/processing', { state: payload });
        }
    };

    return (
        <div className={styles.startPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.pageHeader}>
                    <h2 className={styles.title}>데이터 입력</h2>
                    <p className={styles.helperText}>정확한 분석을 위해 당신의 탄생 정보를 입력해주세요. 입력은 최소화되어 있습니다.</p>
                </div>

                <Card className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Name */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>성명 (한자 권장, 한글 가능)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onCompositionStart={handleComposition}
                                onCompositionEnd={handleComposition}
                                onBlur={handleBlur}
                                placeholder="예: 洪吉童 또는 홍길동"
                                className={`${styles.input} ${touched.userName && errors.userName ? styles.inputError : ''}`}
                            />
                            {touched.userName && errors.userName && (
                                <span className={styles.errorMsg}>{errors.userName}</span>
                            )}
                        </div>

                        {/* Birth Date */}
                        <div className={styles.field}>
                            <label htmlFor="birthDate" className={styles.label}>생년월일 (필수)</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${styles.input} ${touched.birthDate && errors.birthDate ? styles.inputError : ''}`}
                                required
                            />
                            {touched.birthDate && errors.birthDate && (
                                <span className={styles.errorMsg}>{errors.birthDate}</span>
                            )}
                        </div>

                        {/* Birth Time */}
                        <div className={styles.field}>
                            <div className={styles.labelRow}>
                                <label htmlFor="birthTime" className={styles.label}>출생 시간 (선택)</label>
                                <div className={styles.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="timeUnknown"
                                        name="timeUnknown"
                                        checked={formData.timeUnknown}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="timeUnknown" className={styles.toggleLabel}>시간 모름</label>
                                </div>
                            </div>
                            <input
                                type="time"
                                id="birthTime"
                                name="birthTime"
                                value={formData.birthTime}
                                onChange={handleChange}
                                disabled={formData.timeUnknown}
                                className={styles.input}
                            />
                            <p className={styles.helperText}>
                                QA: 시간을 모르면 반드시 "시간 모름"을 켜고, 시간을 아는 경우에는 토글을 끄고 HH:mm 형식으로 입력해야 제출이 가능해야 합니다. 토글 전환 시 시간 입력란이 즉시 비활성/활성화되는지 확인해주세요.
                            </p>
                        </div>

                        {/* Sex */}
                        <div className={styles.field}>
                            <span className={styles.label}>성별 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'male' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'male')}
                                >
                                    남
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'female' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'female')}
                                >
                                    여
                                </button>
                            </div>
                            {touched.sex && errors.sex && (
                                <span className={styles.errorMsg}>{errors.sex}</span>
                            )}
                        </div>

                        {/* Calendar Type */}
                        <div className={styles.field}>
                            <span className={styles.label}>양력 / 음력 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'solar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'solar')}
                                >
                                    양력
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'lunar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'lunar')}
                                >
                                    음력
                                </button>
                            </div>
                            {touched.calendar && errors.calendar && (
                                <span className={styles.errorMsg}>{errors.calendar}</span>
                            )}
                        </div>

                        {/* Leap Month (Conditional) */}
                        {formData.calendar === 'lunar' && (
                            <div className={styles.field}>
                                <span className={styles.label}>윤달 여부 (필수)</span>
                                <div className={styles.segmentControl}>
                                    <label className={styles.segmentOption}>
                                        <input
                                            type="radio"
                                            name="isLeapMonth"
                                            value="false"
                                            checked={formData.isLeapMonth === false}
                                            onChange={handleChange}
                                        />
                                        평달
                                    </label>
                                    <label className={styles.segmentOption}>
                                        <input
                                            type="radio"
                                            name="isLeapMonth"
                                            value="true"
                                            checked={formData.isLeapMonth === true}
                                            onChange={handleChange}
                                        />
                                        윤달
                                    </label>
                                </div>
                                <p className={styles.helperText}>
                                    QA: 음력 선택 시 윤달 여부를 선택하지 않으면 제출 버튼이 비활성화되고 오류 메시지가 노출되는지 확인해주세요.
                                </p>
                                {touched.isLeapMonth && errors.isLeapMonth && (
                                    <span className={styles.errorMsg}>{errors.isLeapMonth}</span>
                                )}
                            </div>
                        )}

                        {/* Timezone (Read-only) */}
                        <div className={styles.field}>
                            <label className={styles.label}>타임존</label>
                            <input
                                type="text"
                                value={formData.timezone}
                                readOnly
                                className={`${styles.input} ${styles.readOnly}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={styles.submitBtn}
                        >
                            분석 시작하기 →
                        </button>
                    </form>
                </Card>
            </Container>
        </div>
    );
};
