import React from 'react';
import { useLanguage } from '../LanguageContext';

const SecretPage = ({ category, onExplore }) => {
    const { t } = useLanguage();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '40px' }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-primary-dark)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>

            <p style={{ fontFamily: 'var(--font-family-main)', fontSize: '0.85rem', color: 'var(--color-text-main)', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '500' }}>
                {t('paymentCompleted') || 'ORDER CONFIRMED'}
            </p>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>
                {t('mysteryUnveiled') || 'Your Journey Begins'}
            </h1>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '300px', marginBottom: '40px' }}>
                {t('letterContent', { district: 'Busan' }) || '"Busan is a city of layered memories. Your personalized kit is secured and on its way to you."'}
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                <button className="btn-dark" onClick={onExplore}>
                    {t('exploreBtn') || 'Explore Hidden Gems Guide'} <span style={{ marginLeft: '4px' }}>→</span>
                </button>
                <button 
                    onClick={() => window.location.reload()}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                    {t('backToMain') || 'Back to Dashboard'}
                </button>
            </div>
        </div>
    );
};

export default SecretPage;
