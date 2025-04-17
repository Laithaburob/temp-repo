
import React from 'react';

interface FileBrowserProps {
  repoName: string;
  branch: string;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({ repoName, branch }) => {
  return (
    <div>
      <h3>Files in {repoName} - {branch}</h3>
      {/* Placeholder for file browser */}
    </div>
  );
};
