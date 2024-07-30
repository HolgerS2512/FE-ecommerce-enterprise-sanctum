import React ,{ Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './Contexts/ContextProvider.jsx';
import "./i18n/config.js";
import './assets/sass/index.scss';
import './assets/js/index.js';
import "typeface-open-sans";
import router from './router.jsx';
import Loading from './components/Helpers/Loading.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ContextProvider>
        <RouterProvider router={ router } />
      </ContextProvider>
    </Suspense>
  </React.StrictMode>,
)
