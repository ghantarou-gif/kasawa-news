import type { Desk } from "./config";
import type { Locale } from "./locale";

export type Feed = {
  id: string;
  name: string;
  url: string;
  locales: Locale[];
  categories: Desk[];
};

function feed(
  id: string,
  name: string,
  url: string,
  locales: Locale[],
  categories: Desk[],
): Feed {
  return { id, name, url, locales, categories };
}

const bbc = (
  id: string,
  path: string,
  categories: Desk[],
): Feed =>
  feed(id, "BBC", `https://feeds.bbci.co.uk/${path}`, ["ja", "en"], categories);

export const feeds: Feed[] = [
  feed("bbc-ja", "BBC日本語", "https://feeds.bbci.co.uk/japanese/rss.xml", ["ja"], [
    "top",
    "world",
    "japan",
  ]),
  bbc("bbc-world", "news/world/rss.xml", ["top", "world"]),
  bbc("bbc-asia", "news/world/asia/rss.xml", ["top", "world", "japan"]),
  bbc("bbc-europe", "news/world/europe/rss.xml", ["world"]),
  bbc("bbc-us", "news/world/us_and_canada/rss.xml", ["world"]),
  bbc("bbc-africa", "news/world/africa/rss.xml", ["world"]),
  bbc("bbc-me", "news/world/middle_east/rss.xml", ["world"]),
  bbc("bbc-latam", "news/world/latin_america/rss.xml", ["world"]),
  bbc("bbc-uk", "news/uk/rss.xml", ["world"]),
  bbc("bbc-biz", "news/business/rss.xml", ["business", "top"]),
  bbc("bbc-tech", "news/technology/rss.xml", ["tech"]),
  bbc("bbc-science", "news/science_and_environment/rss.xml", ["tech"]),
  bbc("bbc-health", "news/health/rss.xml", ["tech"]),
  bbc("bbc-sport", "sport/rss.xml", ["sports"]),
  bbc("bbc-arts", "news/entertainment_and_arts/rss.xml", ["top"]),
  feed("npr-top", "NPR", "https://feeds.npr.org/1001/rss.xml", ["en", "ja"], ["top"]),
  feed("npr-world", "NPR", "https://feeds.npr.org/1004/rss.xml", ["en", "ja"], ["world"]),
  feed("npr-us", "NPR", "https://feeds.npr.org/1003/rss.xml", ["en"], ["world"]),
  feed("npr-tech", "NPR", "https://feeds.npr.org/1019/rss.xml", ["en", "ja"], ["tech"]),
  feed(
    "guardian-world",
    "The Guardian",
    "https://www.theguardian.com/world/rss",
    ["en", "ja"],
    ["top", "world"],
  ),
  feed(
    "guardian-biz",
    "The Guardian",
    "https://www.theguardian.com/business/rss",
    ["en", "ja"],
    ["business"],
  ),
  feed(
    "guardian-tech",
    "The Guardian",
    "https://www.theguardian.com/uk/technology/rss",
    ["en", "ja"],
    ["tech"],
  ),
  feed(
    "aljazeera",
    "Al Jazeera",
    "https://www.aljazeera.com/xml/rss/all.xml",
    ["en", "ja"],
    ["top", "world"],
  ),
  feed("dw", "Deutsche Welle", "https://rss.dw.com/rdf/rss-en-all", ["en", "ja"], [
    "world",
  ]),
  feed("france24", "France 24", "https://www.france24.com/en/rss", ["en", "ja"], [
    "world",
  ]),
  feed(
    "abc-world",
    "ABC Australia",
    "https://www.abc.net.au/news/feed/51120/rss.xml",
    ["en", "ja"],
    ["world"],
  ),
  feed(
    "cbc-world",
    "CBC",
    "https://www.cbc.ca/webfeed/rss/rss-world",
    ["en", "ja"],
    ["world"],
  ),
  feed(
    "cbc-top",
    "CBC",
    "https://www.cbc.ca/webfeed/rss/rss-topstories",
    ["en"],
    ["top"],
  ),
  feed(
    "cna",
    "CNA",
    "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml",
    ["en", "ja"],
    ["world", "japan"],
  ),
  feed("pbs", "PBS", "https://www.pbs.org/newshour/feeds/rss/headlines", ["en"], [
    "top",
    "world",
  ]),
  feed("euronews", "Euronews", "https://www.euronews.com/rss?format=mrss", ["en", "ja"], [
    "world",
  ]),
  feed(
    "un",
    "UN News",
    "https://news.un.org/feed/subscribe/en/news/all/rss.xml",
    ["en", "ja"],
    ["world"],
  ),
  feed(
    "itmedia",
    "ITmedia",
    "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml",
    ["ja"],
    ["top", "tech", "japan"],
  ),
  feed(
    "itmedia-tech",
    "ITmedia",
    "https://rss.itmedia.co.jp/rss/2.0/news_technology.xml",
    ["ja"],
    ["tech"],
  ),
  feed("gigazine", "Gigazine", "https://gigazine.net/news/rss_2.0/", ["ja"], [
    "tech",
    "japan",
  ]),
  feed(
    "cnet-jp",
    "CNET Japan",
    "https://feeds.japan.cnet.com/rss/cnet/all.rdf",
    ["ja"],
    ["tech", "japan"],
  ),
  feed("mynavi", "マイナビニュース", "https://news.mynavi.jp/rss/index.xml", ["ja"], [
    "japan",
    "tech",
    "top",
  ]),
  feed(
    "yahoo-picks",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/topics/top-picks.xml",
    ["ja"],
    ["top"],
  ),
  feed(
    "yahoo-domestic",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/domestic.xml",
    ["ja"],
    ["japan", "top"],
  ),
  feed(
    "yahoo-world",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/world.xml",
    ["ja"],
    ["world", "top"],
  ),
  feed(
    "yahoo-biz",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/business.xml",
    ["ja"],
    ["business"],
  ),
  feed(
    "yahoo-it",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/it.xml",
    ["ja"],
    ["tech"],
  ),
  feed(
    "yahoo-science",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/science.xml",
    ["ja"],
    ["tech"],
  ),
  feed(
    "yahoo-sports",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/categories/sports.xml",
    ["ja"],
    ["sports"],
  ),
  feed(
    "yahoo-local",
    "Yahoo!ニュース",
    "https://news.yahoo.co.jp/rss/topics/local.xml",
    ["ja"],
    ["japan"],
  ),
  feed(
    "livedoor-top",
    "ライブドアニュース",
    "https://news.livedoor.com/topics/rss/top.xml",
    ["ja"],
    ["top"],
  ),
  feed(
    "livedoor-dom",
    "ライブドアニュース",
    "https://news.livedoor.com/topics/rss/dom.xml",
    ["ja"],
    ["japan", "top"],
  ),
  feed(
    "livedoor-int",
    "ライブドアニュース",
    "https://news.livedoor.com/topics/rss/int.xml",
    ["ja"],
    ["world"],
  ),
  feed(
    "livedoor-eco",
    "ライブドアニュース",
    "https://news.livedoor.com/topics/rss/eco.xml",
    ["ja"],
    ["business"],
  ),
  feed(
    "livedoor-spo",
    "ライブドアニュース",
    "https://news.livedoor.com/topics/rss/spo.xml",
    ["ja"],
    ["sports"],
  ),
];

export function feedsForLocale(locale: Locale): Feed[] {
  return feeds.filter((item) => item.locales.includes(locale));
}

export function sourceNames(locale: Locale): string[] {
  return [...new Set(feedsForLocale(locale).map((item) => item.name))];
}
