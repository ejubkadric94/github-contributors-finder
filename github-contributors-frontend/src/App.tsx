import { QueryClient, QueryClientProvider } from 'react-query'
import Contributors from './components/Contributors';
import './App.css';
 
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
