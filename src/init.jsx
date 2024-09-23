import React ,{ Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query';

import { NotificationProvider } from './Contexts/NotificationProvider.jsx';
import { CookieProvider } from './Contexts/CookieProvider.jsx';
import { ContextProvider } from './Contexts/ContextProvider.jsx';
import { LayoutProvider } from './Contexts/LayoutProvider.jsx';

import queryClient from './Settings/queryClient.js';
import DynamicRouter from './DynamicRouter.jsx';

import './i18n/config.js';
import './assets/sass/index.scss';
import './assets/js/index.js';
import 'typeface-open-sans';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <NotificationProvider>
        <CookieProvider>
          <QueryClientProvider client={queryClient}>
            <ContextProvider>
              <LayoutProvider>
                  <DynamicRouter />
              </LayoutProvider>
            </ContextProvider>
          </QueryClientProvider>
        </CookieProvider>
      </NotificationProvider>
    </Suspense>
  // </React.StrictMode>,
);