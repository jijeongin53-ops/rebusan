import React from 'react';
import { usePsychologyTest } from '../hooks/usePsychologyTest';
import { useLanguage } from '../LanguageContext';

const Test = ({ onComplete, onBack }) => {
    const { t } = useLanguage();
    const { currentQuestion, questions, handleAnswer, isFinished, getResult } = usePsychologyTest();
    const activeQuestion = questions[currentQuestion] || questions[0];
    const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);

    const handleOptionClick = (category) => {
        handleAnswer(category);
        if (currentQuestion >= questions.length - 1) {
            setTimeout(() => onComplete(getResult()), 300);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button 
                onClick={onBack}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <span>{'<'}</span> {t('backToMain')}
            </button>

            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '500' }}>
                    <span>{t('questionProgress', { current: currentQuestion + 1, total: questions.length })}</span>
                    <span>{progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#E0E0E0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: 'var(--color-text-muted)',
                        transition: 'width 0.4s ease'
                    }} />
                </div>
            </div>

            <h2 style={{ fontSize: '2rem', lineHeight: '1.4', marginBottom: '48px', minHeight: '90px' }}>
                {activeQuestion.text}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(option.category)}
                        style={{
                            background: 'var(--color-white)',
                            border: '1px solid var(--color-white)', // Hide border initially, use shadow
                            boxShadow: 'var(--shadow-soft)',
                            padding: '20px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '1rem',
                            color: 'var(--color-text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
                    >
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#EAEAEA',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'var(--color-text-muted)',
                            fontWeight: '500',
                            flexShrink: 0
                        }}>
                            {idx + 1}
                        </div>
                        <span style={{ lineHeight: '1.4' }}>{option.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Test;
