'use server';
/**
 * @fileOverview AI agent that generates a Markdown table from a text description.
 *
 * - generateTableFromDescription - A function that generates a Markdown table from a text description.
 * - GenerateTableFromDescriptionInput - The input type for the generateTableFromDescription function.
 * - GenerateTableFromDescriptionOutput - The return type for the generateTableFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTableFromDescriptionInputSchema = z.object({
  description: z.string().describe('A description of the table to generate.'),
});
export type GenerateTableFromDescriptionInput = z.infer<typeof GenerateTableFromDescriptionInputSchema>;

const GenerateTableFromDescriptionOutputSchema = z.object({
  markdownTable: z.string().describe('The generated Markdown table.'),
});
export type GenerateTableFromDescriptionOutput = z.infer<typeof GenerateTableFromDescriptionOutputSchema>;

export async function generateTableFromDescription(
  input: GenerateTableFromDescriptionInput
): Promise<GenerateTableFromDescriptionOutput> {
  return generateTableFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTableFromDescriptionPrompt',
  input: {schema: GenerateTableFromDescriptionInputSchema},
  output: {schema: GenerateTableFromDescriptionOutputSchema},
  prompt: `You are a tool that generates Markdown tables based on a description.

  Description: {{{description}}}

  Output the markdown table. Do not include any other text.`,
});

const generateTableFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateTableFromDescriptionFlow',
    inputSchema: GenerateTableFromDescriptionInputSchema,
    outputSchema: GenerateTableFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
