import React, { useEffect, useState } from 'react';
import { PERSONA_RESULTS } from '../data/database';
import { useLanguage } from '../LanguageContext';
import { appendToSheet, updateSheet } from '../services/googleSheets';

const Results = ({ category, email, answers, onOrderComplete, onRetake }) => {
    const { t } = useLanguage();
    // Fallback just in case
    const safeCategory = category || 'Emotion'; 
    const resultData = PERSONA_RESULTS[safeCategory];
    const [copied, setCopied] = useState(false);

    // 결과를 확인할 수 있는 고유 공유 링크 생성
    const shareLink = `${window.location.origin}${window.location.pathname}?result=${safeCategory}`;

    useEffect(() => {
        // email이 존재할 때만 (즉, 방금 테스트를 완료한 사용자일 때만) 저장
        if (email) {
            const dataToSave = {
                date: new Date().toISOString(),
                email: email,
                answers: answers && answers.length > 0 ? answers.join(' / ') : '',
                result: safeCategory,
                shareLink: shareLink,
                isLinkCopied: false
            };
            // "TestResults" 시트에 데이터 저장
            appendToSheet('TestResults', dataToSave);
        }
    }, [email, safeCategory, shareLink, answers]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            
            // 공유 버튼을 눌렀을 때 해당 이메일의 isLinkCopied 값을 true로 업데이트
            if (email) {
                updateSheet('TestResults', {
                    email: email,
                    isLinkCopied: true
                });
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontFamily: 'var(--font-family-serif)', fontSize: '0.9rem', color: 'var(--color-primary-dark)', letterSpacing: '1px', marginBottom: '16px', fontWeight: '500' }}>
                {t('yourPersona')}
            </p>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>
                {t(`persona${safeCategory}Title`) || resultData.title}
            </h1>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.5', maxWidth: '300px', marginBottom: '40px' }}>
                "{t(`persona${safeCategory}Desc`) || resultData.description}"
            </p>

            <div style={{
                width: '100%',
                background: 'var(--color-accent-gold-light)',
                border: '2px solid var(--color-accent-gold)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '32px',
                textAlign: 'left'
            }}>
                <div style={{ borderBottom: '1px solid rgba(212, 176, 76, 0.3)', padding: '16px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-family-serif)', letterSpacing: '1px', color: 'var(--color-primary-dark)', fontSize: '0.9rem' }}>{t('mysteryBoxTitle')}</span>
                </div>
                <div style={{ padding: '24px', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-accent-gold)' }}>📖</span>
                        <div>
                            <strong>{t('yourCuratedBook') || 'Curated Book:'}</strong> <span style={{ color: 'var(--color-text-muted)' }}>{t('customEdition', { category: safeCategory }) || `Custom ${safeCategory} Edition`}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-accent-gold)' }}>✨</span>
                        <div>
                            <strong>{t('curatedScent')}</strong> <span style={{ color: 'var(--color-text-muted)' }}>{safeCategory === 'Emotion' ? 'Yeongdo Sea Breeze Wood Bookmark' : 'Local Artisan Bookmark'}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#B3913B', fontSize: '0.85rem' }}>
                        {t('mysteryBoxQuote')}
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a 
                    href="https://www.sixshop.com/thehuelab/shop" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-dark" 
                    onClick={() => setTimeout(onOrderComplete, 100)}
                    style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <span style={{ marginRight: '8px' }}>🛍️</span> {t('preorderBtn') || 'Order on Official Mall'}
                </a>
                <button 
                    onClick={handleCopyLink}
                    className="btn-primary"
                    style={{ marginBottom: '10px' }}
                >
                    {copied ? (t('linkCopied') || '링크가 복사되었습니다!') : (t('copyLink') || '🔗 결과 링크 복사 (공유하기)')}
                </button>

                <button 
                    onClick={onRetake}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                    {t('backToMain') || 'Retake Test'}
                </button>
            </div>
        </div>
    );
};

export default Results;
