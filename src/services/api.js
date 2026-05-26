import { VALID_DISTRICTS } from '../data/database';

const SPOTS_KEY = 'rebusan_tourism_spots';
const COMMENTS_KEY = 'rebusan_tourism_comments';

/**
 * Tourism Spots Persistence Logic
 */
export const getTourismSpots = () => {
    const saved = localStorage.getItem(SPOTS_KEY);
    return saved ? JSON.parse(saved) : [];
};

/**
 * Tourism Comments Persistence Logic
 */
export const getTourismComments = (spotId) => {
    const saved = localStorage.getItem(COMMENTS_KEY);
    const allComments = saved ? JSON.parse(saved) : [];
    return spotId ? allComments.filter(c => c.spotId === spotId) : allComments;
};

export const saveTourismComment = (comment) => {
    const saved = localStorage.getItem(COMMENTS_KEY);
    const allComments = saved ? JSON.parse(saved) : [];
    const newComments = [...allComments, { ...comment, id: Date.now(), createdAt: new Date().toISOString() }];
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(newComments));
    return newComments.filter(c => c.spotId === comment.spotId);
};

export const saveTourismSpot = (spot) => {
    const spots = getTourismSpots();
    const newSpots = [...spots, { ...spot, id: Date.now() }];
    localStorage.setItem(SPOTS_KEY, JSON.stringify(newSpots));
    return newSpots;
};

export const deleteTourismSpot = (id) => {
    const spots = getTourismSpots();
    const newSpots = spots.filter(s => s.id !== id);
    localStorage.setItem(SPOTS_KEY, JSON.stringify(newSpots));
    return newSpots;
};

/**
 * Simulates a Google Places Autocomplete search.
 */
export const searchAccommodation = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockResults = [
        { name: "Lotte Hotel Busan", address: "772 Gaya-daero, Busanjin-gu, Busan", district: "Busanjin-gu" },
        { name: "Gamcheon Culture Village", address: "203 Gamnae 2-ro, Seo-gu, Busan", district: "Seo-gu" },
        { name: "Kangkangee Arts Village", address: "36 Daepyeong-ro 27beon-gil, Yeongdo-gu, Busan", district: "Yeongdo-gu" },
        { name: "Huinnyeoul Culture Village", address: "194 Jeoryeong-ro, Yeongdo-gu, Busan", district: "Yeongdo-gu" },
        { name: "Gwangbok-ro Fashion Street", address: "Gwangbok-ro, Jung-gu, Busan", district: "Jung-gu" },
        { name: "168 Stairs", address: "Choryang-dong, Dong-gu, Busan", district: "Dong-gu" },
        { name: "Bosu-dong Book Street", address: "Bosudong 1-ga, Jung-gu, Busan", district: "Jung-gu" },
        { name: "Yongdusan Park", address: "37-55 Yongdusan-gil, Jung-gu, Busan", district: "Jung-gu" },
        { name: "Busan Museum of Art", address: "58 APEC-ro, Haeundae-gu, Busan", district: "Haeundae-gu" },
        { name: "Songdo Cable Car", address: "171 Songdo-haebyeon-ro, Seo-gu, Busan", district: "Seo-gu" }
    ];

    return mockResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.address.toLowerCase().includes(query.toLowerCase())
    );
};

/**
 * Validates if the selected place is within Busan.
 */
export const verifyPlaceLocation = (place) => {
    const isBusan = place.address.includes("Busan") ||
        VALID_DISTRICTS.some(d => place.address.includes(d));

    return {
        valid: isBusan,
        message: isBusan
            ? `Confirmed. Delivering to ${place.name}.`
            : "Selected location is outside of Busan. Please select a valid accommodation in Busan."
    };
};

export const createPayPalOrder = async (amount) => {
    console.log(`Creating PayPal order for $${amount}`);
    return { id: `MOCK_ORDER_${Date.now()}`, status: "CREATED" };
};

/**
 * Analytics & Ordering Persistence Logic
 */
const TESTS_KEY = 'rebusan_test_results';
const ORDERS_KEY = 'rebusan_orders';

export const getTestResults = () => {
    const saved = localStorage.getItem(TESTS_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const saveTestResult = (category, scores) => {
    const results = getTestResults();
    const newResults = [...results, { category, scores, id: Date.now(), timestamp: new Date().toISOString() }];
    localStorage.setItem(TESTS_KEY, JSON.stringify(newResults));
    return newResults;
};

export const getOrders = () => {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const saveOrder = (orderInfo) => {
    const orders = getOrders();
    const newOrders = [...orders, { ...orderInfo, id: Date.now(), timestamp: new Date().toISOString() }];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
    return newOrders;
};
