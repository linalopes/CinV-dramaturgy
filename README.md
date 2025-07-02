# Synthetic Creativity | Criatividade Sintética

A Dramaturgy *in vitro* | Uma Dramaturgia *in vitro*

## About | Sobre

**Synthetic Creativity** is an experimental bilingual publication that explores the boundaries between artificial intelligence and human creativity through dramatic writing. This project emerges from a collaborative process between human co-authorship and AI co-authorship, creating an emergent creative process that investigates the nature of creation in the 21st century.

**Criatividade Sintética** é uma publicação experimental bilíngue que explora os limites entre inteligência artificial e criatividade humana através da escrita dramática. Este projeto emerge de um processo colaborativo entre coautoria humana e coautoria de IA, criando um processo criativo emergente que investiga a natureza da criação no século XXI.

## Features | Características

- **Bilingual Interface**: Complete English/Portuguese experience with side-by-side layout
- **Dynamic Navigation**: Auto-generated sections from markdown content with smooth transitions
- **Experimental Design**: Modern UI with synthetic aesthetics and custom color palette
- **Responsive Layout**: Optimized for all devices with adaptive grid system
- **Emergent Process**: AI-Human collaborative creation with character-driven narratives
- **Advanced Content Processing**: Custom markdown parser with structured data extraction

## Technology Stack | Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Content Processing**: Gray-matter + React Markdown + Custom parser
- **Icons**: Lucide React
- **Development**: ESLint + TypeScript ESLint

## Project Structure | Estrutura do Projeto

```
src/
├── components/
│   ├── BilingualPage.tsx    # Bilingual content pages with dynamic layout
│   ├── Cover.tsx            # Landing page with experimental design
│   ├── Credits.tsx          # Collaborative credits component
│   ├── TableOfContents.tsx  # Dynamic navigation index
│   └── VisualElements.tsx   # UI components and visual effects
├── content/
│   ├── en.md               # English markdown content
│   └── pt-br.md            # Portuguese markdown content
├── utils/
│   └── markdownParser.ts   # Custom parser for dramatic content
├── App.tsx                 # Main application with navigation logic
└── main.tsx               # Entry point
```

## Design System | Sistema de Design

### Colors | Cores
- **Deep Purple**: `#22113E` - Primary brand color
- **Gray Green**: `#CAD8D8` - Neutral accent
- **Accent Pink**: `#EA7DFF` - Portuguese content identifier
- **Accent Turquoise**: `#08F2DB` - English content identifier

### Typography | Tipografia
- **Space Grotesk**: Headers and titles
- **Inter**: Body text and content
- **Courier Prime**: Code elements and technical content

### Animations | Animações
- **Glitch Effect**: 2s infinite cycle for experimental elements
- **Float Animation**: 6s ease-in-out for visual elements
- **Pulse Slow**: 4s cubic-bezier for emphasis

## Content Architecture | Arquitetura de Conteúdo

### Markdown Structure | Estrutura Markdown
- **Frontmatter Support**: YAML-like metadata in HTML comments
- **Character Extraction**: Automatic parsing of dramatic characters
- **Section Splitting**: Dynamic content organization by prompts
- **Bilingual Synchronization**: Parallel content structure

### Data Models | Modelos de Dados
```typescript
interface PromptSection {
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

interface PromptBlock {
  type: 'rubric' | 'speech';
  speaker?: string;
  text: string;
}
```

## Installation | Instalação

```bash
# Clone the repository
git clone https://github.com/linalopes/CinV-dramaturgy.git

# Navigate to project directory
cd CinV-dramaturgy

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development | Desenvolvimento

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code with ESLint
npm run lint
```

## Content Management | Gestão de Conteúdo

### Adding New Content | Adicionando Novo Conteúdo
1. Edit `src/content/pt-br.md` for Portuguese content
2. Edit `src/content/en.md` for English content
3. Follow the prompt structure: `## Prompt X - Title`
4. Use frontmatter for metadata: `<!-- titleEn: "English Title" -->`

### Character Management | Gestão de Personagens
- Characters are automatically extracted from markdown
- Format: `**CharacterName**: Description`
- Displayed in alphabetical order on Prompt Zero

## Performance Features | Recursos de Performance

- **Dynamic Imports**: Content loaded on-demand
- **Optimized Animations**: Hardware-accelerated transitions
- **Responsive Images**: Optimized for different screen sizes
- **Code Splitting**: Automatic bundle optimization with Vite

## Browser Support | Suporte de Navegadores

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Laboratory of Synthetic Creativity | Laboratório de Criatividade Sintética

This project is part of an ongoing investigation into the collaborative potential between human and artificial intelligence in creative processes. Each prompt and dialogue represents an exploration of the synthetic-organic boundary, creating a poetic investigation into contemporary creation.

Este projeto faz parte de uma investigação contínua sobre o potencial colaborativo entre inteligência humana e artificial em processos criativos. Cada prompt e diálogo representa uma exploração da fronteira sintético-orgânica, criando uma investigação poética sobre a criação contemporânea.

## Future Enhancements | Melhorias Futuras

- **Paged.js Integration**: Advanced print layout and PDF generation
- **Audio Integration**: Sound design for dramatic content
- **Interactive Elements**: Enhanced user engagement features
- **Accessibility**: WCAG 2.1 AA compliance
- **Internationalization**: Multi-language support framework

## License | Licença

2024 • Laboratory of Creativity *in vitro*

---

*An experimental publication exploring the emergent process of AI-human collaboration in dramatic writing.*
*Uma publicação experimental explorando o processo emergente de colaboração IA-humano na escrita dramática.*
