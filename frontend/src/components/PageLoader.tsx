import React from 'react';

interface PageLoaderProps {
  loadingStates: boolean[];
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ loadingStates, children }) => {
  const isLoading = loadingStates.some(loading => loading);

  if (isLoading) {
    return null; // Or a loading spinner component
  }

  return <>{children}</>;
};

export default PageLoader;
