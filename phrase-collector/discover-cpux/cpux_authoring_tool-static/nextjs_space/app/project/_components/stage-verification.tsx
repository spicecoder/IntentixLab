'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Loader2, Info, Sparkles } from 'lucide-react';
import { VERIFICATION_RULES } from '@/lib/example-scenarios';
import { callLLM } from '@/lib/llm-client';
import type { Phrase, CpuxDesign, VerificationData, VerificationResult } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  cpuxDesign: CpuxDesign;
  phrases: Phrase[];
  verification: VerificationData;
  onVerificationChange: (v: VerificationData) => void;
  onProceed: () => void;
}

const VERIFY_SYSTEM_PROMPT = `You are a CPUX architecture verifier. Validate a CPUX design against architectural invariants.

Verification Rules:
1. DN Statelessness: Design Nodes must be stateless blackboxes
2. O_holder Accumulation Only: O_holders only accumulate, no computation
3. O_reflector Reflect-Only: O_reflectors reflect DN output, no modification
4. UI as Mirror: UI components are Objects, no hidden computation
5. Unique Trigger Signals: Each CPUX trigger is unique in Intention Space
6. IC Structural Integrity: Each IC has O_holder-DN-S1-O_reflector-S2
7. Signal Semantic Identity: Signals pair Intention + Pulses
8. CPUX Sequence: First IC null DN trigger, last IC releases to Field

Please respond in JSON format with the following structure:
{
  "results": [
    {
      "rule": "Rule name",
      "passed": true/false,
      "message": "Explanation",
      "severity": "error|warning|info",
      "suggestions": ["Fix suggestion if failed"]
    }
  ],
  "overallScore": 0-100,
  "summary": "Overall assessment"
}
Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

export default function VerificationStage({ cpuxDesign, phrases, verification, onVerificationChange, onProceed }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [progress, setProgress] = useState('');

  const runVerification = async () => {
    setVerifying(true);
    setProgress('Running verification...');
    await callLLM({
      systemPrompt: VERIFY_SYSTEM_PROMPT,
      userMessage: `Verify this CPUX design. Respond in JSON format as specified.\n\nDesign:\n${JSON.stringify(cpuxDesign, null, 2)}\n\nPhrases:\n${JSON.stringify(phrases, null, 2)}`,
      onProgress: (msg) => setProgress(msg),
      onComplete: (result) => {
        onVerificationChange({
          results: (result?.results ?? []).map((r: any) => ({
            rule: r?.rule ?? 'Unknown', passed: r?.passed ?? false,
            message: r?.message ?? '', severity: r?.severity ?? (r?.passed ? 'info' : 'error'),
            suggestions: r?.suggestions ?? [],
          })),
          overallScore: result?.overallScore,
          summary: result?.summary,
        });
        toast.success('Verification complete!');
        setVerifying(false); setProgress('');
      },
      onError: (msg) => { toast.error(msg); setVerifying(false); setProgress(''); },
    });
  };

  const results = verification?.results ?? [];
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const score = verification?.overallScore ?? (results.length > 0 ? Math.round((passed / results.length) * 100) : 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight mb-1">Stage 4: Verification</h2>
        <p className="text-muted-foreground">Validate the CPUX design against architectural invariants and best practices.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Architectural Invariants</CardTitle>
          <CardDescription>The verification checks these rules from Intention Space architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {VERIFICATION_RULES.map((rule) => (
              <div key={rule.id} className="p-2 rounded-md bg-muted/30 text-sm">
                <p className="font-medium">{rule.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={runVerification} disabled={verifying || (cpuxDesign?.containers ?? []).length === 0}>
        {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {verifying ? progress || 'Verifying...' : 'Run Verification'}
      </Button>

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <Card className={score >= 80 ? 'border-green-500/30' : score >= 50 ? 'border-amber-500/30' : 'border-destructive/30'}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className={`text-4xl font-display font-bold ${score >= 80 ? 'text-green-600 dark:text-green-400' : score >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'}`}>{score}%</div>
                <div>
                  <p className="font-semibold">{passed} passed, {failed} failed</p>
                  {verification?.summary && <p className="text-sm text-muted-foreground mt-1">{verification.summary}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`transition-colors ${r.passed ? 'border-green-500/20' : r.severity === 'warning' ? 'border-amber-500/20' : 'border-destructive/20'}`}>
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      {r.passed ? <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" /> : r.severity === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{r.rule}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{r.message}</p>
                        {(r.suggestions ?? []).length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground">Suggestions:</p>
                            <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                              {r.suggestions!.map((s, j) => <li key={j}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {results.length > 0 && (
        <div className="flex justify-end"><Button onClick={onProceed}>Proceed to Export <ArrowRight className="w-4 h-4" /></Button></div>
      )}
    </div>
  );
}
