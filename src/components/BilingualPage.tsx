import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { PromptBlock, extractCharacterList, extractCharacterArray } from '../utils/markdownParser';

interface BilingualPageProps {
  promptNumber: string;
  titlePt: string;
  titleEn: string;
  blocksPt: PromptBlock[];
  blocksEn: PromptBlock[];
  rawPtBrMarkdown?: string;
  rawEnMarkdown?: string;
}

const markdownComponents = {
  blockquote: ({node, ...props}: any) => (
    <blockquote className="border-l-4 border-accent-pink pl-4 italic text-lg text-accent-pink bg-pink-50 my-4 py-2">
      {props.children}
    </blockquote>
  )
};

const BilingualPage: React.FC<BilingualPageProps> = ({
  promptNumber,
  titlePt,
  titleEn,
  blocksPt,
  blocksEn,
  rawPtBrMarkdown,
  rawEnMarkdown
}) => {
  // Extrai a lista de personagens se for o Prompt Zero
  let characterArrayPt: { name: string, description: string }[] = [];
  let characterArrayEn: { name: string, description: string }[] = [];
  if (promptNumber === '00' && rawPtBrMarkdown && rawEnMarkdown) {
    characterArrayPt = extractCharacterArray(rawPtBrMarkdown);
    characterArrayEn = extractCharacterArray(rawEnMarkdown);
  }
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Lista de personagens destacada no Prompt Zero */}
        {characterArrayPt.length > 0 && characterArrayEn.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
              <div className="md:w-1/2 bg-white/80 border-l-4 border-accent-turquoise shadow-md rounded-lg p-6">
                <h2 className="font-space font-bold text-lg text-accent-turquoise mb-4">Characters (in alphabetical order)</h2>
                <ul className="space-y-3">
                  {characterArrayEn.map((char, idx) => (
                    <li key={idx}>
                      <span className="font-bold text-accent-turquoise uppercase">{char.name}</span>
                      <span className="text-gray-700">: {char.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 bg-white/80 border-l-4 border-accent-pink shadow-md rounded-lg p-6">
                <h2 className="font-space font-bold text-lg text-accent-pink mb-4">Personagens (em ordem alfabética)</h2>
                <ul className="space-y-3">
                  {characterArrayPt.map((char, idx) => (
                    <li key={idx}>
                      <span className="font-bold text-accent-pink uppercase">{char.name}</span>
                      <span className="text-gray-700">: {char.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Prompt Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            <h1 className="font-space font-light text-8xl md:text-9xl text-deep-purple uppercase tracking-wider opacity-20">
              Prompt
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-space font-medium text-6xl text-accent-pink animate-pulse-slow">
                {promptNumber}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bilingual Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* English Side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="border-l-4 border-accent-turquoise pl-6">
              <h2 className="font-space font-light text-3xl md:text-4xl text-deep-purple uppercase tracking-wider mb-6">
                {titleEn}
              </h2>
              {/* Render blocksEn */}
              <div className="space-y-8">
                {blocksEn.map((block, idx) =>
                  block.type === 'speech' ? (
                    <div key={idx} className="flex items-start space-x-4">
                      <span className="font-courier font-bold text-accent-pink text-sm uppercase tracking-wider flex-shrink-0 mt-1">
                        {block.speaker}:
                      </span>
                      <div className="font-inter font-light text-lg text-deep-purple leading-relaxed ml-0 pl-4 border-l border-accent-pink fala-markdown space-y-4">
                        <ReactMarkdown components={markdownComponents}>{block.text}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="font-courier text-sm text-gray-500 italic leading-relaxed border-l-2 border-gray-green pl-4 py-2">
                      <ReactMarkdown components={markdownComponents}>{block.text}</ReactMarkdown>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Visual Separator */}
            <div className="flex items-center space-x-4 my-8">
              <div className="w-8 h-px bg-accent-turquoise"></div>
              <div className="w-2 h-2 bg-accent-turquoise rounded-full animate-pulse"></div>
              <div className="flex-1 h-px bg-gray-green opacity-30"></div>
            </div>
          </motion.div>

          {/* Portuguese Side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="border-l-4 border-accent-pink pl-6">
              <h2 className="font-space font-light text-3xl md:text-4xl text-deep-purple uppercase tracking-wider mb-6">
                {titlePt}
              </h2>
              {/* Render blocksPt */}
              <div className="space-y-8">
                {blocksPt.map((block, idx) =>
                  block.type === 'speech' ? (
                    <div key={idx} className="flex items-start space-x-4">
                      <span className="font-courier font-bold text-accent-turquoise text-sm uppercase tracking-wider flex-shrink-0 mt-1">
                        {block.speaker}:
                      </span>
                      <div className="font-inter font-light text-lg text-deep-purple leading-relaxed ml-0 pl-4 border-l border-accent-turquoise fala-markdown space-y-4">
                        <ReactMarkdown components={markdownComponents}>{block.text}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="font-courier text-sm text-gray-500 italic leading-relaxed border-l-2 border-gray-green pl-4 py-2">
                      <ReactMarkdown components={markdownComponents}>{block.text}</ReactMarkdown>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Visual Separator */}
            <div className="flex items-center space-x-4 my-8">
              <div className="w-8 h-px bg-accent-pink"></div>
              <div className="w-2 h-2 bg-accent-pink rounded-full animate-pulse"></div>
              <div className="flex-1 h-px bg-gray-green opacity-30"></div>
            </div>
          </motion.div>
        </div>

        {/* Spectral Visualization */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <svg
              width="100%"
              height="60"
              viewBox="0 0 800 60"
              className="mx-auto opacity-60"
            >
              {Array.from({ length: 40 }, (_, i) => (
                <motion.rect
                  key={i}
                  x={i * 20}
                  y={30 - Math.random() * 25}
                  width="8"
                  height={Math.random() * 40 + 5}
                  fill={i % 3 === 0 ? '#EA7DFF' : i % 3 === 1 ? '#08F2DB' : '#CAD8D8'}
                  animate={{
                    height: [
                      Math.random() * 40 + 5,
                      Math.random() * 40 + 5,
                      Math.random() * 40 + 5
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1
                  }}
                />
              ))}
            </svg>
            <p className="font-courier text-xs text-gray-500 mt-2 uppercase tracking-widest">
              Synthetic creativity spectrogram | Espectrograma da criatividade sintética
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BilingualPage;
