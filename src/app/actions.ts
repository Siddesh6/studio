'use server';

import { summarizeProjectDescription } from '@/ai/flows/summarize-project-description';
import { z } from 'zod';

const SummarizeSchema = z.object({
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
});

export async function handleSummarize(prevState: any, formData: FormData) {
  const validatedFields = SummarizeSchema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input. ' + validatedFields.error.flatten().fieldErrors.description?.[0] ?? '',
      summary: '',
      progress: '',
    };
  }
  
  try {
    const result = await summarizeProjectDescription({ projectDescription: validatedFields.data.description });
    return {
      message: 'Success',
      summary: result.summary,
      progress: result.progress,
    };
  } catch (error) {
    console.error('AI summarization failed:', error);
    return {
      message: 'An error occurred while summarizing. Please try again.',
      summary: '',
      progress: '',
    };
  }
}
