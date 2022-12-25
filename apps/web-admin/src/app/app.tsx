import { ChakraProvider, Text } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { getRouter } from './routes';
import {Provider} from "react-redux";
import {store} from "./state";

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider
          router={getRouter(false)}
          fallbackElement={<Text>404 Error Not Found</Text>}
        />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
