import React from 'react';

const SecretPage = ({ category, onExplore }) => {
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
                ORDER CONFIRMED
            </p>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>
                Your Journey Begins
            </h1>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '300px', marginBottom: '40px' }}>
                "Busan is a city of layered memories. Your personalized kit is secured and on its way to you."
            </p>

            <div style={{
                width: '100%',
                background: 'var(--color-accent-gold-light)',
                border: '2px solid var(--color-accent-gold)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '40px',
                textAlign: 'left'
            }}>
                <div style={{ borderBottom: '1px solid rgba(212, 176, 76, 0.3)', padding: '16px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-family-main)', letterSpacing: '1.5px', color: '#B3913B', fontSize: '0.85rem', fontWeight: '600' }}>DELIVERY CONCIERGE INFO</span>
                </div>
                <div style={{ padding: '24px', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <strong>Destination:</strong> <span style={{ color: 'var(--color-text-muted)' }}>Lotte Hotel Busan (Busan Lobby)</span>
                    </div>
                    <div>
                        <strong>Estimated Time:</strong> <span style={{ color: 'var(--color-text-muted)' }}>Hand-delivered by 6:00 PM</span>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <button className="btn-dark" onClick={onExplore}>
                    Explore Hidden Gems Guide <span style={{ marginLeft: '4px' }}>→</span>
                </button>
                <button 
                    onClick={() => window.location.reload()}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default SecretPage;
