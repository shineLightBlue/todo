'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
              </PersistGate>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
