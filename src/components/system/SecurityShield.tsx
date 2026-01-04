import React from 'react';
import { PaperBackground } from '../layout/PaperBackground';
import { Footer } from '../layout/Footer';

interface SecurityShieldProps {
    reason: string | null;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({ reason }) => {
    return (
        <PaperBackground>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '2rem',
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0,0,0,0.02)'
            }}>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: '1.5rem',
                    filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))'
                }}>
                    🛡️
                </div>
                <h1 style={{
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    letterSpacing: '0.1em'
                }}>
                    SECURITY SHIELD ACTIVE
                </h1>
                <p style={{
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    wordBreak: 'keep-all'
                }}>
                    {reason === "MISSING_FIREBASE_CONFIG"
                        ? "Vite 빌드 타임에 필수 Firebase 설정(Project ID 등)이 주입되지 않아 앱 실행이 원천 차단되었습니다."
                        : "이 빌드에 필수 보안 설정(reCAPTCHA Site Key)이 누락되어 배포 및 API 호출이 원격 차단되었습니다."
                    }
                </p>
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--surface)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    color: '#e74c3c',
                    border: '1px solid rgba(231,76,60,0.2)'
                }}>
                    ERRORCODE: {reason || "UNKNOWN_SECURITY_FAIL"}
                </div>
                <p style={{
                    marginTop: '1.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.8rem'
                }}>
                    관리자 가이드에 따라 .env.production.local 설정을 확인하십시오.
                </p>
            </div>
            <Footer />
        </PaperBackground>
    );
};
