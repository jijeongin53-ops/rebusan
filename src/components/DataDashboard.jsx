import React, { useState, useEffect } from 'react';
import { getTestResults, getOrders, saveTourismSpot, getTourismSpots, deleteTourismSpot } from '../services/api';
import { useLanguage } from '../LanguageContext';

const DataDashboard = ({ onBack }) => {
    const { t } = useLanguage();
    const [testResults, setTestResults] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tourismSpots, setTourismSpots] = useState([]);
    const [newSpot, setNewSpot] = useState({ name: '', district: 'Yeongdo-gu', category: 'HERITAGE', address: '', description: '', imageUrl: '', link: '' });
    
    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('rebusan_admin_auth') === 'true'
    );
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadData = async () => {
            if (isAuthenticated) {
                setTestResults(await getTestResults());
                setOrders(await getOrders());
                setTourismSpots(await getTourismSpots());
            }
        };
        loadData();
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'rebusan2026';
        
        if (passwordInput === correctPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem('rebusan_admin_auth', 'true');
            setErrorMsg('');
        } else {
            setErrorMsg('Incorrect Password. Access Denied.');
        }
    };

    const handleAddSpot = async (e) => {
        e.preventDefault();
        if (!newSpot.name || !newSpot.district || !newSpot.description) return;
        const updated = await saveTourismSpot(newSpot);
        if (updated) setTourismSpots(updated);
        setNewSpot({ name: '', district: 'Yeongdo-gu', category: 'HERITAGE', address: '', description: '', imageUrl: '', link: '' });
    };

    const handleDeleteSpot = async (id) => {
        const updated = await deleteTourismSpot(id);
        if (updated) setTourismSpots(updated);
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-container" style={{ padding: '40px', maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
                <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer', padding: '10px 20px', background: '#eee', border: 'none', borderRadius: '8px' }}>
                    {t('backToMain') || '← Back to Main'}
                </button>
                <div className="glass-card" style={{ padding: '40px' }}>
                    <h2>Admin Authentication Required</h2>
                    <p style={{ marginBottom: '20px', color: '#666' }}>Please enter the dashboard password to continue.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input 
                            type="password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Password"
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                        />
                        {errorMsg && <p style={{ color: 'red', margin: 0, fontSize: '0.9rem' }}>{errorMsg}</p>}
                        <button type="submit" className="btn-primary" style={{ padding: '12px', fontSize: '1rem' }}>
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const totalTests = testResults.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalOrders = orders.length;

    return (
        <div className="admin-container">
            <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer', padding: '10px 20px', background: '#eee', border: 'none', borderRadius: '8px' }}>
                {t('backToMain') || '← Back to Main'}
            </button>
            <h1 style={{ marginBottom: '30px' }}>{t('dataDashboard') || 'Application Data Dashboard'}</h1>

            <div className="admin-kpi-grid">
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: '#e3f2fd' }}>
                    <h3>{t('totalTests') || 'Total Tests Taken'}</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1565c0' }}>{totalTests}</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: '#e8f5e9' }}>
                    <h3>{t('totalOrders') || 'Total Book Orders'}</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2e7d32' }}>{totalOrders}</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: '#fff3e0' }}>
                    <h3>{t('totalRevenue') || 'Total Income (USD)'}</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e65100' }}>${totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="admin-content-grid">
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '20px' }}>{t('testLog') || 'Psychology Test Logs'}</h2>
                    <div className="admin-table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '12px' }}>ID / Date</th>
                                    <th style={{ padding: '12px' }}>Outcome Persona</th>
                                    <th style={{ padding: '12px' }}>Scores (Ach / Emo / Con)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testResults.length === 0 ? (
                                    <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No tests recorded yet.</td></tr>
                                ) : (
                                    testResults.slice().reverse().map(test => (
                                        <tr key={test.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px', fontSize: '0.9rem', color: '#666' }}>{new Date(test.timestamp).toLocaleString()}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{test.category}</td>
                                            <td style={{ padding: '12px' }}>
                                                {test.scores ? `${test.scores.Achieve} / ${test.scores.Emotion} / ${test.scores.Contemplation}` : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '20px' }}>{t('orderLog') || 'Order & Address Requests'}</h2>
                    <div className="admin-table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px' }}>PayPal ID</th>
                                    <th style={{ padding: '12px' }}>Book Category</th>
                                    <th style={{ padding: '12px' }}>Delivery Address</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No orders recorded yet.</td></tr>
                                ) : (
                                    orders.slice().reverse().map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px', fontSize: '0.9rem', color: '#666' }}>{new Date(order.timestamp).toLocaleString()}</td>
                                            <td style={{ padding: '12px', fontFamily: 'monospace' }}>{order.paypalOrderId}</td>
                                            <td style={{ padding: '12px' }}>{order.category}</td>
                                            <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                                                <strong>{order.deliveryAddress?.name}</strong><br />
                                                <span style={{ color: '#666' }}>{order.deliveryAddress?.address}</span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{ padding: '4px 8px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Manage Hidden Gems (Tourist Spots)</h2>
                    
                    <form onSubmit={handleAddSpot} style={{ display: 'grid', gap: '15px', marginBottom: '30px', background: '#f9f9f9', padding: '20px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Register New Spot</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                            <input type="text" placeholder="Spot Name (e.g. 168 Stairs)" value={newSpot.name} onChange={e => setNewSpot({...newSpot, name: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} required />
                            <select value={newSpot.district} onChange={e => setNewSpot({...newSpot, district: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                                <option value="Yeongdo-gu">Yeongdo-gu</option>
                                <option value="Jung-gu">Jung-gu</option>
                                <option value="Seo-gu">Seo-gu</option>
                                <option value="Dong-gu">Dong-gu</option>
                                <option value="Haeundae-gu">Haeundae-gu</option>
                                <option value="Busanjin-gu">Busanjin-gu</option>
                            </select>
                            <select value={newSpot.category} onChange={e => setNewSpot({...newSpot, category: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                                <option value="HERITAGE">HERITAGE</option>
                                <option value="VIEW">VIEW</option>
                                <option value="CULTURE">CULTURE</option>
                                <option value="ART">ART</option>
                                <option value="CAFE">CAFE</option>
                            </select>
                            <input type="text" placeholder="Address (Optional)" value={newSpot.address} onChange={e => setNewSpot({...newSpot, address: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                            <input type="url" placeholder="Image URL (Optional)" value={newSpot.imageUrl} onChange={e => setNewSpot({...newSpot, imageUrl: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            <input type="url" placeholder="Spot Link (Optional)" value={newSpot.link} onChange={e => setNewSpot({...newSpot, link: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                        </div>
                        <textarea placeholder="Description" value={newSpot.description} onChange={e => setNewSpot({...newSpot, description: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px', resize: 'vertical' }} required />
                        <button type="submit" className="btn-dark" style={{ padding: '12px', fontSize: '1rem', width: 'fit-content' }}>+ Add Tourist Spot</button>
                    </form>

                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Registered Spots ({tourismSpots.length})</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {tourismSpots.length === 0 ? (
                                <p style={{ color: '#666', fontStyle: 'italic' }}>No spots registered yet.</p>
                            ) : (
                                tourismSpots.map(spot => (
                                    <div key={spot.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                                        <div>
                                            <strong>{spot.name}</strong> <span style={{ color: '#888', fontSize: '0.85rem' }}>({spot.district} / {spot.category})</span>
                                        </div>
                                        <button onClick={() => handleDeleteSpot(spot.id)} style={{ padding: '6px 12px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataDashboard;
