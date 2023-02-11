import React, { useCallback, useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import './App.css';
import Contributors from './components/Contributors';
 
const queryClient = new QueryClient()

function App() {  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
          <Contributors />
      </div>
    </QueryClientProvider>
  );
}

export default App;
