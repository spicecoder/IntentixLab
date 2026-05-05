'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Cpu, ArrowLeft, Save, Loader2, FileText, Search, Boxes, ShieldCheck, Download, Settings } from 'lucide-react';
import type { Phrase, CpuxDesign, VerificationData } from '@/lib/types';
import { getProject, saveProject, type StoredProject } from '@/lib/indexeddb';
import ScenarioStage from './stage-scenario';
import PhrasesStage from './stage-phrases';
import CpuxDesignStage from './stage-cpux-design';
import VerificationStage from './stage-verification';
import ExportStage from './stage-export';
import SettingsModal from '@/app/_components/settings-modal';

const STAGES = [
  { id: 'scenario', label: 'Scenario', icon: FileText, num: 1 },
  { id: 'phrases', label: 'Phrases', icon: Search, num: 2 },
  { id: 'cpux-design', label: 'CPUX Design', icon: Boxes, num: 3 },
  { id: 'verification', label: 'Verification', icon: ShieldCheck, num: 4 },
  { id: 'export', label: 'Export', icon: Download, num: 5 },
];

export default function ProjectEditor({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('scenario');
  const [projectName, setProjectName] = useState('');
  const [scenario, setScenario] = useState('');
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [cpuxDesign, setCpuxDesign] = useState<CpuxDesign>({ containers: [], releaseSignals: [], triggerSignal: '' });
  const [verification, setVerification] = useState<VerificationData>({ results: [] });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const dirtyRef = useRef(false);
  const projectRef = useRef<StoredProject | null>(null);

  const loadProject = useCallback(async () => {
    try {
      const data = await getProject(projectId);
      if (!data) {
        toast.error('Project not found');
        router.replace('/');
        return;
      }
      projectRef.current = data;
      setProjectName(data.name ?? '');
      setScenario(data.scenario ?? '');
      try { setPhrases(JSON.parse(data.phrases ?? '[]')); } catch { setPhrases([]); }
      try { setCpuxDesign(JSON.parse(data.cpuxDesign ?? '{}')); } catch { setCpuxDesign({ containers: [], releaseSignals: [], triggerSignal: '' }); }
      try { setVerification(JSON.parse(data.verification ?? '{}')); } catch { setVerification({ results: [] }); }
    } catch {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useEffect(() => { loadProject(); }, [loadProject]);

  const doSave = useCallback(async () => {
    if (!projectRef.current) return;
    setSaving(true);
    try {
      await saveProject({
        ...projectRef.current,
        name: projectName,
        scenario,
        phrases: JSON.stringify(phrases ?? []),
        cpuxDesign: JSON.stringify(cpuxDesign ?? {}),
        verification: JSON.stringify(verification ?? {}),
      });
      dirtyRef.current = false;
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }, [projectName, scenario, phrases, cpuxDesign, verification]);

  useEffect(() => {
    if (loading) return;
    dirtyRef.current = true;
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      if (dirtyRef.current) doSave();
    }, 2000);
    return () => { if (autoSaveRef.current) clearTimeout(autoSaveRef.current); };
  }, [projectName, scenario, phrases, cpuxDesign, verification, loading, doSave]);

  const currentStage = STAGES.findIndex((s) => s.id === activeTab) + 1;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <Input
              value={projectName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
              className="font-display font-bold text-lg border-none bg-transparent h-8 px-1 w-64 focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < currentStage ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-2">Stage {currentStage}/5</span>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={() => setSettingsOpen(true)}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={doSave} loading={saving}>
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start bg-muted/50 h-12 mb-6 overflow-x-auto">
            {STAGES.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="gap-2 px-4">
                <s.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">S{s.num}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="scenario">
            <ScenarioStage
              scenario={scenario}
              onScenarioChange={setScenario}
              onPhrasesDiscovered={(newPhrases: Phrase[]) => {
                setPhrases(newPhrases);
                setActiveTab('phrases');
              }}
            />
          </TabsContent>
          <TabsContent value="phrases">
            <PhrasesStage phrases={phrases} onPhrasesChange={setPhrases} onProceed={() => setActiveTab('cpux-design')} />
          </TabsContent>
          <TabsContent value="cpux-design">
            <CpuxDesignStage phrases={phrases} scenario={scenario} cpuxDesign={cpuxDesign} onDesignChange={setCpuxDesign} onProceed={() => setActiveTab('verification')} />
          </TabsContent>
          <TabsContent value="verification">
            <VerificationStage cpuxDesign={cpuxDesign} phrases={phrases} verification={verification} onVerificationChange={setVerification} onProceed={() => setActiveTab('export')} />
          </TabsContent>
          <TabsContent value="export">
            <ExportStage projectName={projectName} scenario={scenario} phrases={phrases} cpuxDesign={cpuxDesign} verification={verification} />
          </TabsContent>
        </Tabs>
      </main>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
