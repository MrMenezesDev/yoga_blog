'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 md:py-16 border-t border-stone-800">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Citação em Destaque */}
        <div className="text-center mb-12 pb-12 border-b border-stone-800">
          <p 
            className="text-xl md:text-2xl italic text-stone-300 mb-2" 
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            "Yogaś citta-vṛtti-nirodhaḥ"
          </p>
          <p 
            className="text-sm text-stone-500" 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Yoga é a contenção das modificações da mente — Patañjali, Yoga Sutras 1.2
          </p>
        </div>

        {/* Três Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Sobre */}
          <div>
            <h3 
              className="text-base font-bold text-stone-200 mb-4 uppercase tracking-wider" 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Sobre
            </h3>
            <p 
              className="text-sm leading-relaxed" 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Jardim digital de estudos sobre Yoga, Vedanta e Psicanálise. 
              Um laboratório pessoal de integração entre filosofia indiana e vida contemporânea.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 
              className="text-base font-bold text-stone-200 mb-4 uppercase tracking-wider" 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Navegação
            </h3>
            <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              <li>
                <Link href="/" className="hover:text-stone-200 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/diario" className="hover:text-stone-200 transition-colors">
                  Diário
                </Link>
              </li>
              <li>
                <Link href="/laboratorio" className="hover:text-stone-200 transition-colors">
                  Laboratório
                </Link>
              </li>
              <li>
                <Link href="/sabedoria" className="hover:text-stone-200 transition-colors">
                  Sabedoria
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 
              className="text-base font-bold text-stone-200 mb-4 uppercase tracking-wider" 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Contato
            </h3>
            <p 
              className="text-sm leading-relaxed mb-3" 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Este é um projeto pessoal de estudo e reflexão. 
            </p>
            <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              📧 erick@mrmenezes.dev
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-stone-800">
          <p 
            className="text-xs text-stone-500 flex items-center justify-center gap-2" 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Feito com <Heart size={12} className="text-stone-600" /> e disciplina • 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
