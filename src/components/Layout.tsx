import { Outlet } from 'react-router-dom'
import Background from './Background'
import Nav from './Nav'
import Footer from './Footer'

// Shared chrome for every page: animated background, fixed nav, footer.
// Each page renders into <Outlet />.
export default function Layout() {
  return (
    <>
      <Background />
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
