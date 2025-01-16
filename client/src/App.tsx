import { BrowserRouter, Route, Routes } from 'react-router'

import Navbar from './components/navbar'

import TitlePage from './routes/title'
import BrowsePage from './routes/browse'
import HomePage from './routes/home'
import LikesPage from './routes/likes'
import AdminPage from './routes/admin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/title/:id" element={<TitlePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<div>Page not found.</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
