const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'database.js');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Count how many times 'id:' or 'id :' appears in the BOOKS array
    const match = fileContents.match(/id\s*:/g);
    const count = match ? match.length : 0;
    
    res.status(200).json({
      metricName: "등록된 도서 수",
      value: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
}
