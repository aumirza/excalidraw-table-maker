import { ExcalidrawConverter } from '@/components/excalidraw-converter';
import Image from 'next/image';
import tableMaker from '@/assets/excalidraw-table-maker.png';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Image
            src={tableMaker}
            alt="Excalidraw Table Maker Icon"
            width={60}
            height={60}
            className="mr-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Excalidraw Table Maker
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Instantly turn your Markdown, HTML, or CSV tables into Excalidraw diagrams.
          You can also generate or improve tables with the power of AI.
        </p>
      </div>
      <ExcalidrawConverter />
    </main>
  );
}
