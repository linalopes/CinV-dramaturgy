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
  const margin = options?.margin || '0mm'; // Margem zero para a folha inteira
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
      body, .pagedjs-content, .print-cover {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box;
      }
      .pagedjs-content { width: 100vw; min-height: 100vh; box-sizing: border-box; }
      .print-cover {
        width: 100vw;
        min-height: 100vh;
        background: url('/main.svg') center center/cover no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        gap: 1.2em;
      }
      .cover-title-box {
        background: rgba(34, 17, 62, 0.92);
        color: #08F2DB;
        padding: 0.7em 1.5em;
        border-radius: 0.3em;
        margin-bottom: 0.5em;
        text-align: center;
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        box-shadow: none;
      }
      .cover-title-box h1 {
        color: #08F2DB;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 2.5em;
        font-weight: 300;
        margin: 0 0 0.2em 0;
        letter-spacing: 0.12em;
      }
      .cover-title-box h2 {
        color: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 1.2em;
        font-weight: 300;
        margin: 0;
        letter-spacing: 0.05em;
        text-transform: none;
      }
      .cover-desc-box {
        background: rgba(34, 17, 62, 0.92);
        color: #fff;
        padding: 0.7em 1.5em;
        border-radius: 0.3em;
        max-width: 90vw;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 0.95em;
        font-weight: 300;
        box-shadow: none;
        margin-top: 2.5em;
      }
      .cover-desc-box p {
        color: #fff;
        margin: 0.3em 0;
        font-family: 'Inter', sans-serif;
        font-size: 0.95em;
        font-weight: 300;
      }
      .cover-desc-box p + p {
        margin-top: 1.5em;
      }
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
        <div class="cover-title-box">
          <h1 class="print-cover-title">SYNTHETIC CREATIVITY</h1>
          <h2 class="print-cover-subtitle">Criatividade Sintética</h2>
        </div>
        <div class="cover-desc-box">
          <p class="print-cover-description">
            An experimental bilingual publication that explores the boundaries between
            artificial intelligence and human creativity through dramatic writing.
          </p>
          <p class="print-cover-description">
            Uma publicação experimental bilíngue que explora os limites entre
            inteligência artificial e criatividade humana através da escrita dramática.
          </p>
        </div>
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
          <div class="print-credits-text">
            <p>An experimental publication exploring the emergent process of AI-human collaboration in dramatic writing.</p>
            <p>Uma publicação experimental explorando o processo emergente de colaboração IA-humano na escrita dramática.</p>
          </div>
          <div style="margin-top:1em; border:1px solid #CAD8D8; border-radius:16px;">
            <div style="display:flex; flex-wrap:wrap; gap:20px;">
              <div style="flex:1; min-width:350px;">
                <div style="font-family:'Space Grotesk',sans-serif; font-size:14px; color:#EA7DFF; font-weight:700; margin-bottom:4px;">
                  CONCEIVED BY <br> LINA LOPES AND EDUARDO PADILHA.<br>
                  WITH PROVOCATIONS BY PEDRO FONSECA.
                </div>
                <div style="font-family:'Space Grotesk',sans-serif; font-size:14px; color:#08F2DB; font-weight:700;">
                  Writing and Dramaturgy Collaboration: <br> Recy Freire and Raquel Parrine.
                </div>
              </div>
              <div style="flex:1; min-width:350px;">
                <div style="font-family:'Space Grotesk',sans-serif; font-size:15px; color:#EA7DFF; font-weight:700; margin-bottom:4px;">
                  CONCEPÇÃO DE <br>LINA LOPES E EDUARDO PADILHA.<br>
                  COM PROVOCAÇÕES DE PEDRO FONSECA.
                </div>
                <div style="font-family:'Space Grotesk',sans-serif; font-size:14px; color:#08F2DB; font-weight:700;">
                  Colaboração em Escrita e Dramaturgia: <br> Recy Freire e Raquel Parrine.
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="">2024 • Laboratory of Creativity <em>in vitro</em></p>
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
