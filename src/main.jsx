import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import MainRouter from './mainRouter'
import rootReducer from './stateHandlers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: true, 
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <MainRouter />
    </Provider>
  </StrictMode>,
)
