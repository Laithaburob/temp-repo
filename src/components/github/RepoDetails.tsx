
import React from 'react';

interface RepoDetailsProps {
  repoName: string;
}

export const RepoDetails: React.FC<RepoDetailsProps> = ({ repoName }) => {
  return (
    <div>
      <h2>Repository Details for {repoName}</h2>
      {/* Placeholder for repo details */}
    </div>
  );
};
