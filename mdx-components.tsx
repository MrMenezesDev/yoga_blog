import type { MDXComponents } from 'mdx/types';
import { SanskritTerm, GunaChart, MandalaClock } from '@/components/yoga';
import { LacanianInsight } from '@/components/philosophy';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    SanskritTerm,
    GunaChart,
    MandalaClock,
    LacanianInsight,
    ...components,
  };
}
