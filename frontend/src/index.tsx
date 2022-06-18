import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Wrapper from './components/wrapper';
import './global.css';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Wrapper>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <App />
          </QueryClientProvider>
      </Provider>

  </Wrapper>,
  document.querySelector('#root')
);
