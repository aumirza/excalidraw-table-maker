"use client";

import { useRef, useState } from "react";
import { Copy, Wand2, RefreshCw, Bot, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { convertToExcalidraw, parseHtmlTable, parseMarkdownTable, parseCsvTable } from "@/lib/table-utils";
import { generateTableFromDescription } from "@/ai/flows/generate-table-from-description";
import { suggestTableImprovements } from "@/ai/flows/suggest-table-improvements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";

export function ExcalidrawConverter() {
  const { toast } = useToast();
  const [inputTable, setInputTable] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("manual");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a .csv file.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setInputTable(text);
          toast({ title: "CSV file loaded successfully!" });
        }
      };
      reader.onerror = () => {
        toast({
            variant: "destructive",
            title: "File reading failed",
            description: "Could not read the selected file.",
        });
      }
      reader.readAsText(file);
    }
  };

  const handleCopy = async () => {
    if (!outputJson) {
      toast({
        variant: "destructive",
        title: "Nothing to copy",
        description: "Please generate the Excalidraw JSON first.",
      });
      return;
    }
    await navigator.clipboard.writeText(outputJson);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste it in Excalidraw.",
    });
  };

  const handleConvert = () => {
    if (!inputTable.trim()) {
      toast({ variant: "destructive", title: "Input is empty" });
      return;
    }
    
    setIsLoading(true);
    let parsedData = parseMarkdownTable(inputTable);
    if (parsedData.length === 0) {
      parsedData = parseHtmlTable(inputTable);
    }
    if (parsedData.length === 0) {
        parsedData = parseCsvTable(inputTable);
    }

    if (parsedData.length === 0) {
      toast({
        variant: "destructive",
        title: "Parsing failed",
        description: "Could not parse the input as Markdown, HTML, or CSV table.",
      });
      setIsLoading(false);
      return;
    }

    const excalidrawObject = convertToExcalidraw(parsedData);
    setOutputJson(JSON.stringify(excalidrawObject, null, 2));
    toast({ title: "Conversion successful!" });
    setIsLoading(false);
  };
  
  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({ variant: "destructive", title: "Description is empty" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await generateTableFromDescription({ description });
      setInputTable(result.markdownTable);
      toast({ title: "Table generated successfully!" });
      setActiveTab("manual");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "Something went wrong while generating the table.",
      });
    }
    setIsLoading(false);
  };

  const handleImprove = async () => {
    if (!inputTable.trim()) {
      toast({ variant: "destructive", title: "Table is empty" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await suggestTableImprovements({ table: inputTable });
      setInputTable(result.improvedTable);
      toast({
        title: "Table improved!",
        description: <p className="text-sm text-muted-foreground">{result.suggestions}</p>,
        duration: 9000
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Improvement Failed",
        description: "Something went wrong while improving the table.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto p-4 md:p-8">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Provide a table using one of the methods below.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
              <TabsTrigger value="ai-generate">Generate with AI</TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="flex-grow flex flex-col mt-4 space-y-4">
              <div className="flex-grow flex flex-col space-y-2">
                <Label htmlFor="input-table">Markdown, HTML or CSV Table</Label>
                <Textarea
                  id="input-table"
                  placeholder={`Header 1,Header 2\nCell 1,Cell 2`}
                  value={inputTable}
                  onChange={(e) => setInputTable(e.target.value)}
                  className="flex-grow font-code text-sm"
                  rows={10}
                />
                 <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  className="hidden"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleConvert} disabled={isLoading || !inputTable.trim()}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Convert to Excalidraw
                </Button>
                {/* <Button variant="secondary" onClick={handleImprove} disabled={isLoading || !inputTable.trim()}>
                  <Wand2 className="mr-2 h-4 w-4" /> Improve with AI
                </Button> */}
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                    <Upload className="mr-2 h-4 w-4" /> Upload CSV
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="ai-generate" className="flex-grow flex flex-col mt-4 space-y-4">
               <div className="flex-grow flex flex-col space-y-2">
                 <Label htmlFor="ai-description">Describe the table you want</Label>
                <Textarea
                  id="ai-description"
                  placeholder="A 3-column table with user names, email addresses, and signup dates for 5 users."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-grow"
                  rows={10}
                />
               </div>
              <Button onClick={handleGenerate} disabled={isLoading || !description.trim()}>
                <Bot className="mr-2 h-4 w-4" /> Generate Table
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Output</CardTitle>
              <CardDescription>Generated Excalidraw JSON. Copy and paste it.</CardDescription>
            </div>
            <Button size="icon" variant="ghost" onClick={handleCopy} disabled={isLoading || !outputJson}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy JSON</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col space-y-2">
          <Label htmlFor="output-json">Excalidraw JSON</Label>
          <Textarea
            id="output-json"
            readOnly
            value={outputJson}
            placeholder="Your Excalidraw JSON will appear here..."
            className="flex-grow font-code text-sm bg-secondary"
            rows={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
