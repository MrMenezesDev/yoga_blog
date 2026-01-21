import type { MDXComponents } from 'mdx/types';
import { SanskritTerm, GunaChart, MandalaClock } from '@/components/yoga';
import { LacanianInsight } from '@/components/philosophy';
import { ConceptCard, VersusGrid } from '@/components/mdx';
import WikiLink from '@/components/mdx/WikiLink';
import StatusBoard from '@/components/mdx/StatusBoard';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Yoga components
    SanskritTerm,
    GunaChart,
    MandalaClock,
    
    // Philosophy components
    LacanianInsight,
    
    // Academic Knowledge Artifacts
    ConceptCard,
    VersusGrid,
    
    // MDX interconnection components
    WikiLink,
    StatusBoard,
    
    // Custom HTML elements with enhanced styles
    h2: (props) => (
      <h2 
        id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} 
        className="text-3xl font-bold mt-12 mb-6 text-gray-900 scroll-mt-24"
        {...props} 
      />
    ),
    h3: (props) => (
      <h3 
        id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} 
        className="text-2xl font-semibold mt-8 mb-4 text-gray-900 scroll-mt-24"
        {...props} 
      />
    ),
    
    ...components,
  };
}

