import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, FileText } from 'lucide-react';
import {
  downloadPDF,
  printContent,
  formatPrintContent,
  convertToPrintFormat,
  PrintOptions
} from '../utils/printUtils';
import { parseMarkdownSections } from '../utils/markdownParser';
// @ts-ignore
import ptBrMarkdown from '../content/pt-br.md?raw';
// @ts-ignore
import enMarkdown from '../content/en.md?raw';

const PrintLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ptBrSections, setPtBrSections] = useState<any[]>([]);
  const [enSections, setEnSections] = useState<any[]>([]);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    format: 'A5',
    margin: '10mm',
    bleed: '3mm',
    marks: false,
    orientation: 'portrait'
  });

  useEffect(() => {
    try {
      const ptBr = parseMarkdownSections(ptBrMarkdown);
      const en = parseMarkdownSections(enMarkdown);
      setPtBrSections(ptBr);
      setEnSections(en);
    } catch (error) {
      console.error('Error parsing markdown:', error);
    }
  }, []);

  const handleDownloadHTML = async () => {
    const printContent = convertToPrintFormat(ptBrSections, enSections, ptBrMarkdown, enMarkdown);
    const htmlContent = formatPrintContent(printContent, printOptions);

    // Buscar o CSS de impressão da pasta public
    const cssResp = await fetch('/print.css');
    const printCss = await cssResp.text();

    // Montar HTML completo
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Synthetic Creativity - Print Export</title>
          <style>${printCss}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Baixar como arquivo
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = async () => {
    setIsLoading(true);
    try {
      const printData = convertToPrintFormat(ptBrSections, enSections, ptBrMarkdown, enMarkdown);
      const htmlContent = formatPrintContent(printData, printOptions);
      await printContent(htmlContent, printOptions);
    } catch (error) {
      console.error('Error printing:', error);
      alert('Error printing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    const printContent = convertToPrintFormat(ptBrSections, enSections, ptBrMarkdown, enMarkdown);
    const htmlContent = formatPrintContent(printContent, printOptions);

    // Buscar o CSS de impressão da pasta public
    const cssResp = await fetch('/print.css');
    const printCss = await cssResp.text();

    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      const safeHtmlContent = htmlContent.replace(/\\/g, '\\\\').replace(/`/g, '\`');
      const safePrintCss = printCss.replace(/<\//g, '<\/');
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Synthetic Creativity - Print Preview</title>
            <link rel="stylesheet" href="/interface.css" type="text/css" />
            <style>${safePrintCss}</style>
            <style>
              body {
                margin: 0;
                padding: 20px;
                background: #f5f5f5;
                font-family: 'Inter', sans-serif;
              }
              .preview-container {
                max-width: 900px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
              }
              .preview-header {
                background: #22113E;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .preview-content {
                padding: 0;
              }
              /* Sobrescrever para preview paginado */
              .print-container {
                width: auto !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box;
                background: none;
              }
            </style>
            <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
          </head>
          <body>
            <div class="preview-container">
              <div class="preview-header">
                <h1>Print Preview - Paged.js</h1>
                <p>This is a real paginated preview using Paged.js</p>
              </div>
              <div id="paged-preview" class="preview-content"></div>
            </div>
            <script>
              window.htmlContent = decodeURIComponent(window.location.hash.slice(1));
              var container = document.getElementById('paged-preview');
              container.innerHTML = window.htmlContent;
              if (window.Paged) {
                new window.Paged.Previewer().preview(container);
              }
            </script>
          </body>
        </html>
      `);
      previewWindow.location.hash = '#' + encodeURIComponent(safeHtmlContent);
      previewWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-purple via-purple-900 to-deep-purple">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-space font-light text-5xl md:text-6xl text-white uppercase tracking-wider mb-4">
            Print Version
          </h1>
          <p className="font-inter font-light text-xl text-gray-300 max-w-2xl mx-auto">
            Generate a professional A5 PDF for physical printing.
            Perfect for distribution, exhibitions, or archival purposes.
          </p>
        </motion.div>

        {/* Print Options */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-space font-medium text-2xl text-white mb-6">Print Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Format</label>
              <select
                value={printOptions.format}
                onChange={(e) => setPrintOptions({ ...printOptions, format: e.target.value as 'A5' | 'A4' })}
                className="w-full bg-white/20 border border-gray-300/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-pink"
              >
                <option value="A5">A5 (148×210mm)</option>
                <option value="A4">A4 (210×297mm)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Orientation</label>
              <select
                value={printOptions.orientation}
                onChange={(e) => setPrintOptions({ ...printOptions, orientation: e.target.value as 'portrait' | 'landscape' })}
                className="w-full bg-white/20 border border-gray-300/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-pink"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Margin</label>
              <select
                value={printOptions.margin}
                onChange={(e) => setPrintOptions({ ...printOptions, margin: e.target.value })}
                className="w-full bg-white/20 border border-gray-300/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-pink"
              >
                <option value="10mm">10mm</option>
                <option value="15mm">15mm</option>
                <option value="20mm">20mm</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Bleed</label>
              <select
                value={printOptions.bleed}
                onChange={(e) => setPrintOptions({ ...printOptions, bleed: e.target.value })}
                className="w-full bg-white/20 border border-gray-300/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-pink"
              >
                <option value="0mm">0mm</option>
                <option value="3mm">3mm</option>
                <option value="5mm">5mm</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            onClick={handleDownloadHTML}
            disabled={isLoading}
            className="flex items-center space-x-3 bg-accent-pink text-white px-8 py-4 rounded-full font-space font-medium text-lg hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={24} />
            <span>{isLoading ? 'Generating...' : 'Download HTML'}</span>
          </motion.button>

          <motion.button
            onClick={handlePrint}
            disabled={isLoading}
            className="flex items-center space-x-3 bg-white text-deep-purple px-8 py-4 rounded-full font-space font-medium text-lg hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Printer size={24} />
            <span>{isLoading ? 'Preparing...' : 'Print Now'}</span>
          </motion.button>
        </motion.div>

        {/* Print Features */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-accent-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-accent-turquoise" />
            </div>
            <h3 className="font-space font-medium text-xl text-white mb-2">Professional Layout</h3>
            <p className="font-inter font-light text-gray-300">
              A5 format optimized for physical printing with proper margins, typography, and page breaks.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-accent-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download size={32} className="text-accent-pink" />
            </div>
            <h3 className="font-space font-medium text-xl text-white mb-2">High Quality PDF</h3>
            <p className="font-inter font-light text-gray-300">
              Vector-based PDF generation with crisp text and graphics suitable for professional printing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Printer size={32} className="text-white" />
            </div>
            <h3 className="font-space font-medium text-xl text-white mb-2">Print Ready</h3>
            <p className="font-inter font-light text-gray-300">
              Includes crop marks, proper color management, and print-optimized layout for any printer.
            </p>
          </div>
        </motion.div>

        {/* Back to Main */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => window.history.back()}
            className="font-inter font-light text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Main Publication
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrintLayout;
