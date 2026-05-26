import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export const usePsychologyTest = () => {
    const { t } = useLanguage();
    const [scores, setScores] = useState({
        Achieve: 0,
        Emotion: 0,
        Contemplation: 0
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = [
        {
            text: t('q1'),
            options: [
                { text: t('q1o1'), category: "Achieve" },
                { text: t('q1o2'), category: "Emotion" },
                { text: t('q1o3'), category: "Contemplation" }
            ]
        },
        {
            text: t('q2'),
            options: [
                { text: t('q2o1'), category: "Achieve" },
                { text: t('q2o2'), category: "Emotion" },
                { text: t('q2o3'), category: "Contemplation" }
            ]
        },
        { text: t('q3'), options: [{ category: "Achieve", text: t('q3o1') }, { category: "Emotion", text: t('q3o2') }, { category: "Contemplation", text: t('q3o3') }] },
        { text: t('q4'), options: [{ category: "Achieve", text: t('q4o1') }, { category: "Emotion", text: t('q4o2') }, { category: "Contemplation", text: t('q4o3') }] },
        { text: t('q5'), options: [{ category: "Achieve", text: t('q5o1') }, { category: "Emotion", text: t('q5o2') }, { category: "Contemplation", text: t('q5o3') }] },
        { text: t('q6'), options: [{ category: "Achieve", text: t('q6o1') }, { category: "Emotion", text: t('q6o2') }, { category: "Contemplation", text: t('q6o3') }] },
        { text: t('q7'), options: [{ category: "Achieve", text: t('q7o1') }, { category: "Emotion", text: t('q7o2') }, { category: "Contemplation", text: t('q7o3') }] },
        { text: t('q8'), options: [{ category: "Achieve", text: t('q8o1') }, { category: "Emotion", text: t('q8o2') }, { category: "Contemplation", text: t('q8o3') }] },
        { text: t('q9'), options: [{ category: "Achieve", text: t('q9o1') }, { category: "Emotion", text: t('q9o2') }, { category: "Contemplation", text: t('q9o3') }] },
        { text: t('q10'), options: [{ category: "Achieve", text: t('q10o1') }, { category: "Emotion", text: t('q10o2') }, { category: "Contemplation", text: t('q10o3') }] }
    ];

    const handleAnswer = (category) => {
        setScores(prev => ({
            ...prev,
            [category]: prev[category] + 1
        }));
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const getResult = () => {
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        return sorted[0][0]; // Returns 'Achieve', 'Emotion', or 'Contemplation'
    };

    const isFinished = currentQuestion === questions.length - 1;

    return { currentQuestion, questions, handleAnswer, getResult, isFinished, scores };
};
