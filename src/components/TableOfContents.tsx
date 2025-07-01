import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  onNavigate: (section: string) => void;
  sections: { id: string; title: string }[];
  ptBrSections: any[];
  enSections: any[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ onNavigate, sections, ptBrSections, enSections }) => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-space font-light text-5xl md:text-6xl text-deep-purple uppercase tracking-wider mb-8">
          Contents
        </h1>
        <h2 className="font-space font-light text-4xl md:text-5xl text-gray-green uppercase tracking-wider">
          Índice
        </h2>
        <div className="mt-8 w-24 h-px bg-accent-pink mx-auto"></div>
      </motion.div>
      {/* Contents List */}
      <div className="space-y-6">
        {sections.map((item, index) => (
          item.id.startsWith('prompt') ? (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => onNavigate(item.id)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              <div className="bg-white border border-gray-green rounded-lg p-6 hover:border-accent-pink hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="font-courier text-accent-turquoise text-sm font-bold">
                        {ptBrSections[index - 2]?.promptNumber ? `Prompt ${ptBrSections[index - 2].promptNumber}` : ''}
                      </span>
                      <div className="flex-1 h-px bg-gray-green group-hover:bg-accent-pink transition-colors"></div>
                    </div>
                    <h3 className="font-space font-light text-2xl text-deep-purple uppercase tracking-wider mb-2">
                      {enSections[index - 2]?.titleEn || item.title.split(' / ')[0]}
                    </h3>
                    <h4 className="font-space font-light text-xl text-gray-green uppercase tracking-wider mb-3">
                      {ptBrSections[index - 2]?.titlePt || item.title.split(' / ')[1]}
                    </h4>
                    <p className="font-inter font-light text-gray-600 text-sm">
                      {/* Aqui pode-se adicionar uma descrição se houver no markdown */}
                    </p>
                  </div>
                  <ChevronRight
                    size={24}
                    className="text-gray-green group-hover:text-accent-pink transition-colors ml-4"
                  />
                </div>
              </div>
            </motion.div>
          ) : null
        ))}
      </div>
      {/* Laboratory Note */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="bg-gray-green bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="font-courier text-deep-purple text-sm underline decoration-accent-turquoise mb-2">
            LABORATORY NOTE
          </p>
          <p className="font-inter font-light text-gray-700 text-sm leading-relaxed">
            This dramaturgy emerges from collaboration between artificial intelligence and human creativity.
            Each prompt is an exploration of the boundaries between synthetic and organic,
            a poetic investigation into the nature of creation in the 21st century.
          </p>
          <div className="mt-4 w-12 h-px bg-accent-pink mx-auto"></div>
          <p className="font-inter font-light text-gray-700 text-sm leading-relaxed mt-4">
            Esta dramaturgia emerge da colaboração entre inteligência artificial e criatividade humana.
            Cada prompt é uma exploração dos limites entre o sintético e o orgânico,
            uma investigação poética sobre a natureza da criação no século XXI.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TableOfContents;
