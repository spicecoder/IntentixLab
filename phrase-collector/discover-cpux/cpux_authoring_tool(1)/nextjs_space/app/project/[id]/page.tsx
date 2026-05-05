'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectEditor from './_components/project-editor';

export default function ProjectPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return <ProjectEditor projectId={(params?.id as string) ?? ''} />;
}
