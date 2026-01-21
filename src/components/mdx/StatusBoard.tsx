'use client';

import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

export type StudyStatus = 'planned' | 'in-progress' | 'integrated';

interface Study {
  title: string;
  description?: string;
  status: StudyStatus;
  tags?: string[];
  linkedPosts?: string[];
}

interface StatusBoardProps {
  studies: Study[];
  title?: string;
}

const statusConfig = {
  planned: {
    label: 'Planejado',
    icon: Circle,
    color: 'text-gray-500 bg-gray-50 border-gray-300',
    textColor: 'text-gray-700',
  },
  'in-progress': {
    label: 'Em Andamento',
    icon: Clock,
    color: 'text-blue-500 bg-blue-50 border-blue-300',
    textColor: 'text-blue-900',
  },
  integrated: {
    label: 'Integrado',
    icon: CheckCircle2,
    color: 'text-green-500 bg-green-50 border-green-300',
    textColor: 'text-green-900',
  },
};

export default function StatusBoard({ studies, title = 'Status dos Estudos' }: StatusBoardProps) {
  const groupedStudies = {
    planned: studies.filter((s) => s.status === 'planned'),
    'in-progress': studies.filter((s) => s.status === 'in-progress'),
    integrated: studies.filter((s) => s.status === 'integrated'),
  };

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(statusConfig) as StudyStatus[]).map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const studiesInStatus = groupedStudies[status];

          return (
            <div key={status} className="space-y-3">
              {/* Column Header */}
              <div className={`flex items-center gap-2 p-3 rounded-lg border-2 ${config.color}`}>
                <Icon className="w-5 h-5" />
                <h4 className="font-semibold">{config.label}</h4>
                <span className="ml-auto text-sm font-bold">{studiesInStatus.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {studiesInStatus.map((study, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 bg-white ${config.color.split('bg-')[0]} hover:shadow-md transition-shadow`}
                  >
                    <h5 className={`font-semibold mb-2 ${config.textColor}`}>
                      {study.title}
                    </h5>

                    {study.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {study.description}
                      </p>
                    )}

                    {study.tags && study.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {study.linkedPosts && study.linkedPosts.length > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ArrowRight className="w-3 h-3" />
                          <span>{study.linkedPosts.length} reflexão(ões) conectada(s)</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {studiesInStatus.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    Nenhum estudo nesta fase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
