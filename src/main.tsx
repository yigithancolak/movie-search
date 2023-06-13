import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { MovieContextProvider } from './store/contexts/MoviesContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
