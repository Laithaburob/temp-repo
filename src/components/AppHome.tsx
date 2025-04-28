
import React from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppHome: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Github /> AI-Enhanced Learning Management System
      </h1>
      <p className="mb-4">Welcome to the LMS platform! Built with modern web technologies.</p>
      <Button>Get Started</Button>
    </div>
  );
};

export default AppHome;
