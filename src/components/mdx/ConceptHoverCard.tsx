'use client';

import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import type { WisdomPost } from '@/types/content';

interface ConceptHoverCardProps {
  slug: string;
  concept: WisdomPost | null;
  children: React.ReactNode;
}

const categoryColors = {
  conceito: 'border-blue-500 bg-blue-50',
  pratica: 'border-green-500 bg-green-50',
  etica: 'border-purple-500 bg-purple-50',
  tempo: 'border-orange-500 bg-orange-50',
  psicologia: 'border-pink-500 bg-pink-50',
};

export default function ConceptHoverCard({
  slug,
  concept,
  children,
}: ConceptHoverCardProps) {
  if (!concept) {
    // Se não encontrou o conceito, retorna texto normal
    return <>{children}</>;
  }

  const colorClass = categoryColors[concept.frontmatter.category] || categoryColors.conceito;

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <Link
          href={`/sabedoria/${slug}`}
          className="text-orange-600 underline decoration-dotted cursor-help hover:text-orange-700 transition-colors font-medium"
        >
          {children}
        </Link>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className={`
            z-50 w-80 p-4 rounded-lg shadow-xl border-2
            ${colorClass}
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=top]:animate-slideDownAndFade
          `}
          sideOffset={5}
        >
          {/* Arrow */}
          <HoverCard.Arrow className={colorClass.split(' ')[1]} />

          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 mt-1 flex-shrink-0 text-gray-600" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {concept.frontmatter.title}
                </h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white text-gray-700">
                  {concept.frontmatter.badge || concept.frontmatter.category}
                </span>
              </div>
            </div>

            {/* Definition */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {concept.frontmatter.shortDefinition}
            </p>

            {/* Etymology */}
            {concept.frontmatter.etymology && (
              <div className="text-xs text-gray-600 italic pt-2 border-t border-gray-300">
                <strong>Etimologia:</strong> {concept.frontmatter.etymology}
              </div>
            )}

            {/* Footer Link */}
            <div className="pt-2 border-t border-gray-300">
              <Link
                href={`/sabedoria/${slug}`}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                Ver definição completa →
              </Link>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

/**
 * Wrapper para múltiplos conceitos (batch)
 * Recebe o mapa de conceitos já carregados no servidor
 */
interface ConceptProviderProps {
  concepts: Map<string, WisdomPost>;
  children: React.ReactNode;
}

export function ConceptProvider({ concepts, children }: ConceptProviderProps) {
  // Convert Map to plain object for React Context if needed
  // For now, we'll pass concepts directly to each HoverCard
  return <>{children}</>;
}
