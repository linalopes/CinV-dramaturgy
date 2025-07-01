import React from 'react';
import { parseMarkdownSections, PromptSection } from '../utils/markdownParser';
// @ts-ignore
import ptBrMarkdown from '../content/pt-br.md?raw';
// @ts-ignore
import enMarkdown from '../content/en.md?raw';

const TestMarkdown: React.FC = () => {
  const [ptBrSections, setPtBrSections] = React.useState<PromptSection[]>([]);
  const [enSections, setEnSections] = React.useState<PromptSection[]>([]);

  React.useEffect(() => {
    try {
      const ptBr = parseMarkdownSections(ptBrMarkdown);
      const en = parseMarkdownSections(enMarkdown);
      setPtBrSections(ptBr);
      setEnSections(en);
      console.log('PT-BR Sections:', ptBr);
      console.log('EN Sections:', en);
    } catch (error) {
      console.error('Error parsing markdown:', error);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown Parser Test</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">PT-BR Sections ({ptBrSections.length})</h2>
        {ptBrSections.map((section, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <h3 className="font-bold">{section.titlePt}</h3>
            <p><strong>ID:</strong> {section.id}</p>
            <p><strong>Prompt Number:</strong> {section.promptNumber}</p>
            <p><strong>Speaker:</strong> {section.speaker}</p>
            <p><strong>Rubric:</strong> {section.rubric}</p>
            <p><strong>Characters:</strong> {section.characters.join(', ')}</p>
            <p><strong>Content Preview:</strong> {section.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">EN Sections ({enSections.length})</h2>
        {enSections.map((section, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <h3 className="font-bold">{section.titleEn}</h3>
            <p><strong>ID:</strong> {section.id}</p>
            <p><strong>Prompt Number:</strong> {section.promptNumber}</p>
            <p><strong>Speaker:</strong> {section.speaker}</p>
            <p><strong>Rubric:</strong> {section.rubric}</p>
            <p><strong>Characters:</strong> {section.characters.join(', ')}</p>
            <p><strong>Content Preview:</strong> {section.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestMarkdown;
