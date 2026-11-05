import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CurrencyDetailsPage from './pages/CurrencyDetailsPage'
import ConverterPage from './pages/ConverterPage'
import QuotesPage from './pages/QuotesPage'
import MainLayout from './layouts/MainLayout'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

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
