export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const TOUR_API_KEY = process.env.VITE_TOUR_API_KEY;
    if (!TOUR_API_KEY) {
        return res.status(500).json({ error: 'Tour API Key is missing' });
    }

    try {
        // 공공데이터포털 영문 관광정보 서비스 (EngService1)
        // areaCode 6 = Busan, arrange P = 조회수 순
        const url = `http://apis.data.go.kr/B551011/EngService1/areaBasedList1?serviceKey=${encodeURIComponent(TOUR_API_KEY)}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=Rebusan&_type=json&listYN=Y&arrange=P&areaCode=6`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.response && data.response.body && data.response.body.items) {
            // items.item이 배열 형태로 반환됨
            let items = data.response.body.items.item;
            if (!Array.isArray(items)) {
                items = [items];
            }
            return res.status(200).json({ items });
        } else {
            return res.status(200).json({ items: [] });
        }
    } catch (error) {
        console.error('Error fetching Tour API:', error);
        return res.status(500).json({ error: 'Failed to fetch tour data' });
    }
}
