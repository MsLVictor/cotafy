import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CurrencyDetailsPage from './pages/CurrencyDetailsPage'
import ConverterPage from './pages/ConverterPage'
import QuotesPage from './pages/QuotesPage'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage/> } />
      <Route path="/cotacoes" element={<QuotesPage/>} />
      <Route path="/moeda/:codigo" element={<CurrencyDetailsPage />} />
      <Route path="/conversor" element={<ConverterPage />} />
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
