import { ExcalidrawConverter } from '@/components/excalidraw-converter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Excalidraw Table Converter
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Instantly turn your Markdown or HTML tables into Excalidraw diagrams.
          You can also generate or improve tables with the power of AI.
        </p>
      </div>
      <ExcalidrawConverter />
    </main>
  );
}
