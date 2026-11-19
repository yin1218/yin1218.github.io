// Traditional Chinese (Taiwan) counterpart of data/academicData.ts, with the same shape.
// Paper titles, venues, course titles, names without a known Chinese form, and technology
// names stay in English.
import type { Experience } from '../academicData'

export const education: Experience[] = [
  {
    title: '資訊管理碩士',
    organization: '國立臺灣大學',
    date: '2024 年秋季 – 2026 年 8 月',
    description: '指導教授：Nanyi Bi。碩士論文主題：AI 生成的自我詮釋與預期的自我呈現。',
  },
  {
    title: '資訊管理學士',
    organization: '國立臺灣大學',
    date: '2024 年夏季畢業',
    description: '輔系：哲學。',
  },
  {
    title: '交換學生（電腦科學）',
    organization: '瑞典皇家理工學院（KTH）',
    date: '2024 年春季 – 夏季',
    description: '',
  },
]

export const selectedCourses: { level: string; courses: { title: string; grade: string }[] }[] = [
  {
    level: '研究所',
    courses: [
      { title: 'Research Methods', grade: 'A+' },
      { title: 'Human Computer Interaction and Social Computing (I) & (II)', grade: 'A+' },
      { title: 'Human Computer Interaction and User Studies', grade: 'A' },
      { title: 'Social Design: An Introduction', grade: 'A' },
      { title: 'Data Strategist', grade: 'A+' },
    ],
  },
  {
    level: '大學部',
    courses: [
      { title: 'Machine Learning', grade: 'A+' },
      { title: 'Introduction to Text Mining', grade: 'A+' },
      { title: 'Big Data and Business Analytics', grade: 'A+' },
      { title: 'Advanced Interactive Technologies', grade: 'A' },
      { title: 'Research in HCI and Social Computing', grade: 'A+' },
      { title: 'Data Structures and Advanced Programming', grade: 'A+' },
      { title: 'Database Management', grade: 'A+' },
      { title: 'General Psychology', grade: 'A+' },
    ],
  },
]

export const publication = {
  description: '進行七場各約一小時的跨文化社交訪談，並設計、開發 LLM 輔助的自我呈現發想原型。',
}

export const researchExperience: Experience[] = [
  {
    title: '專任研究助理',
    organization: '國立臺灣師範大學 · 國科會（NSTC）補助計畫 · 指導教授：Nian-Shing Chen',
    date: '2026 年 11 月 – 迄今',
    description: '負責國家科學及技術委員會（國科會）補助計畫的研究系統實作。',
  },
  {
    title: '兼任研究助理',
    organization: '國立臺灣大學 · 指導教授：Nanyi Bi',
    date: '2026 年 9 月 – 2027 年 1 月（預計）',
    description:
      '與專任職務並行。負責一項質性研究的訪談與分析，研究主題為人們如何等待 AI 代理人完成交辦的任務。',
  },
  {
    title: '碩士班研究助理',
    organization: '國立臺灣大學 · 指導教授：Nanyi Bi',
    date: '2024 年夏季 – 2026 年 8 月',
    description:
      '碩士論文：開發三階段生成式 AI 流程（特徵萃取、敘事生成、以照片為依據的圖像生成），並以 20 位參與者進行放聲思考實驗，採主題分析；稿件審查中。此前曾進行七場各約一小時的跨文化社交訪談，並建置 LLM 輔助的自我呈現發想原型，成果發表於 CHI EA 2025。',
  },
  {
    title: '大學部研究助理',
    organization: '國立臺灣大學 · 指導教授：Lung-Pan Cheng',
    date: '2022 年夏季',
    description: '設計並執行虛擬實境視角切換投影系統的實驗，共 15 位參與者。',
  },
  {
    title: '大學部研究助理',
    organization: '國立臺灣大學 · 指導教授：Ling-Chieh Kung',
    date: '2022 年春季 – 夏季',
    description: '以 Lasso 與 Ridge 迴歸為 Global Express 建立外送員抵達率預測模型，支援營運規劃。',
  },
]

export const workExperience: Experience[] = [
  {
    title: 'InnoServe 實習生',
    organization: 'Jubo Health',
    date: '2026 年春季 – 2026 年 10 月',
    description: '透過 API 自動化訂單處理，並統整銷售規則。',
  },
  {
    title: '兼職前端工程師',
    organization: '均一教育平台',
    date: '2022 年秋季 – 2023 年春季',
    description: '開發前端應用程式，協助教師記錄學生的非認知能力發展。',
  },
  {
    title: '前端工程師實習生',
    organization: 'LINE Taiwan',
    date: '2022 年夏季 – 2023 年夏季',
    description: '以 Nuxt.js 開發 LINE TODAY 前端模組，並研究前端 SEO 的改善方式。',
  },
  {
    title: '學生顧問',
    organization: 'Smart Daily & beBit',
    date: '2021 年秋季 – 2022 年春季',
    description:
      '進行 12 場使用者訪談，歸納出超過 30 個痛點，並帶領 10 位公司同仁進行解決方案工作坊。',
  },
]

export const teachingExperience: Experience[] = [
  {
    title: '助教',
    organization: '國立臺灣大學',
    date: '2025 年秋季',
    description:
      'Cross-Cultural Communication & Management（全英語授課）；Entrepreneurship and What’s Next。',
  },
  {
    title: '技術助教',
    organization: 'OpenHCI 2025',
    date: '2025 年夏季',
    description: '帶領六人學生團隊從發想做到 Arduino 原型，作品於 TAICHI 2025 展示。',
  },
  {
    title: '助教',
    organization: '國立臺灣大學',
    date: '2025 年春季',
    description: 'Big Data & Business Analytics。',
  },
  {
    title: '技術助教',
    organization: '國立臺灣大學',
    date: '2022 年秋季',
    description: 'User Interface Design。',
  },
]

export const leadershipExperience: Experience[] = [
  {
    title: '工作坊講師',
    organization: '台灣事實查核教育基金會',
    date: '2023 年春季',
    description: '為年長者設計並帶領三場半天的實體工作坊，主題為數位素養與事實查核。',
  },
  {
    title: '總召',
    organization: 'OpenHCI',
    date: '2022 年春季 – 夏季',
    description: '籌辦為期五天的人機互動工作坊，共 105 位參與者。',
  },
  {
    title: '網頁開發志工',
    organization: '為台灣而教',
    date: '2022 年春季 – 夏季',
    description: '為團隊研究網頁框架，並撰寫技術文件。',
  },
]

export const awards = [
  { title: 'Garmin 獎學金', date: '2025', description: '獲頒新臺幣 10 萬元獎學金。' },
  { title: 'InnoServe Awards', date: '2021', description: 'IP 組第二名。' },
  { title: 'QS-Wharton Reimagine Education Awards', date: '2021', description: '入圍決選。' },
  {
    title: 'APP 行動應用創新競賽',
    date: '2021',
    description: '佳作。',
  },
  { title: 'Trans Action Award', date: '2021', description: 'HTC 獎。' },
]

export const skills = [
  {
    title: '質性研究',
    description: '半結構式訪談、放聲思考法、主題分析、工作坊引導。',
  },
  {
    title: '量化研究',
    description: '問卷設計、實驗設計、ANOVA、迴歸分析。',
  },
  { title: '設計與原型', description: 'Figma、介面原型。' },
  { title: '實體運算', description: 'Arduino、Raspberry Pi。' },
  {
    title: '前端',
    description: 'JavaScript / TypeScript、React、Next.js、Vue / Nuxt.js。',
  },
  { title: '後端與雲端', description: 'Python、Node.js、PostgreSQL、AWS、GCP。' },
  {
    title: 'AI 與機器學習',
    description: 'LLM API 整合、PyTorch、scikit-learn、NumPy、pandas。',
  },
  { title: '語言', description: '中文（母語）；英文（TOEFL iBT 106）。' },
]
