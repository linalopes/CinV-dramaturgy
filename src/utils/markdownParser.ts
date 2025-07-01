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
  // Remove text before the first prompt
  const firstPromptIndex = markdownContent.search(/^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]/m);
  if (firstPromptIndex === -1) return [];
  const contentFromFirstPrompt = markdownContent.substring(firstPromptIndex);

  // Split: each section starts with the prompt header
  const rawSections = contentFromFirstPrompt.split(/(?=^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-])/gm).filter(section => section.trim());
  // Filter only sections that actually have a valid header
  const sections = rawSections.filter(section => /^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]/m.test(section));

  return sections.map((section, index) => {
    // Extract the header and title robustly
    const titleMatch = section.match(/^##\s*\*?Prompt\s*(Zero|\d+)\*?\s*[–-]\s*(.+)$/m);
    if (!titleMatch) {
      throw new Error('Invalid or unexpected prompt header: ' + section.slice(0, 80));
    }
    const promptNumber = titleMatch[1] === 'Zero' ? '00' : titleMatch[1].padStart(2, '0');
    const titlePt = titleMatch[2].trim();

    // Extract frontmatter if it exists (between <!-- -->)
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

    // Extract characters from the first lines
    const characters = extractCharacters(section);
    // Extract context from descriptions in parentheses
    const context = extractContext(section);
    // Identify main speaker
    const speaker = extractMainSpeaker(section);
    // Generate rubric based on content
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
        // String with quotes
        result[key] = value.slice(1, -1);
      } else {
        // Simple string
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
  // Look for sentences that seem to be rubrics
  const rubricMatch = section.match(/\*\*Rubric:\*\*\s*(.+)/);
  if (rubricMatch) {
    return rubricMatch[1].trim();
  }

  // Fallback: first meaningful sentence
  const sentences = section.split(/[.!?]/).filter(s => s.trim().length > 20);
  return sentences.length > 0 ? sentences[0].trim() : 'System initializing creativity parameters';
}

function translateTitle(titlePt: string): string {
  // Simple title mapping
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
  // Do not filter empty lines to preserve paragraphs inside speeches
  const lines = content.split(/\n/).map(l => l.replace(/\s+$/, ''));
  const blocks: PromptBlock[] = [];
  let currentSpeaker = '';
  let buffer: string[] = [];
  let soliloquyPrefix = '';

  function pushSpeech() {
    // Remove empty lines from the start and end of the buffer, but preserve them between paragraphs
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
    // Standalone rubric (line in parentheses, with or without underscore)
    if (/^_?\(.+\)_?$/.test(line.trim())) {
      pushSpeech();
      blocks.push({ type: 'rubric', text: line.trim() });
      currentSpeaker = '';
      continue;
    }
    // Detect soliloquy in Portuguese or English
    const soliloquyMatch = line.match(/^(SOLILÓQUIO|SOLILOQUY)[\s:]+([A-Za-zÀ-ÿ'\- ]+):?\s*(.*)$/i);
    const soliloquyEnMatch = line.match(/^([A-Za-zÀ-ÿ'\- ]+)'S SOLILOQUY: ?(.*)$/i);
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
    // Detect speaker (e.g., **NAME**:)
    const speakerMatch = line.match(/^\*\*([^*]+)\*\*:\s*(.*)$/);
    if (speakerMatch) {
      pushSpeech();
      currentSpeaker = speakerMatch[1].trim();
      buffer = [speakerMatch[2]];
      continue;
    }
    // If inside a speech, accumulate lines
    if (currentSpeaker) {
      buffer.push(line);
    } else {
      // Otherwise, treat as rubric
      if (line.trim()) {
        blocks.push({ type: 'rubric', text: line });
      }
    }
  }
  pushSpeech();
  return blocks;
}

export function extractCharacterList(markdownContent: string): string | null {
  // Extracts the entire character block as a string (for legacy or display)
  const match = markdownContent.match(/^##\s*(Personagens|Characters)[^\n]*\n([\s\S]*?)(?=^##\s|\Z)/m);
  return match ? match[2].trim() : null;
}

export function extractCharacterArray(markdownContent: string): { name: string, description: string }[] {
  // Extracts each character as an object { name, description } from the character block
  const match = markdownContent.match(/^##\s*(Personagens|Characters)[^\n]*\n([\s\S]*?)(?=^##\s|\Z)/m);
  if (match) {
    const lines = (match[2] || '').split('\n');
    const trimmedLines = lines.map(line => line.trim()).filter(line => line.length > 0);
    const characters = trimmedLines.map(line => {
      const m = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
      return m ? { name: m[1].trim(), description: m[2].trim() } : null;
    }).filter(Boolean) as { name: string, description: string }[];
    return characters;
  }
  return [];
}
