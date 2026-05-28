import { VALID_DISTRICTS } from '../data/database';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxl6MexSRFymg8ixkqLV0BOHPMrXMetP_Tfv63iInJcvOt0I1RXL3o8kBjYZKrzYZkENw/exec';

const postData = async (sheet, action, payload) => {
    try {
        const url = `${GOOGLE_SCRIPT_URL}?sheet=${sheet}&action=${action}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getData = async (sheet) => {
    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${sheet}`);
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

/**
 * Tourism Spots Persistence Logic
 */
export const getTourismSpots = async () => {
    return await getData('TourismSpots');
};

export const saveTourismSpot = async (spot) => {
    const payload = { ...spot, id: Date.now() };
    await postData('TourismSpots', 'append', payload);
    return await getTourismSpots();
};

export const deleteTourismSpot = async (id) => {
    await postData('TourismSpots', 'delete', { id });
    return await getTourismSpots();
};

/**
 * Tourism Comments Persistence Logic
 */
export const getTourismComments = async (spotId) => {
    const allComments = await getData('Comments');
    return spotId ? allComments.filter(c => c.spotId === spotId) : allComments;
};

export const saveTourismComment = async (comment) => {
    const payload = { ...comment, id: Date.now(), createdAt: new Date().toISOString() };
    await postData('Comments', 'append', payload);
    return await getTourismComments(comment.spotId);
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
export const getTestResults = async () => {
    return await getData('TestResults');
};

export const saveTestResult = async (category, scores) => {
    const payload = { category, scores: JSON.stringify(scores), id: Date.now(), timestamp: new Date().toISOString() };
    await postData('TestResults', 'append', payload);
    return await getTestResults();
};

export const getOrders = async () => {
    return await getData('Orders');
};

export const saveOrder = async (orderInfo) => {
    const payload = { 
        ...orderInfo, 
        deliveryAddress: JSON.stringify(orderInfo.deliveryAddress),
        id: Date.now(), 
        timestamp: new Date().toISOString() 
    };
    await postData('Orders', 'append', payload);
    return await getOrders();
};
