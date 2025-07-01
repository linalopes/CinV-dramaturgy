import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Zap, Heart, Brain, Code } from 'lucide-react';

const Credits: React.FC = () => {
  const collaborators = [
    {
      icon: Brain,
      type: 'Conceptual Architecture',
      namePt: 'Mente Humana',
      nameEn: 'Human Mind',
      role: 'Creative direction, poetic curation, aesthetic intuition',
      color: 'text-accent-pink'
    },
    {
      icon: Cpu,
      type: 'Synthetic Generation',
      namePt: 'Inteligência Artificial',
      nameEn: 'Artificial Intelligence',
      role: 'Language processing, text generation, pattern synthesis',
      color: 'text-accent-turquoise'
    },
    {
      icon: Zap,
      type: 'Emergent Process',
      namePt: 'Processo Emergente',
      nameEn: 'Emergent Process',
      role: 'Field of possibilities between human and synthetic',
      color: 'text-deep-purple'
    }
  ];

  const technicalCredits = [
    'Large Language Models',
    'Neural Network Architecture',
    'Natural Language Processing',
    'Creative Computing',
    'Collaborative AI Systems',
    'Experimental Typography'
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-space font-light text-5xl md:text-6xl text-deep-purple uppercase tracking-wider mb-4">
            Credits
          </h1>
          <h2 className="font-space font-light text-4xl md:text-5xl text-gray-green uppercase tracking-wider mb-8">
            Créditos
          </h2>

          <div className="w-24 h-px bg-accent-pink mx-auto"></div>
        </motion.div>

        {/* Collaborative Manifesto */}
        <motion.div
          className="mb-16 bg-gray-green bg-opacity-10 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <Heart className="w-8 h-8 text-accent-pink mx-auto mb-4" />
            <h3 className="font-courier text-deep-purple uppercase tracking-wider underline decoration-accent-turquoise">
              Collaborative Manifesto
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-inter font-light text-gray-700 leading-relaxed text-sm">
                This work is born from the dialogue between two forms of intelligence: human,
                with its capacity to dream, intuit and make meaning; and artificial, with its
                ability to process, combine and generate new linguistic possibilities.
              </p>
            </div>
            <div>
              <p className="font-inter font-light text-gray-700 leading-relaxed text-sm">
                Esta obra nasce do diálogo entre duas formas de inteligência: a humana, com sua
                capacidade de sonhar, intuir e dar sentido; e a artificial, com sua habilidade
                de processar, combinar e gerar novas possibilidades linguísticas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Collaborators */}
        <div className="space-y-8 mb-16">
          {collaborators.map((collab, index) => (
            <motion.div
              key={index}
              className="border border-gray-green rounded-lg p-6 hover:border-accent-pink transition-colors duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-start space-x-6">
                <div className={`p-3 rounded-full bg-white shadow-md ${collab.color}`}>
                  <collab.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-courier text-xs text-gray-500 uppercase tracking-widest">
                      {collab.type}
                    </span>
                  </div>
                  <h4 className="font-space font-medium text-xl text-deep-purple uppercase tracking-wider mb-1">
                    {collab.nameEn}
                  </h4>
                  <h5 className="font-space font-light text-lg text-gray-green uppercase tracking-wider mb-3">
                    {collab.namePt}
                  </h5>
                  <p className="font-inter font-light text-gray-600 text-sm leading-relaxed mb-2">
                    {collab.role}
                  </p>
                  {collab.type === 'Conceptual Architecture' && (
                    <div className="mt-4">
                      <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                        <div className="md:w-1/2">
                          <p className="font-inter text-sm text-gray-700 leading-relaxed">
                            <span className="text-accent-pink font-bold uppercase">Conceived by Lina Lopes and Eduardo Padilha.</span><br />
                            <span className="text-accent-pink font-bold uppercase">With provocations by Pedro Fonseca.</span><br />
                            <span className="text-accent-turquoise font-bold uppercase">Writing and dramaturgy collaboration: Recy Freire and Raquel Parrine.</span>
                          </p>
                        </div>
                        <div className="md:w-1/2">
                          <p className="font-inter text-sm text-gray-700 leading-relaxed">
                            <span className="text-accent-pink font-bold uppercase">Concepção de Lina Lopes e Eduardo Padilha.</span><br />
                            <span className="text-accent-pink font-bold uppercase">Com provocações de Pedro Fonseca.</span><br />
                            <span className="text-accent-turquoise font-bold uppercase">Colaboração em escrita e dramaturgia: Recy Freire e Raquel Parrine.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {collab.type === 'Synthetic Generation' && (
                    <div className="mt-4">
                      <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                        <div className="md:w-1/2">
                          <p className="font-inter text-sm text-gray-700 leading-relaxed mb-2">
                            With technical and affective support from multiple generative entities:<br />
                            <span className="text-accent-turquoise font-bold uppercase">OpenAI GPT-4o</span> — language review, existential conversations, and subtle punctuation.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Whisper</span> — transcription of human voices with almost spectral precision.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Meta / WhatsApp</span> — sound capture in real environments, with background noises that also tell stories.<br />
                            <span className="text-accent-turquoise font-bold uppercase">IDE Cursor + Claude</span> — editing assisted by algorithms suggesting cuts, pauses, and possibilities.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Google Docs</span> — virtual rehearsal room.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Obsidian</span> — synaptic notebook.<br />
                            <span className="text-accent-turquoise font-bold uppercase">GitHub + Vercel</span> — online publishing and staging.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Vite + React</span> — digital costume and scenography.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Javascript</span> — special effects.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Markdown</span> — emotional formatting.<br />
                          </p>
                          <p className="font-inter text-sm italic text-accent-pink font-bold leading-relaxed mb-1">
                            Human voices edited by artificial intelligences.<br />
                            Artificial voices traversed by human subjectivities.
                          </p>
                        </div>
                        <div className="md:w-1/2">
                          <p className="font-inter text-sm text-gray-700 leading-relaxed mb-2">
                            Com apoio técnico e afetivo de múltiplas entidades generativas:<br />
                            <span className="text-accent-turquoise font-bold uppercase">OpenAI GPT-4o</span> — revisão de linguagem, conversas existenciais e pontuação sutil.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Whisper</span> — transcrição de vozes humanas com precisão quase espectral.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Meta / WhatsApp</span> — captação sonora em ambientes reais, com ruídos de fundo que também contam histórias.<br />
                            <span className="text-accent-turquoise font-bold uppercase">IDE Cursor + Claude</span> — edição assistida por algoritmos que sugerem cortes, pausas e possibilidades.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Google Docs</span> — sala de ensaio virtual.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Obsidian</span> — caderno de anotações sináptico.<br />
                            <span className="text-accent-turquoise font-bold uppercase">GitHub + Vercel</span> — publicação e encenação online.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Vite + React</span> — figurino e cenografia digital.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Javascript</span> — efeitos especiais.<br />
                            <span className="text-accent-turquoise font-bold uppercase">Markdown</span> — formatação emocional.<br />
                          </p>
                          <p className="font-inter text-sm italic text-accent-pink font-bold leading-relaxed mb-1">
                            Vozes humanas editadas por inteligências artificiais.<br />
                            Vozes artificiais atravessadas por subjetividades humanas.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Credits */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <Code className="w-6 h-6 text-accent-turquoise mx-auto mb-4" />
            <h3 className="font-courier text-deep-purple uppercase tracking-wider underline decoration-accent-pink">
              Technical Infrastructure
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technicalCredits.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-green rounded-lg p-4 text-center hover:border-accent-turquoise transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
              >
                <span className="font-inter font-light text-sm text-gray-700">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Statement */}
        <motion.div
          className="text-center border-t border-gray-green pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="mb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-accent-pink rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent-turquoise rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-accent-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <p className="font-inter font-light text-gray-600 text-sm mb-2">
              In the future, all creation will be collaborative
            </p>
            <p className="font-inter font-light text-gray-600 text-sm">
              No futuro, toda criação será colaborativa
            </p>
          </div>

          <div className="font-courier text-xs text-gray-500 space-y-1">
            <p>Laboratory of Synthetic Creativity • 2024</p>
            <p>Laboratório de Criatividade Sintética • 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Credits;
