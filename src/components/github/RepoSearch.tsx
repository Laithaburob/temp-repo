
import React from 'react';

interface RepoSearchProps {
  onSearch: (query: string) => void;
}

export const RepoSearch: React.FC<RepoSearchProps> = ({ onSearch }) => {
  return (
    <div>
      {/* Placeholder for repo search component */}
      <input 
        type="text" 
        placeholder="Search repositories" 
        onChange={(e) => onSearch(e.target.value)} 
      />
    </div>
  );
};
