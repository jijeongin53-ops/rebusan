import React from 'react';
import { useLanguage } from '../LanguageContext';

const Landing = ({ onStartTest, onOpenGuide, onOpenAdmin }) => {
    const { t } = useLanguage();
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <div className="text-center" style={{ marginBottom: '40px' }}>
                <p style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-primary-dark)', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '16px' }}>
                    ReBusan
                </p>
                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '16px' }}>
                    {t('landingTitle')}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto', fontSize: '0.95rem' }}>
                    {t('landingDesc')}
                </p>
            </div>

            <div className="dark-card" style={{ width: '100%' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '500', marginBottom: '16px' }}>
                    {t('mindfulTitle')}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#E0E0E0', marginBottom: '32px', opacity: 0.9 }}>
                    {t('mindfulDesc')}
                </p>
                <button className="btn-primary" onClick={onStartTest}>
                    {t('startTestBtn')} <span style={{ marginLeft: '4px' }}>→</span>
                </button>
            </div>

            <div style={{ marginTop: '32px' }}>
                <button
                    onClick={onOpenAdmin}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', opacity: 0.3, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    {t('adminAccess')}
                </button>
            </div>
        </div>
    );
};

export default Landing;
