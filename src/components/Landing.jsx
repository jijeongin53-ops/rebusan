import React from 'react';

const Landing = ({ onStartTest, onOpenGuide, onOpenAdmin }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <div className="text-center" style={{ marginBottom: '40px' }}>
                <p style={{ fontFamily: 'var(--font-family-serif)', color: 'var(--color-primary-dark)', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '16px' }}>
                    AI TRAVEL CURATOR
                </p>
                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '16px' }}>
                    Experience<br/>
                    the soul of Busan
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto', fontSize: '0.95rem' }}>
                    Discover curated books, bespoke regional scents, and deep stories.
                </p>
            </div>

            <div className="dark-card" style={{ width: '100%' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '500', marginBottom: '16px' }}>
                    Find Your<br/>
                    Travel Persona
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#E0E0E0', marginBottom: '32px', opacity: 0.9 }}>
                    Unlock a personalized<br/>Mystery Box matching your<br/>inner travel emotions
                </p>
                <button className="btn-primary" onClick={onStartTest}>
                    Start Persona Test <span style={{ marginLeft: '4px' }}>→</span>
                </button>
            </div>

            <div style={{ marginTop: '32px' }}>
                <button
                    onClick={onOpenAdmin}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', opacity: 0.3, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    [ Curator Admin Access ]
                </button>
            </div>
        </div>
    );
};

export default Landing;
