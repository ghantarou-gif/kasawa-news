import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locale";
import { getDaySummaries } from "@/lib/rss";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}`,
      changeFrequency: "hourly",
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/book`,
      changeFrequency: "monthly",
      priority: 0.6,
    });

    const { days } = await getDaySummaries(locale);
    for (const day of days.slice(0, 14)) {
      entries.push({
        url: `${base}/${locale}/d/${day.date}`,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  return entries;
}
