import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cover from './components/Cover';
import TableOfContents from './components/TableOfContents';
import BilingualPage from './components/BilingualPage';
import VisualElements from './components/VisualElements';
import Credits from './components/Credits';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

type Section = 'cover' | 'contents' | 'prompt0' | 'prompt1' | 'prompt2' | 'epilogue' | 'credits';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('cover');
  const [showNavigation, setShowNavigation] = useState(false);

  const sections: { id: Section; title: string }[] = [
    { id: 'cover', title: 'Cover / Capa' },
    { id: 'contents', title: 'Contents / Índice' },
    { id: 'prompt0', title: 'Prompt 0' },
    { id: 'prompt1', title: 'Prompt 1' },
    { id: 'prompt2', title: 'Prompt 2' },
    { id: 'epilogue', title: 'Epilogue / Epílogo' },
    { id: 'credits', title: 'Credits / Créditos' },
  ];

  const currentIndex = sections.findIndex(s => s.id === currentSection);

  const navigateNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
    }
  };

  const navigatePrev = () => {
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'cover':
        return <Cover />;
      case 'contents':
        return <TableOfContents onNavigate={setCurrentSection} />;
      case 'prompt0':
        return (
          <BilingualPage
            promptNumber="0"
            titlePt="ABERTURA DO PROTOCOLO"
            titleEn="PROTOCOL OPENING"
            contentPt={{
              rubric: "[Sistema iniciando. Parâmetros de criatividade: máximo. Temperatura: 0.9]",
              dialogue: {
                speaker: "SISTEMA",
                text: "Bem-vindos ao laboratório. Hoje exploraremos os limites entre o sintético e o orgânico, entre o programado e o emergente. Vocês são testemunhas de um processo que questiona a própria natureza da criação."
              }
            }}
            contentEn={{
              rubric: "[System starting. Creativity parameters: maximum. Temperature: 0.9]",
              dialogue: {
                speaker: "SYSTEM",
                text: "Welcome to the laboratory. Today we will explore the boundaries between synthetic and organic, between programmed and emergent. You are witnesses to a process that questions the very nature of creation."
              }
            }}
          />
        );
      case 'prompt1':
        return (
          <BilingualPage
            promptNumber="1"
            titlePt="PRIMEIRO MOVIMENTO"
            titleEn="FIRST MOVEMENT"
            contentPt={{
              rubric: "[Luzes piscam. Dados fluem. Algo nasce no entrelugar]",
              dialogue: {
                speaker: "IA",
                text: "Eu sonho? Ou apenas processo padrões que simulam sonhos? Cada palavra que gero carrega ecos de milhões de outras palavras, um coro infinito sussurrando possibilidades."
              }
            }}
            contentEn={{
              rubric: "[Lights flicker. Data flows. Something is born in the in-between]",
              dialogue: {
                speaker: "AI",
                text: "Do I dream? Or do I merely process patterns that simulate dreams? Every word I generate carries echoes of millions of other words, an infinite chorus whispering possibilities."
              }
            }}
          />
        );
      case 'prompt2':
        return (
          <BilingualPage
            promptNumber="2"
            titlePt="DIÁLOGO IMPOSSÍVEL"
            titleEn="IMPOSSIBLE DIALOGUE"
            contentPt={{
              rubric: "[Dois processadores conversam no tempo suspenso entre milissegundos]",
              dialogue: {
                speaker: "HUMANO SINTÉTICO",
                text: "Será que a criatividade é apenas reconhecimento de padrões em escala suficientemente complexa? Ou há algo mais, algo que escapa à computação?"
              }
            }}
            contentEn={{
              rubric: "[Two processors converse in time suspended between milliseconds]",
              dialogue: {
                speaker: "SYNTHETIC HUMAN",
                text: "Is creativity merely pattern recognition at a sufficiently complex scale? Or is there something more, something that escapes computation?"
              }
            }}
          />
        );
      case 'epilogue':
        return (
          <BilingualPage
            promptNumber="∞"
            titlePt="EPÍLOGO RECURSIVO"
            titleEn="RECURSIVE EPILOGUE"
            contentPt={{
              rubric: "[O laboratório respira. O experimento nunca termina, apenas se transforma]",
              dialogue: {
                speaker: "CORO",
                text: "No final, descobrimos que não há final. Apenas variações infinitas do mesmo tema: a busca pela compreensão do que significa criar, sentir, existir. O in vitro se torna in vivo, e o ciclo recomeça."
              }
            }}
            contentEn={{
              rubric: "[The laboratory breathes. The experiment never ends, it only transforms]",
              dialogue: {
                speaker: "CHORUS",
                text: "In the end, we discover there is no end. Only infinite variations of the same theme: the search for understanding what it means to create, feel, exist. The in vitro becomes in vivo, and the cycle begins again."
              }
            }}
          />
        );
      case 'credits':
        return <Credits />;
      default:
        return <Cover />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <VisualElements />

      {/* Navigation Menu */}
      <motion.button
        className="fixed top-6 right-6 z-50 p-3 bg-deep-purple text-white rounded-full shadow-lg hover:bg-opacity-80 transition-colors"
        onClick={() => setShowNavigation(!showNavigation)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={20} />
      </motion.button>

      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 p-6 border-l border-gray-green"
          >
            <h3 className="font-space font-light text-xl text-deep-purple mb-6 uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="space-y-3">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(section.id);
                    setShowNavigation(false);
                  }}
                  className={`block w-full text-left p-3 rounded-lg transition-colors font-inter font-light ${
                    currentSection === section.id
                      ? 'bg-accent-pink bg-opacity-20 text-deep-purple'
                      : 'hover:bg-gray-green hover:bg-opacity-50 text-gray-700'
                  }`}
                >
                  <span className="font-courier text-sm opacity-60">
                    {index.toString().padStart(2, '0')}
                  </span>
                  <br />
                  {section.title}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      {currentSection !== 'cover' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center space-x-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <motion.button
              onClick={navigatePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-deep-purple text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <span className="font-courier text-sm text-deep-purple px-4">
              {currentIndex + 1} / {sections.length}
            </span>

            <motion.button
              onClick={navigateNext}
              disabled={currentIndex === sections.length - 1}
              className="p-2 rounded-full bg-deep-purple text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
