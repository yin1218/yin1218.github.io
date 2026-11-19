// Traditional Chinese (Taiwan) counterpart of data/projectsData.ts. Same ids, order, dates,
// links and images. Dates are localized for display. Role tags map 1:1 to the English tags
// (see `roleTagMap`), which ProjectList uses for the analytics resource.
import type { Project } from '../projectsData'

export const roleTagMap: Record<string, string> = {
  實體運算: 'Physical computing',
  原型設計: 'Prototyping',
  概念發想: 'Concept',
  影片製作: 'Video production',
  機器學習: 'Machine learning',
  部署: 'Deployment',
  使用者研究: 'User research',
  開發: 'Development',
  前端開發: 'Frontend development',
}

const projectsData: Project[] = [
  {
    id: 'brushamood',
    title: 'BrushaMood',
    roles: ['實體運算', '原型設計'],
    description:
      '一款互動音樂裝置，讓家人之間能用間接的方式表達關心。擠牙膏時選一種心情，刷牙的兩分鐘裡就會播放家人挑選的歌單。Social Design 課程專案。',
    contribution:
      '以 Arduino、Raspberry Pi 與 Spotify API 製作可實際運作的原型，按下心情按鈕即可播放音樂。另參與問題定義、使用者旅程地圖與原型設計。',
    date: '2025 年春季',
    imgSrc: '/static/images/project/brushamood.webp',
    featured: false,
  },
  {
    id: 'columbarium-theatre',
    title: '從逝者視角出發的沉浸式劇場',
    roles: ['概念發想', '影片製作'],
    description:
      '跨領域藝術課程中，三人團隊創作的空間敘事作品。觀眾坐在佈置成納骨塔的空間裡，從被懷念者的位置，觀看預先錄好的訪客故事。',
    contribution: '參與概念、敘事、劇本與空間配置；負責影片剪輯與後製，並協助拍攝。',
    date: '2025 年春季',
    featured: false,
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder',
    roles: ['機器學習', '部署'],
    description: '一款手機 App，協助學生撰寫學習歷程檔案，並根據自己的紀錄探索適合的科系。',
    contribution:
      '以自然語言推論（Natural Language Inference）開發分類模型，並部署於 AWS。專案獲 InnoServe Awards IP 組第二名，並入圍 QS-Wharton Reimagine Education Awards 決選。',
    date: '2021',
    imgSrc: '/static/images/project/pathfinder.webp',
    href: 'https://www.youtube.com/watch?v=AEFjUuhPILk',
    featured: true,
  },
  {
    id: 'gotcha',
    title: 'GOTCHA',
    roles: ['使用者研究'],
    description: '「Got you in charity!」一款手機 App 原型，回應小型非營利組織募款資源不均的問題。',
    contribution:
      '透過 400 多份問卷與三場訪談，歸納出募款的六個痛點與三個正面面向。獲 Trans Action Award HTC 獎。',
    date: '2021',
    imgSrc: '/static/images/project/gotcha.webp',
    href: 'https://www.youtube.com/watch?v=YXzMDNRGixM',
    featured: true,
  },
  {
    id: 'dormy',
    title: 'Dormy, be your homie',
    roles: ['概念發想', '開發'],
    description: '一個服務媒合網站，讓國立臺灣大學的住宿生滿足日常生活所需。',
    contribution: '構思並以 React.js 開發這個平台。',
    date: '2021 年冬季',
    imgSrc: '/static/images/project/dormy.webp',
    href: 'https://youtu.be/gYOxBSz9LmE',
    featured: false,
  },
  {
    id: 'swappy',
    title: 'Swappy',
    roles: ['原型設計', '前端開發'],
    description: '一款手機 App，透過斷捨離挑戰與以物易物社群，鼓勵大家交換閒置物品。',
    contribution: '設計原型並開發前端。獲 APP 行動應用創新競賽佳作。',
    date: '2021',
    imgSrc: '/static/images/project/swappy.webp',
    href: 'https://www.youtube.com/watch?v=HI4xZkTqql0',
    featured: false,
  },
  {
    id: 'habitra',
    title: 'Habitra, habit tracker',
    roles: ['概念發想', '開發'],
    description: '一個網站，讓人透過和他人聚在一起、設定目標，養成習慣。',
    contribution: '構思並以 React.js 開發這個網站。',
    date: '2021 年冬季',
  },
]

export default projectsData
