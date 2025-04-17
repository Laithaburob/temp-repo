
import React from 'react';

interface CommitHistoryProps {
  repoName: string;
  branch: string;
}

export const CommitHistory: React.FC<CommitHistoryProps> = ({ repoName, branch }) => {
  return (
    <div>
      <h3>Commit History for {repoName} - {branch}</h3>
      {/* Placeholder for commit history */}
    </div>
  );
};
