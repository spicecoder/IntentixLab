'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Check, X, ArrowRight, Info, Globe } from 'lucide-react';
import { CATEGORY_DESCRIPTIONS } from '@/lib/example-scenarios';
import { wpGetPhrases, wpGetSpaces } from '@/lib/wp-client';
import type { Phrase } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  phrases: Phrase[];
  onPhrasesChange: (p: Phrase[]) => void;
  onProceed: () => void;
}

const TV_OPTIONS = ['Y', 'N', 'UN'] as const;
const CAT_OPTIONS = ['Pulse', 'DN', 'I', 'O'] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Pulse: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  DN: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  I: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  O: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

// Map ISC roles to CPUX categories
const ISC_ROLE_TO_CATEGORY: Record<string, Phrase['category']> = {
  pulse: 'Pulse',
  design_node: 'DN',
  intention: 'I',
  object: 'O',
  signal: 'I',
  cpux: 'DN',
  constraint: 'DN',
  service: 'DN',
  resource: 'O',
  decision_phrase: 'DN',
  unclassified: 'Pulse',
};

export default function PhrasesStage({ phrases, onPhrasesChange, onProceed }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Phrase>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newPhrase, setNewPhrase] = useState<Partial<Phrase>>({
    phrase: '', category: 'Pulse', trivalence: 'UN', description: '',
  });
  const [wpLoading, setWpLoading] = useState(false);
  const [wpSpaces, setWpSpaces] = useState<any[]>([]);
  const [wpSelectedSpace, setWpSelectedSpace] = useState('');
  const [wpExpanded, setWpExpanded] = useState(false);

  const addPhrase = () => {
    if (!newPhrase?.phrase?.trim()) { toast.error('Phrase name is required'); return; }
    onPhrasesChange([
      ...phrases,
      {
        id: `p-${Date.now()}`,
        phrase: newPhrase.phrase.trim(),
        category: (newPhrase.category as Phrase['category']) ?? 'Pulse',
        trivalence: (newPhrase.trivalence as Phrase['trivalence']) ?? 'UN',
        description: newPhrase.description ?? '',
      },
    ]);
    setNewPhrase({ phrase: '', category: 'Pulse', trivalence: 'UN', description: '' });
    setShowAdd(false);
    toast.success('Phrase added');
  };

  const deletePhrase = (id: string) => onPhrasesChange(phrases.filter((p) => p.id !== id));

  const startEdit = (p: Phrase) => { setEditingId(p.id); setEditForm({ ...p }); };

  const saveEdit = () => {
    if (!editForm?.phrase?.trim()) { toast.error('Phrase name is required'); return; }
    onPhrasesChange(phrases.map((p) =>
      p.id === editingId ? { ...p, phrase: editForm.phrase!.trim(), category: editForm.category as Phrase['category'] ?? p.category, trivalence: editForm.trivalence as Phrase['trivalence'] ?? p.trivalence, description: editForm.description ?? p.description } : p
    ));
    setEditingId(null);
  };

  const loadWpSpaces = async () => {
    setWpExpanded(true);
    const spaces = await wpGetSpaces();
    setWpSpaces(spaces);
  };

  const loadFromWordPress = async () => {
    setWpLoading(true);
    try {
      const raw = await wpGetPhrases(wpSelectedSpace || undefined);
      const mapped: Phrase[] = raw.map((item: any, i: number) => ({
        id: `wp-${item?.id ?? i}-${Date.now()}`,
        phrase: item?.phrase ?? '',
        category: ISC_ROLE_TO_CATEGORY[item?.isc_role] ?? 'Pulse',
        trivalence: 'UN' as const,
        description: `[${item?.sr_type ?? ''}/${item?.execution_potential ?? ''}] ${item?.context ?? ''}`.trim(),
      }));
      if (mapped.length > 0) {
        onPhrasesChange([...phrases, ...mapped]);
        toast.success(`Loaded ${mapped.length} phrases from WordPress`);
      } else {
        toast.info('No phrases found');
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to load from WordPress');
    } finally {
      setWpLoading(false);
    }
  };

  const grouped = phrases.reduce((acc: Record<string, Phrase[]>, p) => {
    const cat = p.category ?? 'Pulse';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight mb-1">Stage 2: Phrase Discovery</h2>
        <p className="text-muted-foreground">Review, edit, and categorize phrases. Each phrase has a category (Pulse/DN/I/O) and trivalence (Y/N/UN).</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(CATEGORY_DESCRIPTIONS).map(([cat, desc]) => (
          <div key={cat} className={`p-3 rounded-lg border ${CATEGORY_COLORS[cat] ?? ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-3 h-3" />
              <span className="font-mono font-bold text-sm">{cat}</span>
            </div>
            <p className="text-xs opacity-80">{desc}</p>
          </div>
        ))}
      </div>

      {/* WordPress ISC API */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> WordPress ISC Phrase API
          </CardTitle>
          <CardDescription>Load phrases from your Intention Space Collection. Configure the API URL in Settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!wpExpanded ? (
            <Button variant="secondary" size="sm" onClick={loadWpSpaces}>Connect to ISC API</Button>
          ) : (
            <>
              {wpSpaces.length > 0 && (
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-muted-foreground">Space</label>
                    <Select value={wpSelectedSpace} onValueChange={setWpSelectedSpace}>
                      <SelectTrigger><SelectValue placeholder="All spaces" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value=" ">All spaces</SelectItem>
                        {wpSpaces.map((s: any) => (
                          <SelectItem key={s.space_uid} value={s.space_uid}>
                            {s.title} [{s.space_uid}]
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <Button size="sm" onClick={loadFromWordPress} loading={wpLoading}>Load Phrases</Button>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{phrases.length} phrases total</span>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Phrase</Button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <Card className="border-primary/30">
              <CardContent className="pt-6 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input placeholder="Phrase name" value={newPhrase.phrase ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhrase({ ...newPhrase, phrase: e.target.value })} />
                  <Select value={newPhrase.category ?? 'Pulse'} onValueChange={(v) => setNewPhrase({ ...newPhrase, category: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CAT_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={newPhrase.trivalence ?? 'UN'} onValueChange={(v) => setNewPhrase({ ...newPhrase, trivalence: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{TV_OPTIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="Description" value={newPhrase.description ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhrase({ ...newPhrase, description: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={addPhrase}><Check className="w-4 h-4" /> Add</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /> Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {phrases.length === 0 ? (
        <Card className="py-12 text-center"><CardContent><p className="text-muted-foreground">No phrases yet. Analyze a scenario or add phrases manually.</p></CardContent></Card>
      ) : (
        <div className="space-y-4">
          {CAT_OPTIONS.map((cat) => {
            const items = grouped[cat] ?? [];
            if (items.length === 0) return null;
            return (
              <Card key={cat}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${CATEGORY_COLORS[cat] ?? ''}`}>{cat}</span>
                    <span className="text-muted-foreground text-sm font-normal">({items.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {items.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group">
                        {editingId === p.id ? (
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                            <Input value={editForm.phrase ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, phrase: e.target.value })} className="h-8 text-sm" />
                            <Select value={editForm.category ?? 'Pulse'} onValueChange={(v) => setEditForm({ ...editForm, category: v as any })}>
                              <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                              <SelectContent>{CAT_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select value={editForm.trivalence ?? 'UN'} onValueChange={(v) => setEditForm({ ...editForm, trivalence: v as any })}>
                              <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                              <SelectContent>{TV_OPTIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                            </Select>
                            <div className="flex gap-1">
                              <Button size="xs" onClick={saveEdit}><Check className="w-3 h-3" /></Button>
                              <Button size="xs" variant="ghost" onClick={() => setEditingId(null)}><X className="w-3 h-3" /></Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="font-mono text-sm font-medium flex-1">{p.phrase}</span>
                            <span className="text-xs text-muted-foreground font-mono">[{p.trivalence}]</span>
                            <span className="text-xs text-muted-foreground hidden md:block max-w-[200px] truncate">{p.description}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="xs" variant="ghost" onClick={() => startEdit(p)}><Edit2 className="w-3 h-3" /></Button>
                              <Button size="xs" variant="ghost" onClick={() => deletePhrase(p.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {phrases.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={onProceed}>Proceed to CPUX Design <ArrowRight className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
}
