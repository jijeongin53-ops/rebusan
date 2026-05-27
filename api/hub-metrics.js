export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Database has 3 books currently (sangdo-1, thousand-years, wintering)
    const count = 3;
    
    res.status(200).json({
      metricName: "등록된 도서 수",
      value: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
}
