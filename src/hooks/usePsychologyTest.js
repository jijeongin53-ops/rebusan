import { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { QUESTION_SLOTS } from '../data/questions';

export const usePsychologyTest = () => {
    const { t } = useLanguage();
    
    // Initialize scores for all 10 Personas
    const [scores, setScores] = useState({
        Heritage: 0,
        Romantic: 0,
        Zen: 0,
        Culinary: 0,
        NightOwl: 0,
        Art: 0,
        Local: 0,
        Coastal: 0,
        Trend: 0,
        Wellness: 0
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Randomly select 1 question per slot on mount, creating a unique 10-question test
    const selectedQuestions = useMemo(() => {
        return QUESTION_SLOTS.map(slot => {
            const randomIndex = Math.floor(Math.random() * slot.length);
            return slot[randomIndex];
        });
    }, []); // Only runs once per test

    // Map to translated texts
    const questions = selectedQuestions.map(q => ({
        text: t(q.id),
        options: q.options.map(opt => ({
            text: t(opt.key),
            category: opt.cat
        }))
    }));

    const [answersHistory, setAnswersHistory] = useState([]);

    const handleAnswer = (category, text) => {
        setScores(prev => ({
            ...prev,
            [category]: prev[category] + 1
        }));
        setAnswersHistory(prev => [...prev, text]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const getResult = () => {
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        return sorted[0][0]; // Returns the highest scoring persona category
    };

    const isFinished = currentQuestion === questions.length - 1;

    return { currentQuestion, questions, handleAnswer, getResult, isFinished, scores, answersHistory };
};
