import { NavLink, Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import ThemeToggle from './ThemeToggle'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link to="/" className="brand">
          <span className="brandMark">
            <ExploreIcon fill="#fff" width="20px" height="20px" />
          </span>
          <span className="brandName">Estately</span>
        </Link>

        <nav className="siteNav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'siteNavLink active' : 'siteNavLink')}>
            Explore
          </NavLink>
          <NavLink to="/category/rent" className={({ isActive }) => (isActive ? 'siteNavLink active' : 'siteNavLink')}>
            For Rent
          </NavLink>
          <NavLink to="/category/sale" className={({ isActive }) => (isActive ? 'siteNavLink active' : 'siteNavLink')}>
            For Sale
          </NavLink>
          <NavLink to="/offers" className={({ isActive }) => (isActive ? 'siteNavLink active' : 'siteNavLink')}>
            Offers
          </NavLink>
        </nav>

        <div className="siteHeaderActions">
          <ThemeToggle />
          <button className="headerProfileBtn" onClick={() => navigate('/profile')}>
            Profile
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
