import React ,{ Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ContextProvider } from './Contexts/ContextProvider.jsx';
import "./i18n/config.js";
import './assets/sass/index.scss';
import './assets/js/index.js';
import "typeface-open-sans";
import router from './router.jsx';
import Loading from './components/Helpers/Loading.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        // Errorhandling global konfiguration
        // Here, for example, send errors to a monitoring system
      },
      retry: false, // Optional: Disable retries
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <RouterProvider router={ router } />
        </ContextProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
)
