// Type definitions for Paged.js
declare global {
  interface Window {
    Paged: any;
  }
}

import { marked } from 'marked';

export interface PrintOptions {
  format: 'A5' | 'A4';
  margin: string;
  bleed: string;
  marks: boolean;
  orientation: 'portrait' | 'landscape';
}

export interface PrintContent {
  title: string;
  subtitle: string;
  sections: PrintSection[];
  characters: PrintCharacter[];
}

export interface PrintSection {
  id: string;
  promptNumber: string;
  titleEn: string;
  titlePt: string;
  contentEn: string;
  contentPt: string;
  blocksEn: PrintBlock[];
  blocksPt: PrintBlock[];
}

export interface PrintBlock {
  type: 'rubric' | 'speech';
  speaker?: string;
  text: string;
}

export interface PrintCharacter {
  name: string;
  description: string;
  language: 'en' | 'pt';
}

// Initialize Paged.js
export const initPagedJS = async (): Promise<any> => {
  if (typeof window !== 'undefined') {
    const { Previewer } = await import('pagedjs');
    return Previewer;
  }
  return null;
};

// Generate PDF from HTML content
export const generatePDF = async (
  htmlContent: string,
  options: PrintOptions = {
    format: 'A5',
    margin: '15mm',
    bleed: '3mm',
    marks: false,
    orientation: 'portrait'
  }
): Promise<Blob> => {
  try {
    const Previewer = await initPagedJS();
    if (!Previewer) {
      throw new Error('Paged.js not available');
    }

    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    // Configure Paged.js
    const previewer = new Previewer();

    const flow = await previewer.preview(container, [], {
      format: options.format,
      margin: options.margin,
      bleed: options.bleed,
      marks: options.marks,
      orientation: options.orientation
    });

    // Generate PDF
    const pdf = await flow.document.pdf();

    // Clean up
    document.body.removeChild(container);

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Download PDF
export const downloadPDF = async (
  htmlContent: string,
  filename: string = 'synthetic-creativity.pdf',
  options?: PrintOptions
): Promise<void> => {
  try {
    const pdf = await generatePDF(htmlContent, options);

    // Create download link
    const url = URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

// Print to browser
export const printContent = async (
  htmlContent: string,
  options?: PrintOptions
): Promise<void> => {
  try {
    const Previewer = await initPagedJS();
    if (!Previewer) {
      throw new Error('Paged.js not available');
    }

    // Create print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Could not open print window');
    }

    // Write content to print window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Synthetic Creativity - Print</title>
          <link rel="stylesheet" href="/src/styles/print.css">
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for content to load
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  } catch (error) {
    console.error('Error printing content:', error);
    throw error;
  }
};

// Format content for print layout
export const formatPrintContent = (content: PrintContent, options?: PrintOptions): string => {
  // Definir o CSS dinâmico para orientação e margens
  const pageSize = `${options?.format || 'A5'}${options?.orientation ? ' ' + options.orientation : ''}`;
  const margin = options?.margin || '15mm';
  const bleed = options?.bleed || '0mm';
  const marks = options?.marks ? 'marks: crop;' : '';
  const dynamicPageCSS = `
    <style>
      @page {
        size: ${pageSize};
        margin: ${margin};
        bleed: ${bleed};
        ${marks}
        @top-center {
          content: "Synthetic Creativity | Criatividade Sintética";
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10pt;
          color: #22113E;
        }
        @bottom-center {
          content: counter(page);
          font-family: 'Courier Prime', monospace;
          font-size: 10pt;
          color: #22113E;
        }
      }
      .pagedjs-content { width: 100%; box-sizing: border-box; }
      .print-bilingual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-top: 6mm; }
      .print-column { border-left: 2pt solid; padding-left: 4mm; }
      .print-column.en { border-left-color: #08F2DB; }
      .print-column.pt { border-left-color: #EA7DFF; }
    </style>
  `;

  return `
    ${dynamicPageCSS}
    <div class="pagedjs-content">
      <!-- Cover Page -->
      <section class="print-cover">
        <h1 class="print-cover-title">SYNTHETIC CREATIVITY</h1>
        <h2 class="print-cover-subtitle">Criatividade Sintética</h2>
        <p class="print-cover-description">
          An experimental bilingual publication that explores the boundaries between
          artificial intelligence and human creativity through dramatic writing.
        </p>
        <p class="print-cover-description">
          Uma publicação experimental bilíngue que explora os limites entre
          inteligência artificial e criatividade humana através da escrita dramática.
        </p>
      </section>

      <!-- Table of Contents -->
      <section class="print-toc">
        <h2 class="print-toc-title">Contents | Índice</h2>
        ${content.sections.map((section, index) => `
          <div class="print-toc-item">
            <span class="print-toc-number">${section.promptNumber}</span>
            <span class="print-toc-text">${section.titleEn} / ${section.titlePt}</span>
            <span class="print-toc-page">${index + 3}</span>
          </div>
        `).join('')}
      </section>

      <!-- Character List (if available) -->
      ${content.characters.length > 0 ? `
        <section class="print-character-list">
          <div class="print-character-section en">
            <h3 class="print-character-title en">Characters (in alphabetical order)</h3>
            ${content.characters
              .filter(char => char.language === 'en')
              .map(char => `
                <div class="print-character-item">
                  <span class="print-character-name">${char.name}</span>: ${char.description}
                </div>
              `).join('')}
          </div>
          <div class="print-character-section pt">
            <h3 class="print-character-title pt">Personagens (em ordem alfabética)</h3>
            ${content.characters
              .filter(char => char.language === 'pt')
              .map(char => `
                <div class="print-character-item">
                  <span class="print-character-name">${char.name}</span>: ${char.description}
                </div>
              `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Content Sections -->
      ${content.sections.map((section, index) => `
        <section class="${index > 0 ? 'page-break' : ''}">
          <div class="print-prompt-number">${section.promptNumber}</div>
          <h2 class="print-title">${section.titleEn} / ${section.titlePt}</h2>
          <div class="print-bilingual-grid">
            <div class="print-column en">
              ${section.blocksEn.map(block =>
                block.type === 'speech'
                  ? `<div class="print-speaker">${block.speaker}:</div><div class="print-speech">${marked(block.text)}</div>`
                  : `<div class="print-rubric">${marked(block.text)}</div>`
              ).join('')}
            </div>
            <div class="print-column pt">
              ${section.blocksPt.map(block =>
                block.type === 'speech'
                  ? `<div class="print-speaker">${block.speaker}:</div><div class="print-speech">${marked(block.text)}</div>`
                  : `<div class="print-rubric">${marked(block.text)}</div>`
              ).join('')}
            </div>
          </div>
        </section>
      `).join('')}

      <!-- Credits -->
      <section class="print-credits page-break">
        <h2 class="print-credits-title">Credits | Créditos</h2>
        <div class="print-credits-content">
          <p>2024 • Laboratory of Creativity <em>in vitro</em></p>
          <p>An experimental publication exploring the emergent process of AI-human collaboration in dramatic writing.</p>
          <p>Uma publicação experimental explorando o processo emergente de colaboração IA-humano na escrita dramática.</p>
        </div>
      </section>
    </div>
  `;
};

// Convert markdown content to print format
export const convertToPrintFormat = (
  ptBrSections: any[],
  enSections: any[],
  ptBrMarkdown: string,
  enMarkdown: string
): PrintContent => {
  // Extract characters from Prompt Zero
  const characterArrayPt = extractCharacterArray(ptBrMarkdown);
  const characterArrayEn = extractCharacterArray(enMarkdown);

  const characters: PrintCharacter[] = [
    ...characterArrayEn.map(char => ({ ...char, language: 'en' as const })),
    ...characterArrayPt.map(char => ({ ...char, language: 'pt' as const }))
  ];

  const sections: PrintSection[] = ptBrSections.map((ptSection, index) => {
    const enSection = enSections[index];
    return {
      id: ptSection.id,
      promptNumber: ptSection.promptNumber,
      titleEn: enSection?.titleEn || ptSection.titleEn,
      titlePt: ptSection.titlePt,
      contentEn: enSection?.content || '',
      contentPt: ptSection.content,
      blocksEn: splitPromptBlocks(enSection?.content || ''),
      blocksPt: splitPromptBlocks(ptSection.content)
    };
  });

  return {
    title: 'Synthetic Creativity',
    subtitle: 'Criatividade Sintética',
    sections,
    characters
  };
};

// Helper functions (import from markdownParser)
import { extractCharacterArray, splitPromptBlocks } from './markdownParser';
