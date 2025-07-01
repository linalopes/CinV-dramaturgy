import matter from 'gray-matter';

export interface PromptSection {
  id: string;
  promptNumber: string;
  titleEn: string;
  titlePt: string;
  rubric: string;
  speaker: string;
  content: string;
  characters: string[];
  context?: string;
}

export interface LanguageContent {
  rubric: string;
  dialogue: {
    speaker: string;
    text: string;
  };
}

export function parseMarkdownSections(markdownContent: string): PromptSection[] {
  // Remove o texto antes do primeiro prompt
  const firstPromptIndex = markdownContent.search(/^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]/m);
  if (firstPromptIndex === -1) return [];
  const contentFromFirstPrompt = markdownContent.substring(firstPromptIndex);

  // Split: cada seção começa com o header do prompt
  const rawSections = contentFromFirstPrompt.split(/(?=^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-])/gm).filter(section => section.trim());
  // Filtra apenas seções que realmente têm header válido
  const sections = rawSections.filter(section => /^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]/m.test(section));

  return sections.map((section, index) => {
    // Extrai o header e o título de forma robusta
    const titleMatch = section.match(/^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]\s*(.+)$/m);
    if (!titleMatch) {
      throw new Error('Prompt header inválido ou inesperado: ' + section.slice(0, 80));
    }
    const promptNumber = titleMatch[1] === 'Zero' ? '00' : titleMatch[1].padStart(2, '0');
    const titlePt = titleMatch[2].trim();

    // Extrai o frontmatter se existir (entre <!-- -->)
    const frontmatterMatch = section.match(/<!--\s*([\s\S]*?)\s*-->/);
    let frontmatter: any = {};
    if (frontmatterMatch) {
      try {
        const frontmatterText = frontmatterMatch[1];
        frontmatter = parseFrontmatter(frontmatterText);
        section = section.replace(/<!--\s*[\s\S]*?\s*-->/, '');
      } catch (error) {
        console.warn('Error parsing frontmatter:', error);
      }
    }

    // Extrai personagens das primeiras linhas
    const characters = extractCharacters(section);
    // Extrai contexto das descrições entre parênteses
    const context = extractContext(section);
    // Identifica speaker principal
    const speaker = extractMainSpeaker(section);
    // Gera rubric baseado no conteúdo
    const rubric = generateRubric(section);

    return {
      id: `prompt${index}`,
      promptNumber,
      titleEn: frontmatter.titleEn || translateTitle(titlePt),
      titlePt: frontmatter.titlePt || titlePt,
      rubric: frontmatter.rubric || rubric,
      speaker: frontmatter.speaker || speaker,
      content: section.trim(),
      characters: frontmatter.characters || characters,
      context: frontmatter.context || context
    };
  });
}

function parseFrontmatter(text: string): any {
  const lines = text.split('\n');
  const result: any = {};

  lines.forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (value.startsWith('[') && value.endsWith(']')) {
        // Array
        result[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''));
      } else if (value.startsWith('"') && value.endsWith('"')) {
        // String com aspas
        result[key] = value.slice(1, -1);
      } else {
        // String simples
        result[key] = value.trim();
      }
    }
  });

  return result;
}

function extractCharacters(section: string): string[] {
  const characterMatch = section.match(/\*\*([^*]+)\*\*:/g);
  if (characterMatch) {
    return characterMatch.map(char => char.replace(/\*\*/g, '').replace(':', '').trim());
  }
  return [];
}

function extractContext(section: string): string {
  const contextMatch = section.match(/\(([^)]+)\)/);
  return contextMatch ? contextMatch[1] : '';
}

function extractMainSpeaker(section: string): string {
  const characters = extractCharacters(section);
  return characters.length > 0 ? characters[0] : 'SYSTEM';
}

function generateRubric(section: string): string {
  // Procura por frases que parecem ser rubricas
  const rubricMatch = section.match(/\*\*Rubric:\*\*\s*(.+)/);
  if (rubricMatch) {
    return rubricMatch[1].trim();
  }

  // Fallback: primeira frase significativa
  const sentences = section.split(/[.!?]/).filter(s => s.trim().length > 20);
  return sentences.length > 0 ? sentences[0].trim() : 'System initializing creativity parameters';
}

function translateTitle(titlePt: string): string {
  // Mapeamento simples de títulos
  const translations: { [key: string]: string } = {
    'Abertura do Protocolo': 'Protocol Opening',
    'Primeiro Movimento': 'First Movement',
    'Diálogo Impossível': 'Impossible Dialogue',
    'Epílogo Recursivo': 'Recursive Epilogue',
    'Créditos Colaborativos': 'Collaborative Credits'
  };

  return translations[titlePt] || titlePt;
}

export type PromptBlock =
  | { type: 'rubric'; text: string }
  | { type: 'speech'; speaker: string; text: string };

export function splitPromptBlocks(content: string): PromptBlock[] {
  // Não filtra linhas vazias para preservar parágrafos dentro das falas
  const lines = content.split(/\n/).map(l => l.replace(/\s+$/, ''));
  const blocks: PromptBlock[] = [];
  let currentSpeaker = '';
  let buffer: string[] = [];
  let soliloquyPrefix = '';

  function pushSpeech() {
    // Remove linhas em branco do início e fim do buffer, mas preserva entre parágrafos
    while (buffer.length && buffer[0].trim() === '') buffer.shift();
    while (buffer.length && buffer[buffer.length - 1].trim() === '') buffer.pop();
    if (currentSpeaker && buffer.length) {
      const text = soliloquyPrefix ? `${soliloquyPrefix}: ${buffer.join('\n')}` : buffer.join('\n');
      blocks.push({ type: 'speech', speaker: currentSpeaker, text });
      buffer = [];
      soliloquyPrefix = '';
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Rubrica solta (linha entre parênteses, com ou sem underscore)
    if (/^_?\(.+\)_?$/.test(line.trim())) {
      pushSpeech();
      blocks.push({ type: 'rubric', text: line.trim() });
      currentSpeaker = '';
      continue;
    }
    // Detecta solilóquio em português ou inglês
    const soliloquyMatch = line.match(/^(SOLILÓQUIO|SOLILOQUY)[\s:]+([A-Za-zÀ-ÿ'\- ]+):?\s*(.*)$/i);
    const soliloquyEnMatch = line.match(/^([A-Za-zÀ-ÿ'\- ]+)'S SOLILOQUY:?\s*(.*)$/i);
    if (soliloquyMatch) {
      pushSpeech();
      currentSpeaker = soliloquyMatch[2].trim().toUpperCase();
      soliloquyPrefix = soliloquyMatch[1].toUpperCase();
      if (soliloquyMatch[3]) {
        buffer = [soliloquyMatch[3]];
      } else {
        buffer = [];
      }
      continue;
    } else if (soliloquyEnMatch) {
      pushSpeech();
      currentSpeaker = soliloquyEnMatch[1].trim().toUpperCase();
      soliloquyPrefix = 'SOLILOQUY';
      if (soliloquyEnMatch[2]) {
        buffer = [soliloquyEnMatch[2]];
      } else {
        buffer = [];
      }
      continue;
    }
    // Fala: começa com **Personagem**: ou Personagem:
    const match = line.match(/^\*?\*?([A-Za-zÀ-ÿ0-9'\- ]+)\*?\*?:\s*(.*)$/);
    if (match) {
      pushSpeech();
      currentSpeaker = match[1].trim().toUpperCase();
      soliloquyPrefix = '';
      if (match[2]) {
        buffer = [match[2]];
      } else {
        buffer = [];
      }
      continue;
    }
    // Linha de fala (continuação ou parágrafo em branco)
    if (currentSpeaker !== '') {
      buffer.push(line);
    }
    // Fallback: ignora
  }
  // Empurra última fala, se houver
  pushSpeech();
  return blocks;
}
