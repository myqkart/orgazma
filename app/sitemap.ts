import type { MetadataRoute } from "next";
import { getAllStories } from "@/lib/stories";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStories();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/stories`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE.url}/stories/${story.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...storyRoutes];
}
