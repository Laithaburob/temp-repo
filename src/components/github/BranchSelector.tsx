
import React from 'react';

interface BranchSelectorProps {
  repository: string;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  repository, 
  selectedBranch, 
  onBranchChange 
}) => {
  const branches = ['main', 'master', 'develop']; // Example branches

  return (
    <select 
      value={selectedBranch} 
      onChange={(e) => onBranchChange(e.target.value)}
    >
      {branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </select>
  );
};
