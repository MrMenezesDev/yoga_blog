'use client';

import { User, Target, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao Jardim Digital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Este é um espaço de <strong>crescimento orgânico</strong> onde Yoga, Sânscrito, 
              Psicanálise e Tecnologia se entrelaçam. Não é um blog linear, mas um{' '}
              <em className="text-orange-600">ecossistema vivo</em> de conhecimento interconectado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Propósito</h3>
                <p className="text-sm text-gray-600">
                  Integrar teoria e prática em uma jornada de 365 dias de Sādhana intensiva
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Método</h3>
                <p className="text-sm text-gray-600">
                  Navegação não-linear através de <em>wiki-links</em>, glossários e cronogramas de estudo
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-500 italic">
              "योग: कर्मसु कौशलम्" — Yoga é habilidade na ação (Bhagavad Gītā 2.50)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
