import React, { useState, useEffect } from 'react';
import { getTestResults, getOrders } from '../services/api';
import { useLanguage } from '../LanguageContext';

const DataDashboard = ({ onBack }) => {
    const { t } = useLanguage();
    const [testResults, setTestResults] = useState([]);
    const [orders, setOrders] = useState([]);
    
    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('rebusan_admin_auth') === 'true'
    );
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            setTestResults(getTestResults());
            setOrders(getOrders());
        }
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
        <div className="admin-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer', padding: '10px 20px', background: '#eee', border: 'none', borderRadius: '8px' }}>
                {t('backToMain') || '← Back to Main'}
            </button>
            <h1 style={{ marginBottom: '30px' }}>{t('dataDashboard') || 'Application Data Dashboard'}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '20px' }}>{t('testLog') || 'Psychology Test Logs'}</h2>
                    <div style={{ overflowX: 'auto' }}>
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
                    <div style={{ overflowX: 'auto' }}>
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
            </div>
        </div>
    );
};

export default DataDashboard;
