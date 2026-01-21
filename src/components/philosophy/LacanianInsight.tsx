'use client';

import React, { useState } from 'react';

interface LacanianInsightProps {
  concept: string;
  definition?: string;
  application?: string;
  quote?: string;
}

const lacanianConcepts: Record<string, {
  definition: string;
  application: string;
  quote?: string;
}> = {
  'Objeto a': {
    definition: 'O objeto causa do desejo, aquilo que move o sujeito mas permanece inalcançável. Não é o objeto desejado, mas aquilo que faz desejar.',
    application: 'Na ascese yogue, o Objeto a pode ser identificado com a ilusão de um estado final de libertação. O que move não é Moksha como meta, mas o vazio estrutural que sustenta a práxis.',
    quote: 'O desejo é a metonímia do ser no sujeito.',
  },
  'Grande Outro': {
    definition: 'A ordem simbólica, a linguagem, a lei que precede e estrutura o sujeito. O lugar de onde o sujeito se vê.',
    application: 'No contexto do Yoga, o Grande Outro pode ser a tradição (Paramparā), os textos sagrados, ou a Sangha - estruturas que definem o que é "ser um yogin".',
  },
  'Sujeito barrado': {
    definition: 'O sujeito dividido pela linguagem, marcado pela falta constituinte. Representado como $.',
    application: 'A prática de Svādhyāya (autoestudo) revela o sujeito barrado: aquele que observa não é idêntico ao observado. A divisão é irredutível.',
  },
  'Gozo': {
    definition: 'Jouissance. Além do prazer, um excesso que transcende o princípio do prazer e toca o real.',
    application: 'Titiksha (tolerância aos opostos) trabalha no limiar do gozo - suportar calor/frio, dor/prazer sem buscar eliminar a tensão, mantendo-se no fio da navalha.',
  },
};

export default function LacanianInsight({
  concept,
  definition,
  application,
  quote,
}: LacanianInsightProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const conceptData = lacanianConcepts[concept] || {
    definition: definition || 'Conceito não catalogado.',
    application: application || '',
    quote: quote,
  };

  return (
    <div className="my-6 p-5 bg-gradient-to-r from-slate-100 to-stone-100 border-l-4 border-stone-600 rounded-r-lg shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex justify-between items-center"
      >
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
            Conceito Lacaniano
          </span>
          <h4 className="text-lg font-bold text-stone-800 mt-1">
            {concept}
          </h4>
        </div>
        <span className="text-2xl text-stone-400">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3 text-sm border-t border-stone-300 pt-4">
          <div>
            <p className="font-semibold text-stone-700 mb-1">Definição:</p>
            <p className="text-stone-600 leading-relaxed">
              {conceptData.definition}
            </p>
          </div>

          {conceptData.application && (
            <div>
              <p className="font-semibold text-stone-700 mb-1">
                Aplicação no Yoga:
              </p>
              <p className="text-stone-600 leading-relaxed">
                {conceptData.application}
              </p>
            </div>
          )}

          {conceptData.quote && (
            <div className="mt-4 pt-3 border-t border-stone-200">
              <p className="italic text-stone-500 text-xs">
                "{conceptData.quote}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
