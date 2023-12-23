import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
