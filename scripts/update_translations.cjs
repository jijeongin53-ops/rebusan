const fs = require('fs');

const data = {
  en: {
    landingTitle: "ReBusan AI Curator", landingDesc: "Experience the heritage and emotion of Busan.", mindfulTitle: "Mindful Discovery", mindfulDesc: "Unlock your Mystery Box.", startTestBtn: "Start Test", adminAccess: "[ Admin Access ]", historicGuideTitle: "Hidden Gems Guide", historicGuideDesc: "Discover secret local spaces.", noSpotsAdded: "No hidden gems added yet.", adminDataRequired: "Admin can add spots via dashboard.", allDistricts: "All", yourPersona: "Your Travel Persona", mysteryBoxTitle: "Mystery Kit", yourCuratedBook: "Curated Book:", curatedScent: "Bespoke Scent:", mysteryBoxQuote: "The exact book remains secret until delivery.", preorderBtn: "Order on Official Mall", backToMain: "Back to Dashboard", questionProgress: "Question {current} of {total}", paymentCompleted: "ORDER CONFIRMED", mysteryUnveiled: "Your Journey Begins", letterContent: "Busan is a city of layered memories.", drVerification: "DELIVERY CONCIERGE INFO", deliveryTo: "Destination:", exploreBtn: "Explore Hidden Gems",
    personas: {
      Heritage: ["The Heritage Explorer", "You seek the rich history and deep stories hidden in traditional markets."],
      Romantic: ["The Soulful Romantic", "You are drawn to sunsets, ocean breezes, and deep emotional connections."],
      Zen: ["The Zen Contemplator", "You find peace in quiet mountains, temples, and moments of inner reflection."],
      Culinary: ["The Culinary Adventurer", "For you, the true essence of a city lies in its local street food and hidden flavors."],
      NightOwl: ["The Urban Night Owl", "You come alive under vibrant city lights, exploring night markets and illuminated bridges."],
      Art: ["The Art & Design Enthusiast", "Your soul is fed by galleries, modern architecture, and aesthetically pleasing spaces."],
      Local: ["The Local Authentic", "You bypass tourist spots to get lost in narrow alleys and mingle with the locals."],
      Coastal: ["The Coastal Wanderer", "You can't get enough of the ocean waves, beachside cafes, and the salty sea air."],
      Trend: ["The Trendsetter", "You are always at the hottest pop-ups, modern cafes, and vibrant shopping districts."],
      Wellness: ["The Wellness Seeker", "Your ideal trip involves ocean-view spas, slow mornings, and complete relaxation."]
    },
    qTexts: ["When I plan a trip, my top priority is...", "If I have a free afternoon, I prefer to...", "My favorite travel memory involves..."],
    options: {
      Heritage: "Visiting an old historic site", Romantic: "Walking on the beach at sunset", Zen: "Meditating in a quiet temple", Culinary: "Eating street food at a market", NightOwl: "Enjoying the city night view", Art: "Exploring a modern art gallery", Local: "Talking to friendly locals in an alley", Coastal: "Surfing or swimming in the sea", Trend: "Visiting a popular new cafe", Wellness: "Relaxing at an ocean-view spa"
    }
  },
  ja: {
    landingTitle: "ReBusan AI キュレーター", landingDesc: "釜山の遺産と感動を体験してください。", mindfulTitle: "心の発見", mindfulDesc: "あなただけのミステリーボックスを解除します。", startTestBtn: "テスト開始", adminAccess: "[ 管理者アクセス ]", historicGuideTitle: "隠れた名所ガイド", historicGuideDesc: "古い路地にある秘密の空間を発見してください。", noSpotsAdded: "まだ名所が追加されていません。", adminDataRequired: "管理者がダッシュボードから追加できます。", allDistricts: "すべて", yourPersona: "あなたの旅行ペルソナ", mysteryBoxTitle: "ミステリーキット", yourCuratedBook: "厳選された本:", curatedScent: "特注の香り:", mysteryBoxQuote: "本は配達されるまで秘密です。", preorderBtn: "公式モールで注文する", backToMain: "メインに戻る", questionProgress: "質問 {total} 中 {current}", paymentCompleted: "注文完了", mysteryUnveiled: "あなたの旅が始まります", letterContent: "釜山は重層的な記憶の都市です。", drVerification: "配達コンシェルジュ情報", deliveryTo: "目的地:", exploreBtn: "隠れた名所を探索する",
    personas: {
      Heritage: ["歴史探検家", "伝統市場に隠された豊かな歴史と深い物語を求めます。"],
      Romantic: ["感性的なロマンチスト", "夕日、潮風、そして深い感情的なつながりに惹かれます。"],
      Zen: ["静かな思索家", "静かな山や寺院、内省のひとときに平和を見出します。"],
      Culinary: ["美食の冒険家", "街の真の魅力は、地元の屋台の食べ物や隠れた味にあります。"],
      NightOwl: ["都市のフクロウ", "活気ある街の明かりの下で、ナイトマーケットを探索します。"],
      Art: ["芸術とデザインの愛好家", "ギャラリー、近代建築、美しい空間によって心が満たされます。"],
      Local: ["地元志向の旅人", "観光地を避けて狭い路地に迷い込み、地元の人と交流します。"],
      Coastal: ["海岸線の放浪者", "波、海辺のカフェ、潮風を満喫します。"],
      Trend: ["トレンドセッター", "常に話題のポップアップやモダンなカフェに足を運びます。"],
      Wellness: ["ウェルネスの探求者", "海が見えるスパ、ゆったりとした朝、完全なリラクゼーションを求めます。"]
    },
    qTexts: ["旅行を計画する際、最優先事項は...", "暇な午後があれば、私は...", "お気に入りの旅行の思い出は..."],
    options: {
      Heritage: "古い史跡を訪れる", Romantic: "夕暮れ時にビーチを歩く", Zen: "静かなお寺で瞑想する", Culinary: "市場で屋台の食べ物を食べる", NightOwl: "街の夜景を楽しむ", Art: "現代アートギャラリーを探索する", Local: "路地で地元の人と話す", Coastal: "海でサーフィンや水泳をする", Trend: "人気の新しいカフェを訪れる", Wellness: "海が見えるスパでリラックスする"
    }
  },
  zh: {
    landingTitle: "ReBusan AI 策展人", landingDesc: "体验釜山的文化遗产与情感。", mindfulTitle: "心灵发现", mindfulDesc: "解锁您的盲盒。", startTestBtn: "开始测试", adminAccess: "[ 管理员访问 ]", historicGuideTitle: "隐藏的宝石指南", historicGuideDesc: "发现老巷子里的秘密空间。", noSpotsAdded: "尚未添加景点。", adminDataRequired: "管理员可以通过仪表板添加景点。", allDistricts: "全部", yourPersona: "您的旅行角色", mysteryBoxTitle: "神秘套件", yourCuratedBook: "精选书籍:", curatedScent: "定制香水:", mysteryBoxQuote: "这本书在送达前将保密。", preorderBtn: "在官方商城订购", backToMain: "返回主页", questionProgress: "第 {current} 题，共 {total} 题", paymentCompleted: "订单已确认", mysteryUnveiled: "您的旅程开始", letterContent: "釜山是一座充满层次记忆的城市。", drVerification: "送货礼宾信息", deliveryTo: "目的地:", exploreBtn: "探索隐藏的宝石",
    personas: {
      Heritage: ["历史探险家", "您寻找隐藏在传统市场中的丰富历史和深刻故事。"],
      Romantic: ["深情浪漫主义者", "您被日落、海风和深厚的情感联系所吸引。"],
      Zen: ["禅意思考者", "您在安静的山间、寺庙和反思的时刻中找到平静。"],
      Culinary: ["美食探险家", "对您来说，城市的真正本质在于街头食品和隐藏的美味。"],
      NightOwl: ["都市夜猫子", "您在充满活力的城市灯光下探索夜市和桥梁。"],
      Art: ["艺术与设计爱好者", "您的灵魂在画廊、现代建筑和美学空间中得到滋养。"],
      Local: ["地道体验者", "您避开旅游景点，迷失在狭窄的小巷中与当地人交流。"],
      Coastal: ["海岸漫步者", "您喜欢海浪、海滨咖啡馆和咸咸的海风。"],
      Trend: ["潮流引领者", "您总是在最热门的快闪店、现代咖啡馆和购物区。"],
      Wellness: ["健康追求者", "您理想的旅行包括海景水疗、慢节奏的早晨和完全的放松。"]
    },
    qTexts: ["在计划旅行时，我的首要任务是...", "如果我有一个空闲的下午，我更喜欢...", "我最喜欢的旅行记忆包括..."],
    options: {
      Heritage: "参观古老的历史遗迹", Romantic: "日落时在海滩散步", Zen: "在安静的寺庙里冥想", Culinary: "在市场吃街头食品", NightOwl: "欣赏城市夜景", Art: "探索现代艺术画廊", Local: "在小巷里与当地人交谈", Coastal: "在海里冲浪或游泳", Trend: "去一家受欢迎的新咖啡馆", Wellness: "在海景水疗中心放松"
    }
  }
};

let jsContent = "export const translations = {\n";
for (const lang of ['en', 'ja', 'zh']) {
    jsContent += "  " + lang + ": {\n";
    const d = data[lang];
    
    const keys = ["landingTitle", "landingDesc", "mindfulTitle", "mindfulDesc", "startTestBtn", "adminAccess", "historicGuideTitle", "historicGuideDesc", "noSpotsAdded", "adminDataRequired", "allDistricts", "yourPersona", "mysteryBoxTitle", "yourCuratedBook", "curatedScent", "mysteryBoxQuote", "preorderBtn", "backToMain", "questionProgress", "paymentCompleted", "mysteryUnveiled", "letterContent", "drVerification", "deliveryTo", "exploreBtn"];
    
    keys.forEach(k => { jsContent += "    " + k + ": " + JSON.stringify(d[k]) + ",\n"; });
    
    for (const [key, p] of Object.entries(d.personas)) {
        jsContent += "    persona" + key + "Title: " + JSON.stringify(p[0]) + ",\n";
        jsContent += "    persona" + key + "Desc: " + JSON.stringify(p[1]) + ",\n";
    }
    
    const slots = require('../src/data/questions.js').QUESTION_SLOTS;
    slots.forEach((slot, sIdx) => {
        slot.forEach((q, qIdx) => {
            jsContent += "    " + q.id + ": " + JSON.stringify(d.qTexts[qIdx]) + ",\n";
            q.options.forEach((opt, oIdx) => {
                jsContent += "    " + opt.key + ": " + JSON.stringify(d.options[opt.cat]) + ",\n";
            });
        });
    });

    jsContent += "  },\n";
}
jsContent += "};\n";

fs.writeFileSync('src/translations.js', jsContent);
console.log("Translations successfully updated with JA and ZH!");
