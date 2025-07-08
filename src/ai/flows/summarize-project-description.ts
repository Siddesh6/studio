// Summarize project description using AI to generate concise, engaging snippets.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The full description of the project to be summarized.'),
});
export type SummarizeProjectDescriptionInput = z.infer<
  typeof SummarizeProjectDescriptionInputSchema
>;

const SummarizeProjectDescriptionOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise and engaging summary of the project description.'),
  progress: z
    .string()
    .describe('A short, one-sentence summary of what has been generated.'),
});
export type SummarizeProjectDescriptionOutput = z.infer<
  typeof SummarizeProjectDescriptionOutputSchema
>;

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  return summarizeProjectDescriptionFlow(input);
}

const summarizeProjectDescriptionPrompt = ai.definePrompt({
  name: 'summarizeProjectDescriptionPrompt',
  input: {schema: SummarizeProjectDescriptionInputSchema},
  output: {schema: SummarizeProjectDescriptionOutputSchema},
  prompt: `Summarize the following project description into a concise and engaging snippet:

  {{{projectDescription}}}
  \nInclude a one sentence summary of what you have generated to the 'progress' field in the output.\n`,
});

const summarizeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDescriptionFlow',
    inputSchema: SummarizeProjectDescriptionInputSchema,
    outputSchema: SummarizeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await summarizeProjectDescriptionPrompt(input);
    return output!;
  }
);
