import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Wrapper from './components/wrapper';
import './global.css';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();


ReactDOM.render(
  <Wrapper>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </Wrapper>,
  document.querySelector('#root')
);
