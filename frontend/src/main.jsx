import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.jsx'; // Ensure persistor is exported from your store setup

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
