import { Link } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <div className="siteFooterBrand">
          <Link to="/" className="brand">
            <span className="brandMark">
              <ExploreIcon fill="#fff" width="20px" height="20px" />
            </span>
            <span className="brandName">Estately</span>
          </Link>
          <p className="siteFooterTagline">
            Discover homes you'll love — for rent and for sale, with rich photos
            and direct contact to every owner.
          </p>
        </div>

        <div className="siteFooterCols">
          <div className="siteFooterCol">
            <p className="siteFooterColTitle">Explore</p>
            <Link to="/category/rent">Places for rent</Link>
            <Link to="/category/sale">Places for sale</Link>
            <Link to="/offers">Special offers</Link>
          </div>
          <div className="siteFooterCol">
            <p className="siteFooterColTitle">Account</p>
            <Link to="/profile">My profile</Link>
            <Link to="/create-listing">List a property</Link>
            <Link to="/sign-in">Sign in</Link>
          </div>
          <div className="siteFooterCol">
            <p className="siteFooterColTitle">Company</p>
            <a href="#">About us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="siteFooterBar">
        <span>© {year} Estately. Crafted for demonstration.</span>
        <span className="siteFooterBuilt">Built with React · Firebase · Leaflet</span>
      </div>
    </footer>
  )
}

export default Footer
