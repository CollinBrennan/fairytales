import { BrowserRouter, Route, Routes } from 'react-router'

import TitlePage from './routes/title'
import BrowsePage from './routes/browse'
import HomePage from './routes/home'
import Navbar from './components/navbar'
import LikesPage from './routes/likes'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/title/:id" element={<TitlePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="*" element={<div>Page not found.</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
