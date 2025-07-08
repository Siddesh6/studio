"use client";

import { useFormStatus } from 'react-dom';
import { handleSummarize } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Summarize with AI
    </Button>
  );
}

export default function AISummarizer() {
  const initialState = { message: '', summary: '', progress: '' };
  const [state, formAction] = useActionState(handleSummarize, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.progress) {
      toast({
        title: "AI Progress",
        description: state.progress,
      })
    }
  }, [state, toast]);

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Try the AI Content Summarizer</CardTitle>
        <CardDescription>
          Paste a project description below to see how AI can generate a concise and engaging summary.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Textarea
            name="description"
            placeholder="Describe your project in detail here..."
            rows={6}
            required
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          {state.summary && (
            <div className="w-full p-4 bg-secondary rounded-lg border">
              <h4 className="font-bold mb-2">Generated Summary:</h4>
              <p className="text-muted-foreground">{state.summary}</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
