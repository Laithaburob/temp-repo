
import React from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">AI-Enhanced Learning Management System</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Empowering education through intelligent technology
      </p>
      <Button>Get Started</Button>
    </div>
  );
}
