import React, { useState, useEffect } from 'react';
import { getTourismSpots, getTourismComments, saveTourismComment } from '../services/api';
import { useLanguage } from '../LanguageContext';

const SpotCard = ({ spot }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ nickname: '', text: '' });
    const { t } = useLanguage();

    useEffect(() => {
        const load = async () => {
            const data = await getTourismComments(spot.id);
            setComments(data);
        };
        load();
    }, [spot.id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.nickname || !newComment.text) return;
        const updated = await saveTourismComment({ ...newComment, spotId: spot.id });
        setComments(updated);
        setNewComment({ nickname: '', text: '' });
    };

    // Use a default image if spot doesn't have one
    const defaultImage = spot.category === 'VIEW' 
        ? 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?q=80&w=2070&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop';

    return (
        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ height: '200px', background: `url(${spot.imageUrl || defaultImage}) center/cover`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-primary-dark)' }}>
                    {spot.category || 'HERITAGE'}
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', color: 'white' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>
                        {spot.district}
                    </div>
                    <h3 style={{ color: 'white', fontSize: '1.3rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'var(--font-family-serif)' }}>
                        {spot.name}
                    </h3>
                </div>
            </div>
            
            <div style={{ padding: '20px' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {spot.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A68A64', fontSize: '0.8rem', marginBottom: '16px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {spot.address}
                </div>
                {spot.link && (
                    <a href={spot.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '24px', padding: '8px 16px', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: '20px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '500' }}>
                        🔗 Visit Location / Website
                    </a>
                )}

                {/* Comments Section */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>{t('visitorComments')} ({comments.length})</h4>
                    
                    <div style={{ maxHeight: '120px', overflowY: 'auto', marginBottom: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {comments.length === 0 && <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>{t('beTheFirst') || 'Be the first to share your experience.'}</p>}
                        {comments.map(c => (
                            <div key={c.id}>
                                <strong style={{ color: 'var(--color-text-main)' }}>{c.nickname}: </strong>
                                <span style={{ color: 'var(--color-text-muted)' }}>{c.text}</span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                            type="text"
                            placeholder={t('nicknamePlaceholder') || "Nickname"}
                            value={newComment.nickname}
                            onChange={e => setNewComment({ ...newComment, nickname: e.target.value })}
                            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                        />
                        <textarea
                            placeholder={t('shareExperience') || "Share your experience..."}
                            value={newComment.text}
                            onChange={e => setNewComment({ ...newComment, text: e.target.value })}
                            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem', height: '60px', resize: 'none' }}
                        />
                        <button type="submit" className="btn-dark" style={{ padding: '10px', fontSize: '0.85rem', borderRadius: '8px' }}>{t('postComment') || 'Post'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CuratorGuide = ({ onBack }) => {
    const [spots, setSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeDistrict, setActiveDistrict] = useState('All');
    const { t } = useLanguage();

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            const data = await getTourismSpots();
            setSpots(data);
            setIsLoading(false);
        };
        load();
    }, []);

    const districts = ['All', 'Yeongdo-gu', 'Jung-gu', 'Seo-gu', 'Dong-gu'];

    const filteredSpots = activeDistrict === 'All'
        ? spots
        : spots.filter(s => s.district === activeDistrict);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <p style={{ fontFamily: 'var(--font-family-main)', fontSize: '0.8rem', color: '#B3913B', letterSpacing: '1px', marginBottom: '8px', fontWeight: '600' }}>
                SENSORY CONCIERGE
            </p>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
                {t('historicGuideTitle') || 'Hidden Gems Guide'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                {t('historicGuideDesc') || 'Discover secret local spaces inside the old alleys of Busan.'}
            </p>

            {/* Filter Tags */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '24px', margin: '0 -20px 24px -20px', padding: '0 20px 24px 20px', scrollbarWidth: 'none' }}>
                {districts.map(d => {
                    const isActive = activeDistrict === d;
                    return (
                        <button 
                            key={d}
                            onClick={() => setActiveDistrict(d)}
                            style={{ 
                                flexShrink: 0, 
                                padding: '8px 16px', 
                                background: isActive ? 'var(--color-primary-dark)' : 'white', 
                                color: isActive ? 'white' : 'var(--color-text-muted)', 
                                borderRadius: '20px', 
                                border: isActive ? 'none' : '1px solid #EAEAEA', 
                                fontWeight: isActive ? '500' : '400',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {d === 'All' ? (t('allDistricts') || 'All') : d}
                        </button>
                    )
                })}
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)', background: 'white', borderRadius: '16px' }}>
                        {t('loadingSpots') || '데이터를 불러오는 중입니다. 잠시만 기다려주세요...'}
                    </div>
                ) : filteredSpots.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)', background: 'white', borderRadius: '16px', border: '1px dashed #ccc' }}>
                        {t('noSpotsAdded') || 'No hidden gems added yet.'} <br/><br/> {t('adminDataRequired') || 'Admin can add spots via the dashboard.'}
                    </div>
                ) : (
                    filteredSpots.map(spot => (
                        <SpotCard key={spot.id} spot={spot} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CuratorGuide;
