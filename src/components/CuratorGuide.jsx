import React, { useState, useEffect } from 'react';
import { getTourismSpots, getTourismComments, saveTourismComment } from '../services/api';
import { useLanguage } from '../LanguageContext';

const SpotCard = ({ spot }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ nickname: '', text: '' });
    const { t } = useLanguage();

    useEffect(() => {
        const data = getTourismComments(spot.id);
        setTimeout(() => setComments(data), 0);
    }, [spot.id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.nickname || !newComment.text) return;
        const updated = saveTourismComment({ ...newComment, spotId: spot.id });
        setComments(updated);
        setNewComment({ nickname: '', text: '' });
    };

    return (
        <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 'bold', textTransform: 'uppercase' }}>{spot.district}</span>
            <h3 style={{ margin: '10px 0 5px 0' }}>{spot.name}</h3>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '15px' }}>{spot.address}</div>
            <p style={{ lineHeight: '1.7', color: 'var(--color-text-main)', flex: 1 }}>{spot.description}</p>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{t('visitorComments')} ({comments.length})</h4>

                <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '20px' }}>
                    {comments.length === 0 && <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic' }}>{t('beTheFirst')}</p>}
                    {comments.map(c => (
                        <div key={c.id} style={{ marginBottom: '12px', fontSize: '0.85rem' }}>
                            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{c.nickname}</span>
                            <span style={{ color: '#666' }}>{c.text}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleCommentSubmit} style={{ display: 'grid', gap: '8px' }}>
                    <input
                        type="text"
                        placeholder={t('nicknamePlaceholder')}
                        value={newComment.nickname}
                        onChange={e => setNewComment({ ...newComment, nickname: e.target.value })}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                    />
                    <textarea
                        placeholder={t('shareExperience')}
                        value={newComment.text}
                        onChange={e => setNewComment({ ...newComment, text: e.target.value })}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem', height: '60px' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '8px', fontSize: '0.8rem' }}>{t('postComment')}</button>
                </form>
            </div>
        </div>
    );
};

const CuratorGuide = ({ onBack }) => {
    const [spots, setSpots] = useState([]);
    const [activeDistrict, setActiveDistrict] = useState('All');
    const { t } = useLanguage();

    useEffect(() => {
        const data = getTourismSpots();
        setTimeout(() => setSpots(data), 0);
    }, []);

    const districts = ['All', 'Yeongdo-gu', 'Jung-gu', 'Seo-gu', 'Dong-gu'];

    const filteredSpots = activeDistrict === 'All'
        ? spots
        : spots.filter(s => s.district === activeDistrict);

    return (
        <div className="guide-container" style={{ minHeight: '100vh', background: 'var(--color-bg-light)', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <button onClick={onBack} style={{ marginBottom: '30px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>{t('backToMain')}</button>

                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{t('historicGuideTitle')}</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>{t('historicGuideDesc')}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {districts.map(d => (
                        <button
                            key={d}
                            onClick={() => setActiveDistrict(d)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '30px',
                                border: '1px solid var(--color-primary-dark)',
                                background: activeDistrict === d ? 'var(--color-primary-dark)' : 'white',
                                color: activeDistrict === d ? 'white' : 'var(--color-primary-dark)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            {d === 'All' ? t('allDistricts') : d}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                    {filteredSpots.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#999' }}>
                            <h3>{t('noSpotsAdded')}</h3>
                            <p>{t('adminDataRequired')}</p>
                        </div>
                    )}
                    {filteredSpots.map(spot => (
                        <SpotCard key={spot.id} spot={spot} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CuratorGuide;

