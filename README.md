# Excalidraw Table Maker

A Next.js application that converts tables into Excalidraw JSON format with AI-powered assistance. Generate tables from text descriptions, improve existing tables, and seamlessly integrate them into your Excalidraw drawings.

![Excalidraw Table Maker](src/assets/excalidraw-table-maker.png)

## 🚀 Features

### Core Functionality

- **Multiple Input Formats**: Support for HTML, Markdown, and CSV table formats
- **AI Table Generation**: Create Markdown tables from natural language descriptions using Gemini AI
- **AI Table Enhancement**: Get intelligent suggestions to improve existing tables
- **Excalidraw Integration**: Convert parsed table data into Excalidraw JSON format
- **One-Click Copy**: Easy clipboard integration for seamless Excalidraw import
- **File Upload**: Direct CSV file upload and conversion
- **Real-time Feedback**: User-friendly toast notifications for all operations

### AI-Powered Features

- **Text-to-Table Generation**: Describe your table in plain English and get a formatted Markdown table
- **Intelligent Improvements**: AI-powered suggestions to enhance table structure and content
- **Powered by Google Gemini AI**: Leveraging Firebase Genkit for reliable AI integration

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components built with Radix UI primitives
- **AI Integration**: Firebase Genkit with Google Gemini AI
- **Package Manager**: pnpm
- **Development**: Hot reloading with Turbopack
- **Deployment**: Firebase App Hosting ready

## 📁 Project Structure

```
src/
├── ai/                          # AI integration layer
│   ├── flows/
│   │   ├── generate-table-from-description.ts    # Text → Table conversion
│   │   └── suggest-table-improvements.ts         # Table enhancement AI
│   ├── genkit.ts               # Genkit configuration
│   └── dev.ts                  # Development AI server
├── app/                        # Next.js App Router
│   ├── globals.css            # Global styles and CSS variables
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Main application page
├── components/                 # React components
│   ├── excalidraw-converter.tsx    # Main converter interface
│   └── ui/                    # Reusable UI component library
│       ├── button.tsx         # Button variants
│       ├── input.tsx          # Input components
│       ├── textarea.tsx       # Text areas
│       ├── toast.tsx          # Toast notifications
│       └── ...               # Additional UI components
├── hooks/                     # Custom React hooks
│   ├── use-toast.ts          # Toast notification management
│   └── use-mobile.tsx        # Mobile responsive utilities
├── lib/                       # Utility functions
│   ├── table-utils.ts        # Table parsing and Excalidraw conversion
│   └── utils.ts              # General utilities and helpers
└── assets/                    # Static assets
    └── excalidraw-table-maker.png
```

## 🎨 Design System

### Color Palette

- **Primary**: Indigo (#4F46E5) - Professional and trustworthy
- **Background**: Very light gray (#F9FAFB) - Clean and minimal
- **Accent**: Sky blue (#7DD3FC) - Subtle highlights
- **Text**: Balanced grays for optimal readability

### Typography

- **Font Family**: Inter - Modern, objective sans-serif
- **Icons**: Lucide React - Consistent, geometric icon set

### Layout Philosophy

- **Two-Column Design**: Clear separation between input and output
- **Mobile-First**: Responsive design that works on all devices
- **Micro-Interactions**: Subtle animations for better UX

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **pnpm**: Package manager
- **Firebase Project**: With AI/Genkit features enabled

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/aumirza/excalidraw-table-maker.git
cd excalidraw-table-maker
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Set up environment variables**:

```bash
# Copy environment template
cp .env.example .env.local

# Add your configuration
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

4. **Start development servers**:

```bash
# Start Next.js development server
pnpm dev

# In another terminal, start Genkit AI server
pnpm genkit:dev
```

5. **Open your browser**:
   Visit [http://localhost:9002](http://localhost:9002)

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📖 Usage Guide

### Converting Existing Tables

1. **Input Your Table**:

   - Paste HTML table markup
   - Add Markdown table syntax
   - Upload CSV file
   - Or paste CSV data directly

2. **Convert to Excalidraw**:

   - Click the "Convert to Excalidraw" button
   - The tool parses your input and generates Excalidraw JSON

3. **Copy and Import**:
   - Use the copy button to save JSON to clipboard
   - Open Excalidraw and paste (Ctrl+V / Cmd+V)
   - Your table appears as editable Excalidraw elements

### AI-Powered Table Generation

1. **Describe Your Table**:

   - Write a natural language description
   - Example: "Create a table showing quarterly sales data with columns for quarter, revenue, and growth percentage"

2. **Generate with AI**:

   - Click "Generate with AI"
   - The system creates a properly formatted Markdown table

3. **Improve Existing Tables**:
   - Paste an existing table
   - Click "Improve with AI" for enhancement suggestions

## 🤖 AI Features

### Table Generation Flow

```typescript
// Example: Generate from description
const description = "Monthly budget breakdown with categories and amounts";
const result = await generateTableFromDescription(description);
```

### Table Improvement Flow

```typescript
// Example: Improve existing table
const existingTable = "| Item | Price |\n|------|-------|\n| Apple | $1 |";
const improvements = await suggestTableImprovements(existingTable);
```

## 🔧 Development Scripts

```bash
# Development with Turbopack (faster)
pnpm dev

# AI development server with hot reload
pnpm genkit:watch

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Production build
pnpm build
```

## 🌐 Deployment

### Firebase App Hosting

This project is configured for Firebase App Hosting deployment:

```bash
# Deploy to Firebase
firebase deploy
```

The `apphosting.yaml` configuration handles:

- Build process with Next.js
- Environment variable management
- Static asset optimization

### Other Platforms

The application can also be deployed to:

- **Vercel**: Native Next.js support
- **Netlify**: Static site generation
- **Railway**: Container deployment

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with a clear description

### Development Guidelines

- Follow TypeScript best practices
- Use the existing UI component library
- Maintain responsive design principles
- Add JSDoc comments for complex functions
- Test AI features thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/aumirza/excalidraw-table-maker/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/aumirza/excalidraw-table-maker/discussions)
- **Documentation**: Check the inline code documentation for API details

## 🙏 Acknowledgments

- **Excalidraw Team**: For the amazing diagramming tool
- **Firebase Team**: For Genkit AI integration
- **Radix UI**: For accessible component primitives
- **Next.js Team**: For the excellent React framework

---

**Made with ❤️ by Ahmadullah Mirza for the Excalidraw community**
