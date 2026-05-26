import React from 'react';
import { usePsychologyTest } from '../hooks/usePsychologyTest';
import { useLanguage } from '../LanguageContext';
import { saveTestResult } from '../services/api';

const Test = ({ onComplete }) => {
    const { currentQuestion, questions, handleAnswer, isFinished, getResult, scores } = usePsychologyTest();
    const { t } = useLanguage();

    const activeQuestion = questions[currentQuestion];

    const handleOptionClick = (category) => {
        handleAnswer(category);
        if (isFinished) {
            // Delay slightly for smooth transition
            setTimeout(() => {
                const finalCategory = getResult();
                saveTestResult(finalCategory, scores);
                onComplete(finalCategory);
            }, 500);
        }
    };

    return (
        <div className="test-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            background: 'var(--color-bg-light)'
        }}>
            <div className="progress-bar" style={{ width: '100%', maxWidth: '600px', height: '8px', background: '#ddd', borderRadius: '4px', marginBottom: '40px' }}>
                <div style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    height: '100%',
                    background: 'var(--color-primary-light)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                }} />
            </div>

            <div className="glass-card" style={{ padding: '40px', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '10px', display: 'block' }}>
                    {t('questionProgress', { current: currentQuestion + 1, total: questions.length })}
                </span>
                <h2 style={{ marginBottom: '30px', minHeight: '80px' }}>{activeQuestion.text}</h2>

                <div style={{ display: 'grid', gap: '15px' }}>
                    {activeQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            className="btn-option"
                            onClick={() => handleOptionClick(option.category)}
                            style={{
                                background: 'white',
                                border: '1px solid #ddd',
                                padding: '20px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = 'var(--color-primary-light)';
                                e.target.style.background = '#f0f7ff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = '#ddd';
                                e.target.style.background = 'white';
                            }}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Test;
