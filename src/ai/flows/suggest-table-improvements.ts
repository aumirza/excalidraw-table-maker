'use server';

/**
 * @fileOverview An AI agent that suggests improvements to a Markdown table.
 *
 * - suggestTableImprovements - A function that suggests improvements to a Markdown table.
 * - SuggestTableImprovementsInput - The input type for the suggestTableImprovements function.
 * - SuggestTableImprovementsOutput - The return type for the suggestTableImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTableImprovementsInputSchema = z.object({
  table: z.string().describe('The Markdown table to improve.'),
});
export type SuggestTableImprovementsInput = z.infer<typeof SuggestTableImprovementsInputSchema>;

const SuggestTableImprovementsOutputSchema = z.object({
  improvedTable: z.string().describe('The improved Markdown table.'),
  suggestions: z.string().describe('Suggestions for improving the table.'),
});
export type SuggestTableImprovementsOutput = z.infer<typeof SuggestTableImprovementsOutputSchema>;

export async function suggestTableImprovements(input: SuggestTableImprovementsInput): Promise<SuggestTableImprovementsOutput> {
  return suggestTableImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTableImprovementsPrompt',
  input: {schema: SuggestTableImprovementsInputSchema},
  output: {schema: SuggestTableImprovementsOutputSchema},
  prompt: `You are an AI expert in improving Markdown tables.

You will be given a Markdown table, and you will suggest improvements to it.

Table:
{{{table}}}

Output the improved table and suggestions for improving the table.
`,
});

const suggestTableImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestTableImprovementsFlow',
    inputSchema: SuggestTableImprovementsInputSchema,
    outputSchema: SuggestTableImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
