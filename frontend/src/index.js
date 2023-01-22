import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"
import persistStore from 'redux-persist/es/persistStore';
import store from './redux/store'
import App from './App';


import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   {/* <PersistGate loading={null} persistor={persistStore(store)} /> */}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);


