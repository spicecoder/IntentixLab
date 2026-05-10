'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, Copy, FileJson, FileText, Check } from 'lucide-react';
import type { Phrase, CpuxDesign, VerificationData } from '@/lib/types';

interface Props {
  projectName: string;
  scenario: string;
  phrases: Phrase[];
  cpuxDesign: CpuxDesign;
  verification: VerificationData;
}

export default function ExportStage({ projectName, scenario, phrases, cpuxDesign, verification }: Props) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const cpuxJson = useMemo(() => {
    try {
      return JSON.stringify({
        meta: { name: projectName || 'Untitled', version: '1.0', framework: 'CPUX / Intention Space' },
        scenario,
        phrases: phrases.map((p) => ({ phrase: p.phrase, category: p.category, trivalence: p.trivalence, description: p.description })),
        cpux: {
          triggerSignal: cpuxDesign?.triggerSignal ?? '',
          releaseSignals: cpuxDesign?.releaseSignals ?? [],
          fieldDescription: cpuxDesign?.fieldDescription ?? '',
          containers: (cpuxDesign?.containers ?? []).map((c) => ({
            id: c.id, name: c.name, oHolder: c.oHolder, dn: c.dn,
            dnDescription: c.dnDescription, oReflector: c.oReflector,
            triggerSignal: c.triggerSignal, releaseSignal: c.releaseSignal,
          })),
        },
        verification: { score: verification?.overallScore ?? 0, summary: verification?.summary ?? '', results: (verification?.results ?? []).map((r) => ({ rule: r.rule, passed: r.passed, message: r.message })) },
      }, null, 2);
    } catch { return '{}'; }
  }, [projectName, scenario, phrases, cpuxDesign, verification]);

  const markdown = useMemo(() => {
    const lines: string[] = [];
    lines.push(`# CPUX Design: ${projectName || 'Untitled'}`);
    lines.push('', '## Scenario', scenario || '_No scenario_', '');
    lines.push('## Phrases', '| Phrase | Category | Trivalence | Description |', '|--------|----------|------------|-------------|');
    phrases.forEach((p) => lines.push(`| \`${p.phrase}\` | ${p.category} | ${p.trivalence} | ${p.description} |`));
    lines.push('', '## CPUX Structure', '');
    if (cpuxDesign?.triggerSignal) lines.push(`**Trigger Signal:** \`${cpuxDesign.triggerSignal}\``);
    if ((cpuxDesign?.releaseSignals ?? []).length > 0) lines.push(`**Release Signals:** ${cpuxDesign.releaseSignals.map((s) => `\`${s}\``).join(', ')}`);
    if (cpuxDesign?.fieldDescription) lines.push(`**Field:** ${cpuxDesign.fieldDescription}`);
    lines.push('');
    (cpuxDesign?.containers ?? []).forEach((c, i) => {
      lines.push(`### IC-${i + 1}: ${c.name}`, '');
      lines.push(`- **O_holder:** ${c.oHolder.map((p) => `\`${p}\``).join(', ') || '_empty_'}`);
      lines.push(`- **DN:** ${c.dn ? `\`${c.dn}\`` : '\`null\` (trigger)'} \u2014 ${c.dnDescription || ''}`);
      lines.push(`- **O_reflector:** ${c.oReflector.map((p) => `\`${p}\``).join(', ') || '_empty_'}`);
      lines.push(`- **Trigger:** \`${c.triggerSignal}\` \u2192 **Release:** \`${c.releaseSignal}\``, '');
    });
    if ((verification?.results ?? []).length > 0) {
      lines.push('## Verification', '');
      if (verification?.overallScore !== undefined) lines.push(`**Score:** ${verification.overallScore}%`);
      if (verification?.summary) lines.push(`**Summary:** ${verification.summary}`, '');
      verification.results.forEach((r) => lines.push(`- ${r.passed ? '\u2705' : '\u274c'} **${r.rule}**: ${r.message}`));
    }
    return lines.join('\n');
  }, [projectName, scenario, phrases, cpuxDesign, verification]);

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const copyToClipboard = async (content: string, which: 'json' | 'md') => {
    await navigator.clipboard.writeText(content);
    if (which === 'json') { setCopiedJson(true); setTimeout(() => setCopiedJson(false), 2000); }
    else { setCopiedMd(true); setTimeout(() => setCopiedMd(false), 2000); }
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight mb-1">Stage 5: Export</h2>
        <p className="text-muted-foreground">Generate and download the final CPUX specification and documentation.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center"><p className="text-2xl font-display font-bold text-primary">{phrases.length}</p><p className="text-xs text-muted-foreground">Phrases</p></div>
            <div className="text-center"><p className="text-2xl font-display font-bold text-primary">{(cpuxDesign?.containers ?? []).length}</p><p className="text-xs text-muted-foreground">Containers</p></div>
            <div className="text-center"><p className="text-2xl font-display font-bold text-primary">{(cpuxDesign?.releaseSignals ?? []).length}</p><p className="text-xs text-muted-foreground">Release Signals</p></div>
            <div className="text-center"><p className={`text-2xl font-display font-bold ${(verification?.overallScore ?? 0) >= 80 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{verification?.overallScore ?? '-'}%</p><p className="text-xs text-muted-foreground">Verification Score</p></div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="json">
        <TabsList>
          <TabsTrigger value="json" className="gap-2"><FileJson className="w-4 h-4" /> CPUX JSON</TabsTrigger>
          <TabsTrigger value="markdown" className="gap-2"><FileText className="w-4 h-4" /> Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="json">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div><CardTitle className="text-base">CPUX JSON Specification</CardTitle><CardDescription>Machine-readable CPUX design format</CardDescription></div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(cpuxJson, 'json')}>{copiedJson ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiedJson ? 'Copied!' : 'Copy'}</Button>
                  <Button size="sm" onClick={() => downloadFile(cpuxJson, `${(projectName || 'cpux').replace(/\s+/g, '-').toLowerCase()}.json`, 'application/json')}><Download className="w-4 h-4" /> Download</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent><pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-auto max-h-[500px]">{cpuxJson}</pre></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="markdown">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div><CardTitle className="text-base">CPUX Documentation</CardTitle><CardDescription>Human-readable design documentation in Markdown</CardDescription></div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(markdown, 'md')}>{copiedMd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiedMd ? 'Copied!' : 'Copy'}</Button>
                  <Button size="sm" onClick={() => downloadFile(markdown, `${(projectName || 'cpux').replace(/\s+/g, '-').toLowerCase()}.md`, 'text/markdown')}><Download className="w-4 h-4" /> Download</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent><pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-auto max-h-[500px] whitespace-pre-wrap">{markdown}</pre></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
