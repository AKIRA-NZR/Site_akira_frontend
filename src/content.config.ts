import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['backend', 'frontend', 'fullstack']).default('backend'),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    technologies: z.array(
      z.object({
        name: z.string(),
        version: z.string().optional(),
      })
    ),
    metrics: z
      .object({
        throughput: z.string().optional(),
        latency_p99: z.string().optional(),
        uptime: z.string().optional(),
        customMetric: z.string().optional(),
      })
      .optional(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    cliCommand: z.string().optional(),
    cliOutput: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects };
