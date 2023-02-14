import { createContext } from 'react';

export type SetActiveWorkspace = (workspace: string) => void;

export type Workspace = {
  activeWorkspace: string | null;
  setActiveWorkspace: SetActiveWorkspace;
};

export const WorkspaceLoader = createContext<Workspace>({} as Workspace);
