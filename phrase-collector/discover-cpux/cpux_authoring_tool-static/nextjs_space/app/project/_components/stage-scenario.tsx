'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Sparkles, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { EXAMPLE_SCENARIOS } from '@/lib/example-scenarios';
import { callLLM } from '@/lib/llm-client';
import type { Phrase } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  scenario: string;
  onScenarioChange: (s: string) => void;
  onPhrasesDiscovered: (phrases: Phrase[]) => void;
}

const SYSTEM_PROMPT = `You are a CPUX (Common Path of Understanding and Execution) architecture expert. Analyze application scenarios and extract Intention Space phrases.

For each phrase you discover, categorize it as one of:
- Pulse: User-triggered perception with trivalence (Y/N/UN). Inputs, actions, triggers.
- DN: Design Node - stateless computational unit that absorbs and emits signals.
- I: Intention - named communication channel between components.
- O: Object - reflector that carries signals without modifying them.

Please respond in JSON format with the following structure:
{
  "phrases": [
    {
      "id": "unique_id",
      "phrase": "semantic_phrase_name",
      "category": "Pulse|DN|I|O",
      "trivalence": "Y|N|UN",
      "description": "what this phrase represents in the application"
    }
  ],
  "summary": "Brief analysis of the scenario from CPUX perspective",
  "suggested_containers": [
    {
      "name": "Container name",
      "description": "What this IC handles",
      "phrases": ["phrase1", "phrase2"]
    }
  ]
}
Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

export default function ScenarioStage({ scenario, onScenarioChange, onPhrasesDiscovered }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState('');

  const analyzeScenario = async () => {
    if (!scenario?.trim()) {
      toast.error('Please enter a scenario first');
      return;
    }
    setAnalyzing(true);
    setProgress('Starting analysis...');
    setError('');
    setAnalysisResult(null);

    await callLLM({
      systemPrompt: SYSTEM_PROMPT,
      userMessage: `Analyze this application scenario and extract all Intention Space phrases. Respond in JSON format as specified.\n\n${scenario}`,
      onProgress: (msg) => setProgress(msg),
      onComplete: (result) => {
        setAnalysisResult(result);
        const rawPhrases = result?.phrases ?? [];
        const mapped: Phrase[] = rawPhrases.map((p: any, i: number) => ({
          id: p?.id ?? `p-${i}`,
          phrase: p?.phrase ?? '',
          category: (['Pulse', 'DN', 'I', 'O'].includes(p?.category) ? p.category : 'Pulse') as Phrase['category'],
          trivalence: (['Y', 'N', 'UN'].includes(p?.trivalence) ? p.trivalence : 'UN') as Phrase['trivalence'],
          description: p?.description ?? '',
        }));
        if (mapped.length > 0) toast.success(`Discovered ${mapped.length} phrases!`);
        setAnalysisResult({ ...result, mappedPhrases: mapped });
        setAnalyzing(false);
        setProgress('');
      },
      onError: (msg) => {
        setError(msg);
        setAnalyzing(false);
        setProgress('');
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight mb-1">Stage 1: Scenario Input</h2>
        <p className="text-muted-foreground">Describe your application scenario. The LLM will extract Intention Space phrases from it.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Example Scenarios
          </CardTitle>
          <CardDescription>Load a pre-built scenario to explore the workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EXAMPLE_SCENARIOS.map((ex) => (
              <button
                key={ex.id}
                onClick={() => { onScenarioChange(ex.scenario); setAnalysisResult(null); }}
                className="text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
              >
                <p className="font-medium text-sm">{ex.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ex.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Application Scenario</CardTitle>
          <CardDescription>Describe how users interact with your application, step by step</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={scenario}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onScenarioChange(e.target.value)}
            placeholder="A user opens the application and sees a login form. They enter their username and password..."
            className="min-h-[160px] text-sm"
          />
          <Button onClick={analyzeScenario} disabled={analyzing || !scenario?.trim()}>
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {analyzing ? progress || 'Analyzing...' : 'Analyze Scenario'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Analysis Results
              </CardTitle>
              {analysisResult?.summary && <CardDescription>{analysisResult.summary}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
              {(analysisResult?.phrases ?? []).length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Discovered Phrases ({(analysisResult?.phrases ?? []).length})</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(analysisResult?.phrases ?? []).map((p: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-mono font-medium ${
                          p?.category === 'Pulse' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          p?.category === 'DN' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          p?.category === 'I' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                          'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }`}>{p?.category ?? '?'}</span>
                        <span className="font-mono">{p?.phrase ?? ''}</span>
                        <span className="text-muted-foreground text-xs ml-auto">[{p?.trivalence ?? '?'}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(analysisResult?.suggested_containers ?? []).length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Suggested Intention Containers</p>
                  <div className="space-y-2">
                    {(analysisResult?.suggested_containers ?? []).map((c: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                        <p className="font-medium text-sm">{c?.name ?? ''}</p>
                        <p className="text-xs text-muted-foreground">{c?.description ?? ''}</p>
                        {(c?.phrases ?? []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(c?.phrases ?? []).map((ph: string, j: number) => (
                              <span key={j} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">{ph}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={() => onPhrasesDiscovered(analysisResult?.mappedPhrases ?? [])}
                disabled={(analysisResult?.mappedPhrases ?? []).length === 0}
              >
                Proceed to Phrase Discovery with {(analysisResult?.mappedPhrases ?? []).length} phrases
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
