import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const Signup = ({ onComplete }) => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 간단한 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError(t('emailRequired') || '이메일을 입력해주세요.');
            return;
        }
        if (!emailRegex.test(email)) {
            setError(t('emailInvalid') || '유효한 이메일 형식이 아닙니다.');
            return;
        }
        setError('');
        onComplete(email);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <div className="text-center" style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '16px' }}>
                    {t('signupTitle') || '회원 가입'}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto', fontSize: '0.95rem' }}>
                    {t('signupDesc') || '결과를 저장하고 받아보실 이메일을 입력해주세요.'}
                </p>
            </div>

            <div className="dark-card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#E0E0E0' }}>
                            {t('emailLabel') || '이메일 주소'}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="example@email.com"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#FFF',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        {error && <p style={{ color: '#FF6B6B', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>}
                    </div>
                    
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        {t('signupSubmitBtn') || '가입하고 시작하기'} <span style={{ marginLeft: '4px' }}>→</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
