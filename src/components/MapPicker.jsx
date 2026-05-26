import React, { useState } from 'react';
import { searchAccommodation } from '../services/api';

const MapPicker = ({ onSelect, placeholder = "Search location...", emptyMessage = "Search location to see it on the map" }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 2) {
            setLoading(true);
            const res = await searchAccommodation(val);
            setResults(res);
            setLoading(false);
        } else {
            setResults([]);
        }
    };

    const selectPlace = (place) => {
        setSelected(place);
        setQuery(place.name);
        setResults([]);
        onSelect(place);
    };

    return (
        <div className="map-picker" style={{ width: '100%' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleSearch}
                    style={{
                        width: '100%',
                        padding: '15px 45px 15px 15px',
                        borderRadius: '12px',
                        border: '2px solid var(--color-primary-light)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                {loading && (
                    <div style={{ position: 'absolute', right: '15px', top: '15px' }}>
                        <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderTopColor: 'var(--color-primary-light)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    </div>
                )}

                {((results.length > 0) || (query.length > 2 && !loading && results.length === 0)) && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-soft)',
                        zIndex: 10,
                        marginTop: '5px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #eee'
                    }}>
                        {results.length > 0 ? (
                            results.map((res, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => selectPlace(res)}
                                    style={{
                                        padding: '15px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #f5f5f5',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                                    onMouseLeave={(e) => e.target.style.background = 'white'}
                                >
                                    <div style={{ fontWeight: '600', color: 'var(--color-primary-dark)' }}>{res.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{res.address}</div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                No results found for "{query}". <br />
                                <span style={{ fontSize: '0.8rem' }}>Try "Village", "Art", or "Street"</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{
                height: '200px',
                background: '#e0e0e0',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #ddd'
            }}>
                {/* Placeholder for actual Google Map */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #f3f3f3 25%, #ececec 25%, #ececec 50%, #f3f3f3 50%, #f3f3f3 75%, #ececec 75%, #ececec 100%)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }} />
                {!selected ? (
                    <div style={{ zIndex: 1, textAlign: 'center', color: '#666' }}>
                        <p>{emptyMessage}</p>
                    </div>
                ) : (
                    <div style={{ zIndex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📍</div>
                        <div style={{
                            background: 'white',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            {selected.name}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default MapPicker;
