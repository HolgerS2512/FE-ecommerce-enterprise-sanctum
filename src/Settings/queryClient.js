import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        // Errorhandling global konfiguration
        // Here, for example, send errors to a monitoring system
        console.log('Ein Fehler ist aufgetreten:', error.message, error);
      },
      retry: false, // Optional: Disable retries
      refetchOnWindowFocus: false, // Specify whether data is re-fetched when the window is focused
			refetchOnMount: true, // Data is not retrieved each time the component is mounted
			refetchOnReconnect: true, // Specify whether data is re-fetched during a network recovery
    },
    mutations: {
      onError: (error) => {
        console.error('Fehler bei Mutation:', error);
        // Example: Send errors to a monitoring system
      },
    },
  },
});

export default queryClient
