// 10 slots * 3 variants = 30 total questions
// Each slot focuses on a mix of 3 or 4 categories to ensure balanced scoring.

export const QUESTION_SLOTS = [
    [
        { id: 'q1_1', options: [{ key: 'q1_1_o1', cat: 'Heritage' }, { key: 'q1_1_o2', cat: 'Trend' }, { key: 'q1_1_o3', cat: 'Zen' }] },
        { id: 'q1_2', options: [{ key: 'q1_2_o1', cat: 'Romantic' }, { key: 'q1_2_o2', cat: 'Culinary' }, { key: 'q1_2_o3', cat: 'Wellness' }] },
        { id: 'q1_3', options: [{ key: 'q1_3_o1', cat: 'NightOwl' }, { key: 'q1_3_o2', cat: 'Art' }, { key: 'q1_3_o3', cat: 'Local' }] }
    ],
    [
        { id: 'q2_1', options: [{ key: 'q2_1_o1', cat: 'Coastal' }, { key: 'q2_1_o2', cat: 'Romantic' }, { key: 'q2_1_o3', cat: 'Heritage' }] },
        { id: 'q2_2', options: [{ key: 'q2_2_o1', cat: 'Wellness' }, { key: 'q2_2_o2', cat: 'Zen' }, { key: 'q2_2_o3', cat: 'Art' }] },
        { id: 'q2_3', options: [{ key: 'q2_3_o1', cat: 'Trend' }, { key: 'q2_3_o2', cat: 'NightOwl' }, { key: 'q2_3_o3', cat: 'Culinary' }] }
    ],
    [
        { id: 'q3_1', options: [{ key: 'q3_1_o1', cat: 'Local' }, { key: 'q3_1_o2', cat: 'Coastal' }, { key: 'q3_1_o3', cat: 'Culinary' }] },
        { id: 'q3_2', options: [{ key: 'q3_2_o1', cat: 'Heritage' }, { key: 'q3_2_o2', cat: 'Art' }, { key: 'q3_2_o3', cat: 'Zen' }] },
        { id: 'q3_3', options: [{ key: 'q3_3_o1', cat: 'Trend' }, { key: 'q3_3_o2', cat: 'Romantic' }, { key: 'q3_3_o3', cat: 'Wellness' }] }
    ],
    [
        { id: 'q4_1', options: [{ key: 'q4_1_o1', cat: 'NightOwl' }, { key: 'q4_1_o2', cat: 'Coastal' }, { key: 'q4_1_o3', cat: 'Trend' }] },
        { id: 'q4_2', options: [{ key: 'q4_2_o1', cat: 'Local' }, { key: 'q4_2_o2', cat: 'Heritage' }, { key: 'q4_2_o3', cat: 'Romantic' }] },
        { id: 'q4_3', options: [{ key: 'q4_3_o1', cat: 'Culinary' }, { key: 'q4_3_o2', cat: 'Wellness' }, { key: 'q4_3_o3', cat: 'Art' }] }
    ],
    [
        { id: 'q5_1', options: [{ key: 'q5_1_o1', cat: 'Zen' }, { key: 'q5_1_o2', cat: 'Wellness' }, { key: 'q5_1_o3', cat: 'Romantic' }] },
        { id: 'q5_2', options: [{ key: 'q5_2_o1', cat: 'Coastal' }, { key: 'q5_2_o2', cat: 'Trend' }, { key: 'q5_2_o3', cat: 'Art' }] },
        { id: 'q5_3', options: [{ key: 'q5_3_o1', cat: 'Heritage' }, { key: 'q5_3_o2', cat: 'NightOwl' }, { key: 'q5_3_o3', cat: 'Local' }] }
    ],
    [
        { id: 'q6_1', options: [{ key: 'q6_1_o1', cat: 'Culinary' }, { key: 'q6_1_o2', cat: 'Local' }, { key: 'q6_1_o3', cat: 'Coastal' }] },
        { id: 'q6_2', options: [{ key: 'q6_2_o1', cat: 'Art' }, { key: 'q6_2_o2', cat: 'Heritage' }, { key: 'q6_2_o3', cat: 'Zen' }] },
        { id: 'q6_3', options: [{ key: 'q6_3_o1', cat: 'NightOwl' }, { key: 'q6_3_o2', cat: 'Trend' }, { key: 'q6_3_o3', cat: 'Romantic' }] }
    ],
    [
        { id: 'q7_1', options: [{ key: 'q7_1_o1', cat: 'Wellness' }, { key: 'q7_1_o2', cat: 'Zen' }, { key: 'q7_1_o3', cat: 'Coastal' }] },
        { id: 'q7_2', options: [{ key: 'q7_2_o1', cat: 'Romantic' }, { key: 'q7_2_o2', cat: 'Art' }, { key: 'q7_2_o3', cat: 'Culinary' }] },
        { id: 'q7_3', options: [{ key: 'q7_3_o1', cat: 'Local' }, { key: 'q7_3_o2', cat: 'Heritage' }, { key: 'q7_3_o3', cat: 'NightOwl' }] }
    ],
    [
        { id: 'q8_1', options: [{ key: 'q8_1_o1', cat: 'Trend' }, { key: 'q8_1_o2', cat: 'Culinary' }, { key: 'q8_1_o3', cat: 'NightOwl' }] },
        { id: 'q8_2', options: [{ key: 'q8_2_o1', cat: 'Coastal' }, { key: 'q8_2_o2', cat: 'Romantic' }, { key: 'q8_2_o3', cat: 'Wellness' }] },
        { id: 'q8_3', options: [{ key: 'q8_3_o1', cat: 'Art' }, { key: 'q8_3_o2', cat: 'Zen' }, { key: 'q8_3_o3', cat: 'Heritage' }] }
    ],
    [
        { id: 'q9_1', options: [{ key: 'q9_1_o1', cat: 'Local' }, { key: 'q9_1_o2', cat: 'Trend' }, { key: 'q9_1_o3', cat: 'Culinary' }] },
        { id: 'q9_2', options: [{ key: 'q9_2_o1', cat: 'NightOwl' }, { key: 'q9_2_o2', cat: 'Coastal' }, { key: 'q9_2_o3', cat: 'Romantic' }] },
        { id: 'q9_3', options: [{ key: 'q9_3_o1', cat: 'Wellness' }, { key: 'q9_3_o2', cat: 'Zen' }, { key: 'q9_3_o3', cat: 'Art' }] }
    ],
    [
        { id: 'q10_1', options: [{ key: 'q10_1_o1', cat: 'Heritage' }, { key: 'q10_1_o2', cat: 'Local' }, { key: 'q10_1_o3', cat: 'Culinary' }] },
        { id: 'q10_2', options: [{ key: 'q10_2_o1', cat: 'Trend' }, { key: 'q10_2_o2', cat: 'NightOwl' }, { key: 'q10_2_o3', cat: 'Art' }] },
        { id: 'q10_3', options: [{ key: 'q10_3_o1', cat: 'Coastal' }, { key: 'q10_3_o2', cat: 'Wellness' }, { key: 'q10_3_o3', cat: 'Zen' }] }
    ]
];
