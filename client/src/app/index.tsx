import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
