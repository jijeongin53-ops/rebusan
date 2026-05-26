import React, { useState } from 'react';
import { PERSONA_RESULTS, BOOKS } from '../data/database';
import MapPicker from './MapPicker';
import { verifyPlaceLocation, createPayPalOrder, saveOrder } from '../services/api';
import { useLanguage } from '../LanguageContext';

const Results = ({ category, onOrderComplete }) => {
    const result = PERSONA_RESULTS[category];
    const book = BOOKS.find(b => b.id === result.link);
    const { t } = useLanguage();

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [detailAddress, setDetailAddress] = useState('');
    const [showDetailInput, setShowDetailInput] = useState(false);
    const [checkingLocation, setCheckingLocation] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('result'); // 'result' | 'checkout' | 'payment'

    const personaTitleKey = `persona${category}Title`;
    const personaDescKey = `persona${category}Desc`;
    const bookKeyMap = {
        'sangdo-1': 'Sangdo',
        'thousand-years': 'Thousand',
        'wintering': 'Wintering'
    };
    const bookKey = bookKeyMap[book.id];

    const handleCheckout = async () => {
        if (!selectedPlace) {
            setError(t('mapEmptyMessage')); // A bit generic but works
            return;
        }
        setCheckingLocation(true);
        setError('');

        const verification = verifyPlaceLocation(selectedPlace);
        setCheckingLocation(false);

        if (verification.valid) {
            setStep('payment');
        } else {
            setError(verification.message);
        }
    };

    const handlePayment = async () => {
        // Simulate PayPal process
        const orderData = await createPayPalOrder(45.00);
        
        // Save order via API layer
        saveOrder({
            paypalOrderId: orderData.id,
            amount: 45.00,
            category: category,
            bookId: book.id,
            deliveryAddress: { ...selectedPlace, detail: detailAddress },
            status: 'COMPLETED'
        });

        setTimeout(() => {
            onOrderComplete();
        }, 500);
    };

    return (
        <div className="results-container" style={{
            padding: '40px 20px',
            minHeight: '100vh',
            background: 'var(--color-bg-light)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {step === 'result' && (
                <div className="glass-card" style={{ maxWidth: '600px', padding: '40px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>{t('yourPersona')}</h3>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{t(personaTitleKey)}</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--color-text-muted)' }}>{t(personaDescKey)}</p>

                    <div className="blind-card" style={{
                        background: book.theme_color,
                        padding: '40px',
                        borderRadius: '12px',
                        color: 'white',
                        marginBottom: '30px',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ color: 'white' }}>{t('mysteryBoxTitle')}</h2>
                        <div style={{ margin: '20px 0', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '20px' }}>
                            <p><strong>{t('curatedScent')}</strong> {t(`book${bookKey}Scent`)}</p>
                            <p style={{ marginTop: '10px' }}><strong>{t('diyBookCover')}</strong> {t('customEdition', { category })}</p>
                        </div>
                        <p style={{ fontStyle: 'italic', opacity: 0.9 }}>{t('mysteryBoxQuote')}</p>
                    </div>

                    <button className="btn-primary" onClick={() => setStep('checkout')}>{t('preorderBtn')}</button>
                </div>
            )}

            {step === 'checkout' && (
                <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
                    <h2>{t('drVerification')}</h2>
                    <p style={{ marginBottom: '20px' }}>{t('drVerifDesc')}</p>

                    <MapPicker
                        onSelect={setSelectedPlace}
                        placeholder={t('mapPlaceholder')}
                        emptyMessage={t('mapEmptyMessage')}
                    />

                    {selectedPlace && (
                        <div style={{ marginTop: '20px' }}>
                            {(!showDetailInput && selectedPlace.name.match(/(hotel|motel|호텔|모텔|inn|hostel|resort|guesthouse)/i)) ? (
                                <button
                                    onClick={() => setShowDetailInput(true)}
                                    style={{
                                        background: 'none',
                                        border: '1px dashed var(--color-primary-light)',
                                        color: 'var(--color-primary-light)',
                                        padding: '12px 15px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        width: '100%',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('addDetailBtn')}
                                </button>
                            ) : (
                                !showDetailInput ? (
                                    <button
                                        onClick={() => setShowDetailInput(true)}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #ddd',
                                            color: 'var(--color-text-muted)',
                                            padding: '12px 15px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {t('addDetailBtn')}
                                    </button>
                                ) : (
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>
                                            {t('detailAddressLabel') || 'Detailed Address (e.g. Room Number)'}
                                        </label>
                                        <input 
                                            type="text"
                                            value={detailAddress}
                                            onChange={(e) => setDetailAddress(e.target.value)}
                                            placeholder={t('detailAddressPlaceholder') || 'Enter room number...'}
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                borderRadius: '10px',
                                                border: '2px solid #ddd',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
                                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                            autoFocus
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '15px' }}>{error}</p>}
                    <button
                        className="btn-primary"
                        onClick={handleCheckout}
                        disabled={checkingLocation}
                        style={{ width: '100%', marginTop: '30px' }}
                    >
                        {checkingLocation ? t('verifying') : t('confirmDelivery')}
                    </button>
                </div>
            )}

            {step === 'payment' && (
                <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center' }}>
                    <h2>{t('orderSummary')}</h2>
                    <div style={{ margin: '20px 0', textAlign: 'left', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                        <p><strong>{t('item')}</strong> {t('itemDesc', { category })}</p>
                        <p><strong>{t('price')}</strong> $45.00 USD</p>
                        <p><strong>{t('deliveryTo')}</strong> {selectedPlace?.name}</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px' }}>{selectedPlace?.address}</p>
                        {detailAddress && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>
                                ↳ {detailAddress}
                            </p>
                        )}
                    </div>
                    <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>{t('paypalPrompt')}</p>
                    <button className="btn-primary" onClick={handlePayment} style={{ width: '100%', background: '#ffc439', color: '#111' }}>
                        {t('payWithPaypal')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Results;

