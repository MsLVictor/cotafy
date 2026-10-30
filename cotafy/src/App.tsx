import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CurrencyDetailsPage from './pages/CurrencyDetailsPage'
import ConverterPage from './pages/ConverterPage'
import QuotesPage from './pages/QuotesPage'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cotacoes" element={<QuotesPage />} />
        <Route path="/moeda/:codigo" element={<CurrencyDetailsPage />} />
        <Route path="/conversor" element={<ConverterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
