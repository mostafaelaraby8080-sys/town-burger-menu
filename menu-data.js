/* =========================================================
   Town Burger — بيانات المنيو
   قسم منفصل لكل فئة، سهل التعديل لاحقاً (الأسعار/الأصناف)
   ========================================================= */

const MENU_DATA = [
  {
    id: "meals",
    title: "ركن الوجبات",
    icon: "🍽️",
    note: "كل وجبة بتتقدم مع: مخلل + سلطة + طحينة + كيس عيش",
    items: [
      { name: "وجبة كبدة", sizes: [{ label: "صغير", price: 95 }, { label: "كبير", price: 125 }] },
      { name: "وجبة سجق", sizes: [{ label: "صغير", price: 95 }, { label: "كبير", price: 125 }] },
      { name: "وجبة كفتة", sizes: [{ label: "صغير", price: 100 }, { label: "كبير", price: 130 }] },
      { name: "وجبة مشكل", sizes: [{ label: "صغير", price: 100 }, { label: "كبير", price: 130 }] },
      { name: "وجبة فراخ شيش", sizes: [{ label: "صغير", price: 100 }, { label: "كبير", price: 130 }] },
      { name: "وجبة فراخ شيش + كفتة", sizes: [{ label: "صغير", price: 110 }, { label: "كبير", price: 140 }] },
      { name: "وجبة تاون برجر", sizes: [{ label: "صغير", price: 135 }, { label: "كبير", price: 190 }], featured: true },
    ],
  },
  {
    id: "beef-burger",
    title: "برجر بيف",
    icon: "🍔",
    items: [
      { name: "برجر سنجل", price: 100 },
      { name: "برجر تشيز", price: 110 },
      { name: "برجر دبل", price: 120 },
    ],
  },
  {
    id: "chicken-burger",
    title: "برجر تشكن",
    icon: "🍗",
    items: [
      { name: "تشكن سنجل", price: 100 },
      { name: "تشكن زنجر", price: 110 },
      { name: "تشكن دبل", price: 130 },
      { name: "بيف وتشكن", price: 140 },
    ],
  },
  {
    id: "extras",
    title: "الإضافات",
    icon: "➕",
    items: [
      { name: "أصابع موزاريلا بانيه", price: 35 },
      { name: "ريمكال صوص شيدر", price: 20 },
      { name: "ريمكال صوص برجر المميز", price: 25 },
    ],
  },
  {
    id: "sandwiches",
    title: "ركن السندوتشات",
    icon: "🥙",
    items: [
      { name: "كفتة على الفحم", sizes: [{ label: "صغير", price: 35 }, { label: "كبير", price: 45 }] },
      { name: "سجق", sizes: [{ label: "صغير", price: 35 }, { label: "كبير", price: 45 }] },
      { name: "كبدة", sizes: [{ label: "صغير", price: 35 }, { label: "كبير", price: 45 }] },
      { name: "كبدة على سجق", price: 50 },
      { name: "سوبر كرانشي عيش", price: 55 },
    ],
  },
  {
    id: "syrian-roll",
    title: "الرول السوري",
    icon: "🌯",
    items: [
      { name: "بطاطس", price: 35 },
      { name: "كفتة على الفحم", price: 65 },
      { name: "سجق", price: 65 },
      { name: "برجر", price: 65 },
      { name: "بانيه", price: 55 },
      { name: "سوسيس", price: 55 },
      { name: "استريس", price: 65 },
      { name: "كرانشي حار", price: 65 },
      { name: "شيش طاووق", price: 65 },
      { name: "ميكس لحوم", price: 75 },
      { name: "إضافة ميكس جبن", price: 10 },
    ],
  },
  {
    id: "meat-crepes",
    title: "كريبات اللحوم",
    icon: "🥩",
    items: [
      { name: "كفتة على الفحم", price: 100 },
      { name: "سجق", price: 95 },
      { name: "برجر تشيز", price: 95 },
      { name: "هوت دوج", price: 85 },
      { name: "مشكل لحوم", price: 105 },
    ],
  },
  {
    id: "chicken-crepes",
    title: "كريبات الفراخ",
    icon: "🍢",
    items: [
      { name: "بانية", price: 85 },
      { name: "سوبر كرانشي", price: 100 },
      { name: "شيش طاووق", price: 100 },
      { name: "كوردن بلو", price: 100 },
      { name: "فاهيتا فراخ", price: 105 },
      { name: "زنجر سوبريم", price: 110 },
      { name: "ميكس فراخ", price: 110 },
    ],
  },
  {
    id: "cheese-potato-crepes",
    title: "كريبات الجبن والبطاطس",
    icon: "🧀",
    items: [
      { name: "ميكس جبن", price: 75 },
      { name: "ميكس جبن رومي مدخن", price: 85 },
      { name: "ميكس جبن بسطرمة", price: 90 },
      { name: "ميكس جبن هوت دوج", price: 90 },
      { name: "بطاطس", price: 70 },
      { name: "بطاطس ميكس جبن", price: 80 },
      { name: "بطاطس رومي مدخن", price: 85 },
    ],
  },
  {
    id: "mix-crepes",
    title: "كريبات مكس تاون برجر",
    icon: "⭐",
    items: [
      { name: "كريب الرايق", desc: "استريس + كفتة على الفحم", price: 120 },
      { name: "كريب المزنجتي", desc: "شيش طاووق + كفتة على الفحم", price: 120 },
      { name: "كريب مكس جربل", desc: "كفتة على الفحم + شيش طاووق + بانية", price: 130 },
      { name: "كريب النووي", desc: "كفتة + برجر + سوسيس", price: 130 },
      { name: "كريب تاون برجر", desc: "برجر + استريس + كفتة على الفحم + كوردن بلو + ميكس فراخ + ميكس جبن", price: 140, featured: true },
    ],
  },
  {
    id: "toast",
    title: "ركن التوست",
    icon: "🍞",
    groups: [
      {
        label: "توستات الجبن",
        items: [
          { name: "رومي ساده", price: 45 },
          { name: "رومي شيدر", price: 50 },
          { name: "رومي بيض", price: 55 },
          { name: "رومي بيض شيدر", price: 50 },
          { name: "رومي جبن بيض", price: 55 },
          { name: "رومي خضروات", price: 50 },
        ],
      },
      {
        label: "توستات الفراخ",
        items: [
          { name: "بانيه روم بيض", price: 65 },
          { name: "بانيه روم بيض شيدر", price: 70 },
          { name: "شيش روم بيض", price: 75 },
          { name: "كرانشي روم بيض", price: 75 },
          { name: "ميكس فراخ", price: 80 },
          { name: "كوردن بلو روم", price: 75 },
        ],
      },
      {
        label: "توستات اللحوم",
        items: [
          { name: "كفتة روم بيض", price: 70 },
          { name: "برجر روم بيض", price: 70 },
          { name: "سوسيس روم بيض", price: 65 },
        ],
      },
    ],
  },
  {
    id: "potato",
    title: "ركن البطاطس",
    icon: "🍟",
    items: [
      { name: "بطاطس", price: 35 },
      { name: "بطاطس بالجبنة", price: 40 },
      { name: "بطاطس شيدر كرانشي", price: 55 },
      { name: "بطاطس شيدر برجر", price: 70 },
    ],
  },
];
