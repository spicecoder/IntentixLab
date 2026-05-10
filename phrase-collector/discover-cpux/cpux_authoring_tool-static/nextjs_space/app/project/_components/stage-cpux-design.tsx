'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronUp, ChevronDown, ArrowRight, Sparkles, Loader2, Box, Zap, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { callLLM } from '@/lib/llm-client';
import type { Phrase, CpuxDesign, IntentionContainer } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  phrases: Phrase[];
  scenario: string;
  cpuxDesign: CpuxDesign;
  onDesignChange: (d: CpuxDesign) => void;
  onProceed: () => void;
}

const GENERATE_SYSTEM_PROMPT = `You are a CPUX architecture expert. Given a set of categorized phrases and optionally pre-arranged Intention Containers, generate or refine a complete CPUX design.

CPUX Rules:
- A CPUX is a sequence of Intention Containers (ICs)
- Each IC has: O_holder (accumulator phrases), DN (processor - can be null for trigger), O_reflector (emitter phrases)
- First IC has null DN (trigger pattern)
- Each IC has a trigger signal and release signal
- DNs are stateless blackboxes
- Objects (O_holder, O_reflector) reflect only, no computation
- Each trigger signal is unique in Intention Space

Please respond in JSON format with the following structure:
{
  "containers": [
    {
      "id": "ic_n",
      "name": "descriptive name",
      "oHolder": ["phrase1", "phrase2"],
      "dn": "dn_phrase or null",
      "dnDescription": "what this DN computes",
      "oReflector": ["phrase3"],
      "triggerSignal": "signal_name",
      "releaseSignal": "signal_name"
    }
  ],
  "releaseSignals": ["signal1"],
  "triggerSignal": "main_trigger",
  "fieldDescription": "What the CPUX Field accumulates",
  "explanation": "Brief explanation of the design decisions"
}
Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

export default function CpuxDesignStage({ phrases, scenario, cpuxDesign, onDesignChange, onProceed }: Props) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const containers = cpuxDesign?.containers ?? [];

  const addContainer = () => {
    onDesignChange({
      ...cpuxDesign,
      containers: [...containers, {
        id: `ic-${Date.now()}`, name: 'New Intention Container',
        oHolder: [], dn: null, dnDescription: '', oReflector: [],
        triggerSignal: '', releaseSignal: '',
      }],
    });
  };

  const updateContainer = (id: string, updates: Partial<IntentionContainer>) => {
    onDesignChange({ ...cpuxDesign, containers: containers.map((c) => c.id === id ? { ...c, ...updates } : c) });
  };

  const removeContainer = (id: string) => {
    onDesignChange({ ...cpuxDesign, containers: containers.filter((c) => c.id !== id) });
  };

  const moveContainer = (index: number, direction: 'up' | 'down') => {
    const arr = [...containers];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    onDesignChange({ ...cpuxDesign, containers: arr });
  };

  const togglePhrase = (containerId: string, phraseStr: string, slot: 'oHolder' | 'oReflector') => {
    const c = containers.find((c) => c.id === containerId);
    if (!c) return;
    const current = c[slot] ?? [];
    updateContainer(containerId, { [slot]: current.includes(phraseStr) ? current.filter((p) => p !== phraseStr) : [...current, phraseStr] });
  };

  const generateCPUX = async () => {
    setGenerating(true);
    setProgress('Generating...');
    await callLLM({
      systemPrompt: GENERATE_SYSTEM_PROMPT,
      userMessage: `Scenario: ${scenario}\n\nPhrases:\n${JSON.stringify(phrases, null, 2)}\n\n${containers.length > 0 ? `Existing containers to refine:\n${JSON.stringify(containers, null, 2)}` : 'Generate the IC sequence from scratch.'}\n\nRespond in JSON format as specified.`,
      onProgress: (msg) => setProgress(msg),
      onComplete: (result) => {
        onDesignChange({
          containers: (result?.containers ?? []).map((c: any, i: number) => ({
            id: c?.id ?? `ic-gen-${i}`, name: c?.name ?? `IC ${i + 1}`,
            oHolder: c?.oHolder ?? [], dn: c?.dn ?? null,
            dnDescription: c?.dnDescription ?? '', oReflector: c?.oReflector ?? [],
            triggerSignal: c?.triggerSignal ?? '', releaseSignal: c?.releaseSignal ?? '',
          })),
          releaseSignals: result?.releaseSignals ?? [],
          triggerSignal: result?.triggerSignal ?? '',
          fieldDescription: result?.fieldDescription,
          explanation: result?.explanation,
        });
        toast.success('CPUX design generated!');
        setGenerating(false); setProgress('');
      },
      onError: (msg) => { toast.error(msg); setGenerating(false); setProgress(''); },
    });
  };

  const phraseNames = phrases.map((p) => p.phrase);
  const dnPhrases = phrases.filter((p) => p.category === 'DN');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight mb-1">Stage 3: CPUX Synthesis</h2>
        <p className="text-muted-foreground">Group phrases into Intention Containers. Define the CPUX sequence and signals.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generateCPUX} disabled={generating || phrases.length === 0}>
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {generating ? progress || 'Generating...' : 'Generate CPUX Design'}
        </Button>
        <Button variant="secondary" onClick={addContainer}><Plus className="w-4 h-4" /> Add Container</Button>
      </div>

      {cpuxDesign?.triggerSignal && (
        <Card className="border-primary/30">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Trigger Signal</label>
                <div className="flex items-center gap-2 mt-1"><Zap className="w-4 h-4 text-amber-500" /><span className="font-mono text-sm">{cpuxDesign.triggerSignal}</span></div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Release Signals</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(cpuxDesign?.releaseSignals ?? []).map((s, i) => (<span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">{s}</span>))}
                </div>
              </div>
              {cpuxDesign?.fieldDescription && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Field Description</label>
                  <p className="text-sm mt-1">{cpuxDesign.fieldDescription}</p>
                </div>
              )}
            </div>
            {cpuxDesign?.explanation && <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted/30 rounded-lg">{cpuxDesign.explanation}</p>}
          </CardContent>
        </Card>
      )}

      {containers.length === 0 ? (
        <Card className="py-12 text-center"><CardContent><Box className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" /><p className="text-muted-foreground">No Intention Containers yet. Generate a design or add containers manually.</p></CardContent></Card>
      ) : (
        <div className="space-y-4">
          {containers.map((ic, index) => (
            <motion.div key={ic.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50" />
                <CardContent className="pt-5 pl-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs font-mono text-muted-foreground">IC-{index + 1}</span>
                      <Input value={ic.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(ic.id, { name: e.target.value })} className="h-7 border-none bg-transparent font-semibold px-1 focus-visible:ring-1" />
                    </div>
                    <div className="flex gap-1">
                      <Button size="xs" variant="ghost" onClick={() => moveContainer(index, 'up')} disabled={index === 0}><ChevronUp className="w-3 h-3" /></Button>
                      <Button size="xs" variant="ghost" onClick={() => moveContainer(index, 'down')} disabled={index === containers.length - 1}><ChevronDown className="w-3 h-3" /></Button>
                      <Button size="xs" variant="ghost" onClick={() => removeContainer(ic.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2"><ArrowDownToLine className="w-4 h-4 text-blue-500" /><span className="text-xs font-semibold uppercase text-muted-foreground">O_holder (Accumulator)</span></div>
                    <div className="flex flex-wrap gap-1.5">
                      {phraseNames.map((pn) => (
                        <button key={pn} onClick={() => togglePhrase(ic.id, pn, 'oHolder')} className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${(ic.oHolder ?? []).includes(pn) ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'}`}>{pn}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2"><Box className="w-4 h-4 text-amber-500" /><span className="text-xs font-semibold uppercase text-muted-foreground">DN (Design Node)</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => updateContainer(ic.id, { dn: null })} className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${ic.dn === null ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'}`}>null (trigger)</button>
                        {dnPhrases.map((p) => (
                          <button key={p.id} onClick={() => updateContainer(ic.id, { dn: p.phrase })} className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${ic.dn === p.phrase ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'}`}>{p.phrase}</button>
                        ))}
                      </div>
                      <Input placeholder="DN description..." value={ic.dnDescription ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(ic.id, { dnDescription: e.target.value })} className="h-8 text-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2"><ArrowUpFromLine className="w-4 h-4 text-purple-500" /><span className="text-xs font-semibold uppercase text-muted-foreground">O_reflector (Emitter)</span></div>
                    <div className="flex flex-wrap gap-1.5">
                      {phraseNames.map((pn) => (
                        <button key={pn} onClick={() => togglePhrase(ic.id, pn, 'oReflector')} className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${(ic.oReflector ?? []).includes(pn) ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'}`}>{pn}</button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-medium text-muted-foreground">Trigger Signal</label><Input value={ic.triggerSignal ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(ic.id, { triggerSignal: e.target.value })} className="h-8 text-sm font-mono mt-1" placeholder="signal_name" /></div>
                    <div><label className="text-xs font-medium text-muted-foreground">Release Signal</label><Input value={ic.releaseSignal ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(ic.id, { releaseSignal: e.target.value })} className="h-8 text-sm font-mono mt-1" placeholder="signal_name" /></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {containers.length > 0 && (
        <div className="flex justify-end"><Button onClick={onProceed}>Proceed to Verification <ArrowRight className="w-4 h-4" /></Button></div>
      )}
    </div>
  );
}
