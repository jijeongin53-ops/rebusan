import React from 'react';
import { useLanguage } from '../LanguageContext';

const Landing = ({ onStartTest, onOpenGuide, onOpenAdmin }) => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="landing-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Prevent top-clipping on long content
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px',
            background: '#e8f5e9', // Light green background
            color: '#333',
        }}>
            <div style={{ 
                display: 'flex', 
                gap: '10px', 
                width: '100%', 
                maxWidth: '800px', 
                justifyContent: 'flex-end', 
                marginBottom: '15px',
                marginTop: '10px' // Added top margin for safety
            }}>
                {['en', 'ja', 'zh'].map(lang => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        style={{
                            background: language === lang ? '#1b5e20' : 'white',
                            color: language === lang ? 'white' : '#1b5e20',
                            border: '1px solid #1b5e20',
                            borderRadius: '4px',
                            padding: '6px 12px', // Made touch target slighly larger for mobile
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            <div className="glass-card" style={{
                padding: '60px',
                width: '100%',
                maxWidth: '800px',
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                color: 'black'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#1b5e20' }}>{t('landingTitle')}</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', color: '#444' }}>
                    {t('landingDesc')}
                </p>

                <div className="responsive-grid" style={{ marginTop: '20px' }}>
                    <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '16px', border: '1px solid #eee' }}>
                        <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>{t('mindfulTitle')}</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '20px', color: '#666' }}>{t('mindfulDesc')}</p>
                        <button className="btn-primary" onClick={onStartTest} style={{ width: '100%' }}>
                            {t('startTestBtn')}
                        </button>
                    </div>
                    <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '16px', border: '1px solid #eee' }}>
                        <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>{t('historicTitle')}</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '20px', color: '#666' }}>{t('historicDesc')}</p>
                        <button className="btn-primary" onClick={onOpenGuide} style={{ width: '100%', background: 'transparent', border: '1px solid #1b5e20', color: '#1b5e20' }}>
                            {t('exploreBtn')}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ fontSize: '0.9rem', color: '#2e7d32', fontWeight: '500' }}>{t('footerText')}</p>
                <button
                    onClick={onOpenAdmin}
                    style={{ background: 'none', border: 'none', color: '#2e7d32', opacity: 0.5, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    {t('adminAccess')}
                </button>
            </div>
        </div>
    );
};

export default Landing;
