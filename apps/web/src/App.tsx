import { authSlice } from '@blackhole/auth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { Routes } from './Routes';

const store = configureStore({
  reducer: authSlice.reducer,
});

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
