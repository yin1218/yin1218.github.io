// Traditional Chinese (Taiwan) counterpart of data/publicationDetails.ts, with the same shape
// and the same ids. For work under review, describe the study design only; leave detailed
// findings out until the review is complete.
import type { PublicationDetail } from '../publicationDetails'

export const publicationDetails: PublicationDetail[] = [
  {
    id: 'self-interpretations',
    shortTitle: 'AI 生成的自我詮釋',
    eyebrow: '人與 AI 互動 · 自我呈現',
    summary: '人們讀到 AI 對「自己是誰」的詮釋時，會怎麼表述自己，又會怎麼預想在他人面前呈現自己。',
    description: '巫芊瑩與 Nanyi Bi 關於 AI 生成自我詮釋的碩士論文研究；稿件審查中。',
    steps: [
      {
        label: '01 · 建置',
        title: '生成式 AI 系統',
        text: '把個人素材轉成描繪自我的標籤、敘事與圖像。',
      },
      {
        label: '02 · 研究',
        title: '20 位參與者',
        text: '邀請處於成年初顯期（emerging adulthood）的參與者進行放聲思考實驗。',
      },
      {
        label: '03 · 分析',
        title: '主題分析',
        text: '分析參與者閱讀 AI 詮釋時說的話。',
      },
    ],
    sections: [
      {
        id: 'overview',
        nav: '概述',
        title: '研究問題',
        paragraphs: [
          'AI 系統若在人們向他人呈現自己之前，先給出一份對他們的詮釋，會發生什麼事？',
          '這篇論文出自我在國立臺灣大學的碩士論文，延續 Beyond Adaptation 的方向：從替自我呈現發想點子，進一步看人們讀到 AI 怎麼描述自己時，會有什麼反應。',
        ],
      },
      {
        id: 'approach',
        nav: '研究方法',
        title: '研究方法',
        paragraphs: [
          '我開發了一套生成式 AI 系統，把個人素材轉成描繪自我的標籤、敘事與圖像，並做了一場質性實驗室研究：二十位成年初顯期的參與者一邊讀系統對自己的描述，一邊放聲思考。',
          '分析歸納出參與者回應時表述自己的四種方式，彼此互有重疊：區辨、連結、脈絡化與比較。分析也拆開了三件很容易混為一談的事：表述自己、接受 AI 的輸出，以及預想把這份輸出呈現給他人。',
        ],
      },
      {
        id: 'status',
        nav: '進度',
        title: '進度',
        paragraphs: ['稿件審查中，審查結束後會在這裡補上詳細的研究發現。'],
      },
    ],
    roles: ['系統開發', '研究設計', '放聲思考實驗', '主題分析', '論文撰寫'],
    roleNote: '與指導教授 Nanyi Bi 於國立臺灣大學共同完成。',
    citation:
      'Chien-Yin Wu、Nanyi Bi。AI 生成的自我詮釋與預期的自我呈現之研究。審查中稿件（題目暫不公開）。',
  },
  {
    id: 'beyond-adaptation',
    shortTitle: 'Beyond Adaptation',
    eyebrow: '人與 AI 互動 · 跨文化溝通',
    summary: '一款 LLM 輔助的自我呈現發想工具，用於跨文化社交場合。',
    description:
      '巫芊瑩與 Nanyi Bi 的 Beyond Adaptation：七場訪談，加上一款 LLM 輔助的跨文化社交自我呈現發想原型，發表於 CHI EA 2025。',
    steps: [
      {
        label: '01 · 理解',
        title: '7 場訪談',
        text: '每場約一小時，聊跨文化社交的經驗。',
      },
      {
        label: '02 · 設計與建置',
        title: 'LLM 輔助原型',
        text: '幫助人們發想如何呈現自己的工具。',
      },
      {
        label: '03 · 發表',
        title: 'CHI EA 2025',
        text: '以 Late-Breaking Work 形式發表。',
      },
    ],
    sections: [
      {
        id: 'overview',
        nav: '概述',
        title: '研究問題',
        paragraphs: [
          '認識不同文化背景的人時，AI 可以怎麼幫人想出呈現自己的方式？',
          '這個專案結合質性訪談與互動原型，探討跨文化社交中的自我呈現，也把我對以人為本的 AI 和跨文化溝通的興趣串在一起。',
        ],
      },
      {
        id: 'approach',
        nav: '研究方法',
        title: '研究方法',
        paragraphs: [
          '我做了七場各約一小時的訪談，聊人們在跨文化社交中的經驗，也設計並開發了一款 LLM 輔助的自我呈現發想原型。這個原型想探索的是：AI 能不能幫人想想，在這類互動裡可以分享自己的哪些面向。',
          '從訪談看來，猶豫相當普遍：參與者想跟不同文化的人建立連結，卻曾因為怕說錯話而錯過認識彼此的機會。',
        ],
      },
    ],
    roles: ['訪談', '原型設計', 'LLM 實作'],
    roleNote: '與指導教授 Nanyi Bi 於國立臺灣大學共同完成。',
    citation:
      'Chien-Yin Wu and Nanyi Bi. 2025. Beyond Adaptation: an LLM-Supported Self-Presentation Ideation Tool for Cross-Cultural Mingling. Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA ’25), 1–6. https://doi.org/10.1145/3706599.3719929',
  },
  {
    id: 'oblivilight',
    shortTitle: 'Oblivilight 憶光',
    eyebrow: '生成式 AI · 情感支持',
    summary: 'OpenHCI 2025 期間完成的展示作品，探討情感支持生成式 AI 的遺忘機制。',
    description:
      'Oblivilight：出自 OpenHCI 2025 的 TAICHI 2025 展示作品，探討情感支持生成式 AI 的遺忘機制。',
    sections: [
      {
        id: 'overview',
        nav: '概述',
        title: '構想',
        paragraphs: [
          '提供情感支持的 AI，通常會記住使用者說過的每一句話。Oblivilight 想問的是：如果改成遺忘，能帶來什麼？',
          '這個專案由學生團隊在 OpenHCI 2025（為期五天的人機互動工作坊）期間發展而成，並在 TAICHI 2025 以展示形式發表。',
        ],
      },
      {
        id: 'approach',
        nav: '製作過程',
        title: '製作過程',
        paragraphs: [
          '團隊在工作坊期間，從發想做到可實際運作的 Arduino 原型。我以技術助教的身分加入這個團隊。',
        ],
      },
    ],
    roles: ['技術指導', '原型製作支援'],
    roleNote: '共同作者。以 OpenHCI 2025 技術助教身分指導這個六人團隊，並協助 Arduino 實作。',
    citation:
      '湯宇、張韻柔、邱馨論、李思穎、陶俊儒、周杰穎、巫芊瑩。2025。Oblivilight 憶光：探索情感支持生成式人工智慧的遺忘機制。互動展示，TAICHI 2025（OpenHCI 2025）。',
  },
]
