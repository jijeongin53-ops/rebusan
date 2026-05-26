import React from 'react';
import { BOOKS, PERSONA_RESULTS } from '../data/database';
import { useLanguage } from '../LanguageContext';

const SecretPage = ({ category }) => {
    const result = PERSONA_RESULTS[category];
    const book = BOOKS.find(b => b.id === result.link);
    const { t } = useLanguage();

    const bookKeyMap = {
        'sangdo-1': 'Sangdo',
        'thousand-years': 'Thousand',
        'wintering': 'Wintering'
    };
    const bookKey = bookKeyMap[book.id];

    return (
        <div className="secret-container" style={{
            padding: '60px 20px',
            minHeight: '100vh',
            background: 'white',
            color: 'var(--color-primary-dark)'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ padding: '8px 16px', background: '#e1f5fe', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{t('paymentCompleted')}</span>
                    <h1 style={{ marginTop: '20px', fontSize: '3rem' }}>{t('mysteryUnveiled')}</h1>
                </div>

                <div className="reveal-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
                    <div>
                        <h2 style={{ borderBottom: '2px solid var(--color-primary-dark)', paddingBottom: '10px' }}>{t('yourCuratedBook')}</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: 'var(--color-primary-light)' }}>
                            {t('bookCuratedForYou')}
                        </h3>
                        <p style={{ marginTop: '20px', lineHeight: '1.8' }}>
                            {t('bookCuratorDesc')}
                        </p>
                        <div style={{ marginTop: '30px', padding: '20px', background: 'var(--color-bg-light)', borderRadius: '12px' }}>
                            <h4>{t('theScentProfile')}</h4>
                            <p>{t(`book${bookKey}Scent`)}</p>
                        </div>
                    </div>
                    <div style={{ background: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '40px' }}>
                        <div style={{ width: '150px', height: '150px', background: '#ccc', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {t('qrPlaceholder')}
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>{t('qrDesc', { district: book.district })}</p>
                    </div>
                </div>

                <div className="letter-section" style={{ padding: '40px', background: 'var(--color-accent-sand)', borderRadius: '16px', fontStyle: 'italic' }}>
                    <h3 style={{ marginBottom: '20px' }}>{t('letterTitle')}</h3>
                    <p>{t('letterContent', { district: book.district })}</p>
                </div>
            </div>
        </div>
    );
};

export default SecretPage;
