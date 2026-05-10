'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Settings, Key, Globe, Bot, Eye, EyeOff, Check } from 'lucide-react';
import { getSettings, saveSettings } from '@/lib/indexeddb';
import { wpCheckHealth, wpCheckLogin, wpOpenLogin } from '@/lib/wp-client';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({ open, onOpenChange }: Props) {
  const [llmApiUrl, setLlmApiUrl] = useState('https://apps.abacus.ai/v1');
  const [llmApiKey, setLlmApiKey] = useState('');
  const [llmModel, setLlmModel] = useState('gpt-5.4-mini');
  const [wpApiUrl, setWpApiUrl] = useState('https://keybytesystems.com/wp-json/isc/v1');
  const [wpUsername, setWpUsername] = useState('');
  const [wpAppPassword, setWpAppPassword] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [wpStatus, setWpStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      getSettings().then((s) => {
        setLlmApiUrl(s.llmApiUrl);
        setLlmApiKey(s.llmApiKey);
        setLlmModel(s.llmModel);
        setWpApiUrl(s.wpApiUrl);
        setWpUsername(s.wpUsername);
        setWpAppPassword(s.wpAppPassword);
      });
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings({
        llmApiUrl,
        llmApiKey,
        llmModel,
        wpApiUrl,
        wpUsername,
        wpAppPassword,
      });
      toast.success('Settings saved');
      onOpenChange(false);
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const checkWP = async () => {
    setWpStatus('Checking...');
    // Save current WP settings first so wp-client picks them up
    await saveSettings({ wpApiUrl, wpUsername, wpAppPassword });
    const health = await wpCheckHealth();
    if (!health) {
      setWpStatus('\u274c API not reachable');
      return;
    }
    const login = await wpCheckLogin();
    if (login.loggedIn) {
      setWpStatus(`\u2705 Connected as ${login.user?.name ?? 'user'}`);
    } else {
      setWpStatus(`\u2705 API reachable (v${health.version ?? '?'}) — not logged in`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> Settings
          </DialogTitle>
          <DialogDescription>Configure LLM and WordPress API connections</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="llm">
          <TabsList className="w-full">
            <TabsTrigger value="llm" className="gap-1.5 flex-1">
              <Bot className="w-4 h-4" /> LLM
            </TabsTrigger>
            <TabsTrigger value="wordpress" className="gap-1.5 flex-1">
              <Globe className="w-4 h-4" /> WordPress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="llm" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <Input value={llmApiUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLlmApiUrl(e.target.value)} placeholder="https://apps.abacus.ai/v1" />
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  value={llmApiKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLlmApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input value={llmModel} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLlmModel(e.target.value)} placeholder="gpt-5.4-mini" />
              <p className="text-xs text-muted-foreground">Supported: gpt-5.4-mini, gpt-5.4, claude-sonnet-4-6, gemini-2.5-flash, etc.</p>
            </div>
          </TabsContent>

          <TabsContent value="wordpress" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>ISC API Base URL</Label>
              <Input value={wpApiUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWpApiUrl(e.target.value)} placeholder="https://keybytesystems.com/wp-json/isc/v1" />
              <input type="hidden" id="__wp-api-base" value={wpApiUrl} />
            </div>
            <div className="space-y-2">
              <Label>WordPress Username <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input value={wpUsername} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWpUsername(e.target.value)} placeholder="username or email" />
            </div>
            <div className="space-y-2">
              <Label>Application Password <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <div className="relative">
                <Input
                  type={showPass ? 'text' : 'password'}
                  value={wpAppPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWpAppPassword(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Leave blank to rely on browser cookie login.</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={checkWP}>Check API</Button>
              <Button size="sm" variant="secondary" onClick={() => wpOpenLogin()}>Login via WordPress</Button>
            </div>
            {wpStatus && (
              <p className="text-sm p-2 rounded-md bg-muted/50">{wpStatus}</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} loading={saving}>
            <Check className="w-4 h-4" /> Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
