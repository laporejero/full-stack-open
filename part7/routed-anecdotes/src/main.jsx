import { createRoot } from 'react-dom/client'
import { AnecdoteProvider } from './contexts/AnecdoteContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <AnecdoteProvider>
        <App />
    </AnecdoteProvider>
)
