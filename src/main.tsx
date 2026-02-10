import { createRoot } from 'react-dom/client'
import './app/index.css'
import './app/dark.css'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './shared/lib/redux/store'
import { LanguageSync, ThemeManager } from './features/Theme/Theme'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeManager />
      <LanguageSync />
      <App />
    </BrowserRouter>
  </Provider>
)
