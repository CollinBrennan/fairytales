import { BrowserRouter, Route, Routes } from 'react-router'

import Navbar from './components/navbar'
import { Toaster } from './components/ui/toaster'

import Title from './routes/title'
import Browse from './routes/browse'
import Home from './routes/home'
import Saved from './routes/saved'
import Admin from './routes/admin'
import PageNotFound from './routes/not-found'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/title/:id" element={<Title />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
