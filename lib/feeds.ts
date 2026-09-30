export const GLOBAL_FEEDS = [
  "https://www.offshorewind.biz/feed/",
  "https://news.google.com/rss/search?q=%22offshore+wind+farm%22+-onshore&hl=en-US&gl=US&ceid=US:en",
];

export const TAIWAN_FEEDS = [
  'https://news.google.com/rss/search?q=%22Taiwan+offshore+wind%22&hl=en-US&gl=US&ceid=US:en',
  "https://news.google.com/rss/search?q=%E9%9B%A2%E5%B2%B8%E9%A2%A8%E9%9B%BB&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
  "https://news.google.com/rss/search?q=%E9%9B%A2%E5%B2%B8%E9%A2%A8%E9%9B%BB+%E5%8F%B0%E7%81%A3&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
  "https://news.google.com/rss/search?q=%E9%9B%A2%E5%B2%B8%E9%A2%A8%E9%9B%BB+source:cna.com.tw&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
];

export const ALL_FEEDS = [...GLOBAL_FEEDS, ...TAIWAN_FEEDS];
