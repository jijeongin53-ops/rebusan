import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API Key is missing' });
    }

    const { answers, persona, spots } = req.body;
    if (!answers || !persona) {
        return res.status(400).json({ error: 'Missing answers or persona' });
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const spotList = spots && spots.length > 0 
            ? spots.map(s => s.title).join(', ') 
            : 'various hidden gems in Busan';

        const prompt = `You are a highly skilled travel concierge for foreign tourists visiting Busan, South Korea.
The user's travel persona is "${persona}" and they gave the following answers in a psychology test:
${answers.join('\n')}

Based on their exact answers and persona, write a personalized, engaging recommendation paragraph in English (maximum 3 sentences). 
Tell them why their personality fits Busan, and pick one or two places from this list: [${spotList}] that they would love.
Make it sound welcoming and magical.
Do not use markdown formatting like asterisks or hashtags. Just plain text.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.status(200).json({ recommendation: text.trim() });
    } catch (error) {
        console.error('Error with Gemini API:', error);
        return res.status(500).json({ error: 'Failed to generate recommendation' });
    }
}
