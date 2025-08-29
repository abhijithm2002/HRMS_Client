import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './reduxStore/store.js'
import { HeroUIProvider } from '@heroui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider >
        <App />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
)
