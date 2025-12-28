import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import styles from './Start.module.css';

interface FormData {
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    timezone: 'Asia/Seoul';
}

interface Errors {
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        birthDate: '',
        birthTime: '',
        timeUnknown: false,
        sex: '',
        calendar: '',
        timezone: 'Asia/Seoul'
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isFormValid =
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '';
        setIsValid(isFormValid);
    }, [formData]);

    const validate = (name?: string) => {
        const newErrors: Errors = { ...errors };

        if (!name || name === 'birthDate') {
            if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택해주세요.';
            else delete newErrors.birthDate;
        }

        if (!name || name === 'sex') {
            if (!formData.sex) newErrors.sex = '성별을 선택해주세요.';
            else delete newErrors.sex;
        }

        if (!name || name === 'calendar') {
            if (!formData.calendar) newErrors.calendar = '달력 종류를 선택해주세요.';
            else delete newErrors.calendar;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (e: React.FocusEvent<any>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSegmentChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate('/processing', { state: formData });
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
