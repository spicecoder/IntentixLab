'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Cpu, Plus, FolderOpen, Trash2, Clock, FileText, Loader2, BookOpen, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { EXAMPLE_SCENARIOS } from '@/lib/example-scenarios';
import { getAllProjects, createProject, deleteProject as deleteProjectDB, type StoredProject } from '@/lib/indexeddb';
import SettingsModal from './settings-modal';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardClient() {
  const router = useRouter();
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const all = await getAllProjects();
      setProjects(all);
    } catch {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (name: string, scenario?: string, phrases?: string) => {
    setCreating(true);
    try {
      const proj = await createProject(name, scenario, phrases);
      toast.success('Project created!');
      router.push(`/project/${proj.id}`);
    } catch {
      toast.error('Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProjectDB(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">CPUX Authoring Tool</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(true)}>
            <Settings className="w-4 h-4" /> Settings
          </Button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Projects</h1>
          <p className="text-muted-foreground">Design and manage your Perceptive App architectures</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={() => setShowNew(true)} disabled={creating}>
            <Plus className="w-4 h-4" /> New Project
          </Button>
          <Button variant="secondary" onClick={() => {
            const ex = EXAMPLE_SCENARIOS?.[0];
            if (ex) handleCreate(ex.name, ex.scenario);
          }} disabled={creating}>
            <BookOpen className="w-4 h-4" /> Load Example
          </Button>
        </div>

        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Project name..."
                      value={newName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' && newName?.trim()) {
                          handleCreate(newName.trim());
                          setNewName('');
                          setShowNew(false);
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (newName?.trim()) {
                          handleCreate(newName.trim());
                          setNewName('');
                          setShowNew(false);
                        }
                      }}
                      loading={creating}
                    >
                      Create
                    </Button>
                    <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Or start from an example:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(EXAMPLE_SCENARIOS ?? []).map((ex) => (
                        <button
                          key={ex.id}
                          onClick={() => handleCreate(ex.name, ex.scenario)}
                          className="text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
                        >
                          <p className="font-medium text-sm">{ex.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ex.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : projects.length === 0 ? (
          <Card className="py-16 text-center">
            <CardContent>
              <FolderOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No projects yet. Create one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all group"
                  onClick={() => router.push(`/project/${project.id}`)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold truncate">{project.name || 'Untitled'}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.scenario ? (project.scenario.length > 120 ? project.scenario.slice(0, 120) + '...' : project.scenario) : 'No scenario yet'}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(project.updatedAt)}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
