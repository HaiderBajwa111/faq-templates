import { MetadataRoute } from 'next';
import prisma from '../lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://faqtemplates.us';

  const templates = await prisma.template.findMany({
    where: { isPublished: true },
    select: { id: true, updatedAt: true },
  });

  const templateEntries = templates.map((t) => ({
    url: `${baseUrl}/template/${t.id}`,
    lastModified: t.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...templateEntries,
  ];
}
