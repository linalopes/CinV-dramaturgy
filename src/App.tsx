import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cover from './components/Cover';
import TableOfContents from './components/TableOfContents';
import BilingualPage from './components/BilingualPage';
import VisualElements from './components/VisualElements';
import Credits from './components/Credits';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { parseMarkdownSections, PromptSection, splitPromptBlocks, PromptBlock } from './utils/markdownParser';
// @ts-ignore
import ptBrMarkdown from './content/pt-br.md?raw';
// @ts-ignore
import enMarkdown from './content/en.md?raw';
import TestMarkdown from './components/TestMarkdown';

function App() {
  const [currentSection, setCurrentSection] = useState<string>('cover');
  const [showNavigation, setShowNavigation] = useState(false);
  const [ptBrSections, setPtBrSections] = useState<PromptSection[]>([]);
  const [enSections, setEnSections] = useState<PromptSection[]>([]);

  useEffect(() => {
    try {
      const ptBr = parseMarkdownSections(ptBrMarkdown);
      const en = parseMarkdownSections(enMarkdown);
      setPtBrSections(ptBr);
      setEnSections(en);
      console.log('Parsed sections:', ptBr);
    } catch (error) {
      console.error('Error parsing markdown:', error);
    }
  }, []);

  // Gera as seções dinamicamente a partir dos markdowns
  const dynamicSections = [
    { id: 'cover', title: 'Cover / Capa' },
    { id: 'contents', title: 'Contents / Índice' },
    ...ptBrSections.map((section, idx) => ({
      id: `prompt${idx}`,
      title: `${enSections[idx]?.titleEn || section.titleEn || section.titlePt} / ${section.titlePt}`
    })),
    { id: 'epilogue', title: 'Epilogue / Epílogo' },
    { id: 'credits', title: 'Credits / Créditos' },
  ];

  const currentIndex = dynamicSections.findIndex(s => s.id === currentSection);

  const navigateNext = () => {
    if (currentIndex < dynamicSections.length - 1) {
      setCurrentSection(dynamicSections[currentIndex + 1].id);
    }
  };

  const navigatePrev = () => {
    if (currentIndex > 0) {
      setCurrentSection(dynamicSections[currentIndex - 1].id);
    }
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'cover':
        return <Cover />;
      case 'contents':
        return <TableOfContents onNavigate={handleNavigate} sections={dynamicSections} ptBrSections={ptBrSections} enSections={enSections} />;
      default:
        if (currentSection.startsWith('prompt')) {
          const idx = parseInt(currentSection.replace('prompt', ''), 10);
          if (ptBrSections[idx] && enSections[idx]) {
            return (
              <BilingualPage
                promptNumber={ptBrSections[idx].promptNumber}
                titlePt={ptBrSections[idx].titlePt}
                titleEn={enSections[idx].titleEn}
                blocksPt={splitPromptBlocks(ptBrSections[idx].content)}
                blocksEn={splitPromptBlocks(enSections[idx].content)}
              />
            );
          }
          return <div>Loading...</div>;
        }
        if (currentSection === 'epilogue') {
          return (
            <BilingualPage
              promptNumber="∞"
              titlePt="EPÍLOGO RECURSIVO"
              titleEn="RECURSIVE EPILOGUE"
              blocksPt={[]}
              blocksEn={[]}
            />
          );
        }
        if (currentSection === 'credits') {
          return <Credits />;
        }
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
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 border-l border-gray-green flex flex-col"
          >
            <div className="p-6 border-b border-gray-green">
              <h3 className="font-space font-light text-xl text-deep-purple uppercase tracking-wider">
                Navigation
              </h3>
            </div>
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {dynamicSections.map((section, index) => (
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
              </div>
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
              {currentIndex + 1} / {dynamicSections.length}
            </span>

            <motion.button
              onClick={navigateNext}
              disabled={currentIndex === dynamicSections.length - 1}
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
