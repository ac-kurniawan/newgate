import { ChakraProvider } from '@chakra-ui/react';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './state';

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
