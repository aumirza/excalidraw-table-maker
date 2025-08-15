"use client";

// Basic parser for markdown table
export function parseMarkdownTable(markdown: string): string[][] {
  if (!markdown.trim()) return [];
  const lines = markdown.trim().split('\n').map(line => line.trim()).filter(line => line.includes('|'));
  if (lines.length < 2) return [];

  // Remove separator line
  const contentLines = lines.filter(line => !/^[| -]+$/.test(line.replace(/:/g, '')));

  return contentLines.map(line =>
    line
      .split('|')
      .map(cell => cell.trim())
      .slice(1, -1)
  );
}

// Basic parser for HTML table
export function parseHtmlTable(html: string): string[][] {
  if (typeof window === 'undefined') return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    if (!table) return [];

    const rows = Array.from(table.querySelectorAll('tr'));
    return rows.map(row =>
      Array.from(row.querySelectorAll('th, td')).map(cell => cell.innerText.trim())
    );
  } catch (e) {
    console.error("HTML parsing error:", e);
    return [];
  }
}

const CELL_WIDTH = 200;
const CELL_HEIGHT = 60;
const PADDING = 10;
const STROKE_COLOR = '#1e1e1e';
const DARK_MODE_STROKE_COLOR = '#e2e8f0'; // slate-200
const FONT_FAMILY = 1; // 1 for "Hand-drawn" style in Excalidraw
const FONT_SIZE = 20;

const randomId = () => Math.random().toString(36).substring(2, 11);

export function convertToExcalidraw(data: string[][]): {
  type: string;
  version: number;
  source: string;
  elements: any[];
  appState: any;
} {
  if (!data || data.length === 0) return { type: "excalidraw", version: 2, source: "excalidraw-converter", elements: [], appState: {} };

  const elements: any[] = [];
  const columnCount = Math.max(...data.map(row => row.length));
  const columnWidths: number[] = new Array(columnCount).fill(CELL_WIDTH);

  data.forEach(row => {
    row.forEach((cellContent, colIndex) => {
      const textWidth = cellContent.length * (FONT_SIZE * 0.6) + PADDING * 2;
      if (textWidth > columnWidths[colIndex]) {
        columnWidths[colIndex] = textWidth;
      }
    });
  });
  
  let y = 0;
  data.forEach((row) => {
    let x = 0;
    const rowHeights = new Array(columnCount).fill(CELL_HEIGHT);

    row.forEach((cellContent, colIndex) => {
      const lines = cellContent.split('\n');
      const textHeight = lines.length * FONT_SIZE * 1.2;
      if (textHeight > rowHeights[colIndex]) {
        rowHeights[colIndex] = textHeight + PADDING * 2;
      }
    });

    const maxRowHeight = Math.max(...rowHeights);

    row.forEach((cellContent, colIndex) => {
      const cellWidth = columnWidths[colIndex];
      const rectangleId = randomId();
      const textId = randomId();

      const rectangleElement = {
        id: rectangleId,
        type: 'rectangle',
        x,
        y,
        width: cellWidth,
        height: maxRowHeight,
        angle: 0,
        strokeColor: STROKE_COLOR,
        backgroundColor: 'transparent',
        fillStyle: 'hachure',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        seed: Math.floor(Math.random() * 100000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        boundElements: [{ type: 'text', id: textId }],
        updated: Date.now(),
        link: null,
        locked: false,
      };

      const textElement = {
        id: textId,
        type: 'text',
        x: x + PADDING / 2,
        y: y + (maxRowHeight / 2) - (cellContent.split('\n').length * FONT_SIZE / 2),
        width: cellWidth - PADDING,
        height: maxRowHeight - PADDING,
        angle: 0,
        strokeColor: STROKE_COLOR,
        backgroundColor: 'transparent',
        fillStyle: 'hachure',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        seed: Math.floor(Math.random() * 100000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        text: cellContent,
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
        textAlign: 'center',
        verticalAlign: 'middle',
        containerId: rectangleId,
        originalText: cellContent,
      };

      elements.push(rectangleElement, textElement);
      x += cellWidth;
    });

    y += maxRowHeight;
  });

  return { 
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements,
    appState: {
      gridSize: null,
      viewBackgroundColor: "#F9FAFB",
      theme: "light",
    }
  };
}
