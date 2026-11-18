# Chien-Yin Wu 個人網站

巫芊瑩的學術與作品網站，正式網址為 [chienyinwu.com](https://chienyinwu.com)。網站使用 Next.js、React、Tailwind CSS 與 Contentlayer，包含首頁、Research、Projects、About 和 CV。

## 本機開發

使用 Node.js 20 或以上版本，在專案目錄執行：

```sh
yarn
yarn dev
```

程式檢查：

```sh
yarn lint
yarn typecheck
```

首次執行時，請先啟動開發伺服器或完成建置，產生 Contentlayer 資料後再執行型別檢查。

## 內容維護

- 首頁：`app/Main.tsx`。
- 個人介紹：`data/authors/default.mdx`。
- 履歷、研究經歷與論文：`data/academicData.ts`。
- 專案作品：`data/projectsData.ts`。
- 《Beyond Adaptation》研究介紹：`app/research/beyond-adaptation/page.tsx`。
- 各頁標題、摘要與標準網址：`app/seo.tsx`。
- 人物、論文與作品的結構化資料：`data/structuredData.ts`。

更新專案或照片時，保留原始圖片並提供 WebP 版本，網站使用較小的 WebP 圖檔。

《Beyond Adaptation》研究頁依既有履歷呈現七場訪談、原型開發與個人貢獻。原型截圖與詳細研究發現需依原始研究資料更新；頁面目前不宣稱尚未確認的研究結果。BibTeX 位於 `public/static/files/beyond-adaptation.bib`。

## CV 下載

首頁、About 與 CV 頁提供 PDF 下載，檔案位於 `public/static/files/chien-yin-wu-cv.pdf`。PDF 由網站相同的資料產生，保留目前任職與未來任職的狀態標示。

更新履歷或專案資料後，重新產生 PDF：

```sh
python3 -m pip install reportlab
python3 scripts/generate-cv.py
```

產生工具需要 Node.js、已安裝的專案依賴與 Python 的 ReportLab。原始履歷 PDF 保留在 `materials/`，不會公開。網站也提供與論文 DOI 相符的 ORCID 連結。

## 姓名發音

首頁與 About 頁面顯示中文名字及 KK 近似音標，並提供播放按鈕。

`public/static/audio/chien-yin-wu.mp3` 目前是合成語音示範。將自己的 MP3 錄音覆蓋此檔案，保留檔名即可替換發音；`chien-yin-wu.vtt` 是姓名文字稿。KK 標示作為英文近似發音提示。

## 流量統計

網站使用 Umami 的自動頁面追蹤，支援頁面切換。頁內章節跳轉不會新增瀏覽紀錄，開發環境也不會追蹤。

Umami 儀表板可查看各頁瀏覽量、來源網站、國家與地區，以及 UTM 來源。指標定義見 [Umami 官方文件](https://docs.umami.is/docs/metric-definitions)。

啟用 Umami 後，另可在 Events 查看以下點擊：

| 事件                                                   | 行為               |
| ------------------------------------------------------ | ------------------ |
| `research_open`                                        | 開啟研究介紹       |
| `paper_open`                                           | 點擊論文或 DOI     |
| `demo_open`                                            | 點擊專案示範影片   |
| `cv_download`                                          | 點擊下載 CV PDF    |
| `citation_download`                                    | 點擊下載 BibTeX    |
| `contact_click`                                        | 點擊 Email         |
| `name_pronunciation_play` / `name_pronunciation_pause` | 播放或暫停姓名發音 |

事件附帶專案識別碼與當前頁面路徑，不附帶電子郵件地址或完整外部網址。點擊不代表完成下載、寄信或讀完論文。追蹤程式未載入或被阻擋時，連結與播放功能仍可正常使用。事件功能依 [Umami 官方追蹤介面](https://docs.umami.is/docs/track-events) 實作。

啟用方式：

1. 在 [Umami Cloud](https://cloud.umami.is) 建立網站，網域填入 `chienyinwu.com`，取得 Website ID。
2. 在 GitHub 儲存庫的 **Settings → Secrets and variables → Actions → Variables** 新增 `UMAMI_WEBSITE_ID`，填入該識別碼。
3. 重新執行 GitHub Pages 工作流程。識別碼會在建置時寫入網站；尚未設定識別碼時不會載入追蹤程式。

本機正式建置可將 `.env.example` 複製為 `.env.local`，填入 `NEXT_UMAMI_ID`。如使用自架 Umami，可設定 `UMAMI_SCRIPT_URL`；如需追蹤額外正式網域，可設定 `UMAMI_DOMAINS`。

## 正式網站與 SEO

GitHub Pages 工作流程會產生靜態網站。手動產生相同格式：

```sh
EXPORT=1 UNOPTIMIZED=1 yarn build
```

輸出位於 `out/`。工作流程預設使用 `https://chienyinwu.com`，也可透過 GitHub Actions 的 `SITE_URL` 變數調整。

各頁有獨立的標題、摘要、canonical URL、Open Graph 與分享預覽圖。`sitemap.xml` 包含五個正式頁面，其中包括研究介紹；已移除的範本文章及標籤頁會回傳 404。

咖啡與攝影的兩個預告頁保留為 `noindex`，並排除於網站地圖之外。正文完成後，將 `app/seo.tsx` 中對應頁面的 `index` 改為 `true`，即可開放索引並加入網站地圖。

正式網域需要指向 GitHub Pages，並啟用 HTTPS，搜尋引擎才能存取網站。目前網域仍需修正指向。網站上線後，可在 Google Search Console 提交 `https://chienyinwu.com/sitemap.xml`；如選擇 HTML 標籤驗證，將驗證標籤的 `content` 值填入 GitHub Actions 變數 `GOOGLE_SITE_VERIFICATION` 並重新建置。

## 授權

本專案以 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 為基礎，保留原有授權，詳見 `LICENSE`。
