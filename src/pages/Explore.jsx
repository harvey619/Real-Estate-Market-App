import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <section className="exploreHero">
          <p className="exploreHeroEyebrow">Estately · Find your place</p>
          <h1 className="exploreHeroTitle">Discover a home you'll love</h1>
          <p className="exploreHeroSubtitle">
            Browse handpicked homes for rent and sale, with rich photos,
            map locations, and direct contact to every owner.
          </p>
          <div className="exploreHeroStats">
            <div className="exploreHeroStat">
              <strong>1,200+</strong>
              <span>Active listings</span>
            </div>
            <div className="exploreHeroStat">
              <strong>40+</strong>
              <span>Cities covered</span>
            </div>
            <div className="exploreHeroStat">
              <strong>4.9★</strong>
              <span>Average rating</span>
            </div>
          </div>
        </section>

        <Slider />

        <p className="exploreCategoryHeading">Browse by category</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <div className="exploreCategoryCard">
              <img src={rentCategoryImage} alt="Places for rent" className='exploreCategoryImg' />
              <div className="exploreCategoryShade"></div>
              <p className='exploreCategoryName'>Places for rent</p>
            </div>
          </Link>
          <Link to='/category/sale'>
            <div className="exploreCategoryCard">
              <img src={sellCategoryImage} alt="Places for sale" className='exploreCategoryImg' />
              <div className="exploreCategoryShade"></div>
              <p className='exploreCategoryName'>Places for sale</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
