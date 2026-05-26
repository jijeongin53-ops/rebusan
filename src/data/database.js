export const BOOKS = [
  {
    id: "sangdo-1",
    category: "Achieve",
    title_kr: "상도 1",
    title_en: "Sangdo 1",
    scent: "Jung-gu Market Scent (Spices & Old Wood)",
    district: "Jung-gu",
    stock: 5,
    description_blind: "A tale of commerce and ethics in ancient Korea, perfect for those seeking wisdom in leadership.",
    theme_color: "#E6BE8A" // Gold/Sand
  },
  {
    id: "thousand-years",
    category: "Emotion",
    title_kr: "천년의 사랑",
    title_en: "Thousand Years of Love",
    scent: "Yeongdo Sea Scent (Salt & Ocean Breeze)",
    district: "Yeongdo-gu",
    stock: 3,
    description_blind: "An evocative journey of deep connection and timeless affection, reflecting the vastness of the sea.",
    theme_color: "#4A90E2" // Ocean Blue
  },
  {
    id: "wintering",
    category: "Contemplation",
    title_kr: "겨울나기",
    title_en: "Wintering",
    scent: "Dong-gu Mountain Road Scent (Pine & Winter Air)",
    district: "Dong-gu",
    stock: 8,
    description_blind: "A quiet reflection on patience and the beauty of still moments, inspired by the mountain slopes.",
    theme_color: "#2D5A47" // Mountain Green
  }
];

export const VALID_DISTRICTS = [
  "Jung-gu", "Seo-gu", "Dong-gu", "Yeongdo-gu",
  "Busanjin-gu", "Dongnae-gu", "Nam-gu", "Buk-gu",
  "Haeundae-gu", "Saha-gu", "Geumjeong-gu", "Gangseo-gu",
  "Yeonje-gu", "Suyeong-gu", "Sasang-gu", "Gijang-gun",
  "Busan" // Basic keyword
];

export const PERSONA_RESULTS = {
  "Achieve": {
    title: "The Visionary Leader",
    description: "You possess the drive of a merchant king from the Joseon dynasty. Your path is one of legacy and wisdom.",
    link: "sangdo-1"
  },
  "Emotion": {
    title: "The Eternal Romantic",
    description: "Your heart beats with the rhythm of the waves. You find beauty in the depth of human connection.",
    link: "thousand-years"
  },
  "Contemplation": {
    title: "The Silent Sage",
    description: "Like the winter mountains of Busan, you find strength in stillness and clarity in observation.",
    link: "wintering"
  }
};
