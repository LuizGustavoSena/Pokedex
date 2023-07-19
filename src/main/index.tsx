import Header from '@/presentation/components/header'
import Pokemon from '@/presentation/components/pokemon'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Pokemon />
  </React.StrictMode>,
)
