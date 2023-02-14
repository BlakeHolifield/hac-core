import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init, RegistryContext } from './store';
import App from './App';
import logger from 'redux-logger';
import { InitializeSDK } from './sdk';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import { useWorkspace } from '@openshift/dynamic-plugin-sdk-utils';
import { WorkspaceLoader } from './Utils/WorkspaceLoader';

const AppEntry = () => {
  const registry = process.env.NODE_ENV !== 'production' ? init(logger) : init();
  const [workspace, setWorkspace] = useWorkspace();
  return (
    <RegistryContext.Provider
      value={{
        getRegistry: () => registry,
      }}
    >
      <Provider store={registry.getStore()}>
        <WorkspaceLoader.Provider
          value={{
            setActiveWorkspace: setWorkspace,
            activeWorkspace: workspace,
          }}
        ></WorkspaceLoader.Provider>
        <InitializeSDK>
          <Router basename={getBaseName(window.location.pathname, 0)}>
            <App />
          </Router>
        </InitializeSDK>
      </Provider>
    </RegistryContext.Provider>
  );
};

export default AppEntry;
