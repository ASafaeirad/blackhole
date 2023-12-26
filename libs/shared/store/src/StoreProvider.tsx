import { Provider } from 'react-redux';

import { store } from './store';

export const StoreProvider = ({ children }: React.PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);
