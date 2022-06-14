import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider  resetCSS={false} theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
