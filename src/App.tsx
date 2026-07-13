import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import HirePage from './pages/HirePage'

// Multi-page ready: each future Stitch screen (Projects, Story, Stack, ...)
// drops in as its own page under src/pages and a <Route> below.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shared-chrome pages (animated background + nav + footer via Layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hire" element={<HirePage />} />
          {/* e.g. <Route path="/projects" element={<ProjectsPage />} /> */}
        </Route>
        {/* Chat screen brings its own full-page atmosphere (mesh bg + orbs) */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}
