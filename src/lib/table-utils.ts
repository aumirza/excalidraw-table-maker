"use client";

// Helper function to strip markdown formatting
function stripMarkdown(text: string): string {
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/__(.*?)__/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/_(.*?)_/g, '$1');
  return text;
}

// Parser for markdown table
export function parseMarkdownTable(markdownString: string): string[][] {
  if (!markdownString.trim()) return [];
  try {
    const lines = markdownString.split('\n').filter(line => line.includes('|'));
    const data: string[][] = [];
    lines.forEach(line => {
      if (line.includes('---')) return;
      const cells = line.split('|').map(cell => stripMarkdown(cell.trim()));
      if (cells[0] === '') cells.shift();
      if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
      if (cells.length > 0) data.push(cells);
    });
    return data;
  } catch(error) {
      console.error("Markdown parsing error:", error);
      return [];
  }
}

// Parser for HTML table
export function parseHtmlTable(htmlString: string): string[][] {
  if (typeof window === 'undefined') return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const table = doc.querySelector('table');
    if (!table) return [];
    
    const data: string[][] = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const rowData: string[] = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            rowData.push(stripMarkdown(cell.innerText.trim()));
        });
        data.push(rowData);
    });
    return data;
  } catch (error) {
    console.error("HTML parsing error:", error);
    return [];
  }
}

export function convertToExcalidraw(tableData: string[][]): {
  type: string;
  version: number;
  source: string;
  elements: any[];
  appState: any;
  files?: any;
} {
  if (!tableData || tableData.length === 0) return { type: "excalidraw", version: 2, source: "excalidraw-converter", elements: [], appState: {} };

  const elements: any[] = [];
  const startX = 100, startY = 100, padding = 20;
  const minCellWidth = 150, minCellHeight = 50;
  const charWidth = 10, lineHeight = 25;

  const colWidths: number[] = [];
  const rowHeights: number[] = [];

  tableData.forEach((row, rowIndex) => {
      let maxRowHeight = minCellHeight;
      row.forEach((cell, colIndex) => {
          const lines = cell.split('\n');
          const cellHeight = Math.max(minCellHeight, lines.length * lineHeight + padding);
          if (cellHeight > maxRowHeight) maxRowHeight = cellHeight;

          const cellWidth = Math.max(minCellWidth, Math.max(...lines.map(l => l.length)) * charWidth + padding);
          if (!colWidths[colIndex] || cellWidth > colWidths[colIndex]) {
              colWidths[colIndex] = cellWidth;
          }
      });
      rowHeights[rowIndex] = maxRowHeight;
  });
  
  let currentY = startY;
  tableData.forEach((row, rowIndex) => {
      let currentX = startX;
      const rowHeight = rowHeights[rowIndex];

      row.forEach((cell, colIndex) => {
          const colWidth = colWidths[colIndex];
          const isHeader = rowIndex === 0;
          const rectId = `rect_${rowIndex}_${colIndex}`;
          const textId = `text_${rowIndex}_${colIndex}`;

          elements.push({
              id: rectId, type: 'rectangle', x: currentX, y: currentY,
              width: colWidth, height: rowHeight, angle: 0,
              strokeColor: '#1e1e1e', backgroundColor: isHeader ? '#e9ecef' : '#ffffff',
              fillStyle: 'solid', strokeWidth: 2, strokeStyle: 'solid',
              roughness: 0, opacity: 100,
              seed: Math.floor(Math.random() * 100000),
              version: 1, versionNonce: Math.floor(Math.random() * 1000000000),
              isDeleted: false, boundElements: [{ type: 'text', id: textId }],
              updated: Date.now(), link: null, locked: false,
          });

          elements.push({
              id: textId, type: 'text', x: currentX + padding / 2,
              y: currentY + (rowHeight - (cell.split('\n').length * (lineHeight * 0.8))) / 2,
              width: colWidth - padding, height: rowHeight - padding,
              angle: 0, strokeColor: '#1e1e1e', backgroundColor: 'transparent',
              fillStyle: 'solid', strokeWidth: 2, strokeStyle: 'solid',
              roughness: 0, opacity: 100,
              seed: Math.floor(Math.random() * 100000),
              version: 1, versionNonce: Math.floor(Math.random() * 1000000000),
              isDeleted: false, boundElements: null,
              updated: Date.now(), link: null, locked: false,
              text: cell, fontSize: 20, fontFamily: 1, // 1 is "Hand-drawn"
              textAlign: 'center', verticalAlign: 'middle',
              containerId: rectId, originalText: cell,
          });

          currentX += colWidth;
      });
      currentY += rowHeight;
  });

  return {
      type: 'excalidraw', version: 2, source: 'https://excalidraw.com',
      elements, appState: { gridSize: null, viewBackgroundColor: '#ffffff' },
      files: {},
  };
}