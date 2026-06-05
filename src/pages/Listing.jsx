import { getDoc,doc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { resolveImage, handleImageError } from '../utils/images'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied,setShareLinkCopied] = useState(false)
    
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()
    
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const docRef = doc(db,'listings',params.listingId)
                
                const docSnap = await getDoc(docRef)
                
                if (docSnap.exists()) {
                    setListing(docSnap.data())
                    setLoading(false)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchListing()
        
    },[navigate,params.listingId])

    if(loading) {
        return <Spinner/>
    }
   
    return (
        <main>
      <Swiper pagination={true}>
        {listing?.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className='swiperSlideDiv' style={{ height: '340px' }}>
              <img
                src={resolveImage(url, params.listingId + index)}
                onError={handleImageError(params.listingId + index)}
                alt={listing.name}
                className='swiperSlideImg'
              />
            </div>
          </SwiperSlide>
        ))}
            </Swiper>
            
            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                },2000)
            }}>
                <img src={shareIcon} alt="" />
            </div>
            
            {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
            <div className="listingDetails">
              <div className="listingDetailsCard">
                <p className="listingName">{listing.name} - ${
                    listing.offer ?
                        listing.discountedPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }{listing.type === 'rent' && ' / month'}</p>
                <p className="listingLocation">{listing.location}</p>
                <div className="listingBadges">
                  <span className="listingType">
                      For {listing.type==='rent' ? 'Rent' : 'Sale'}
                  </span>
                  {listing.offer && (
                      <span className="discountPrice">
                          ${(listing.regularPrice - listing.discountedPrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} discount
                      </span>
                  )}
                </div>
                <ul className="listingDetailsList">
                    <li>
                        {listing.bedrooms>1?`${listing.bedrooms} Bedrooms`:'1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms>1?`${listing.bathrooms} Bathrooms`:'1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished &&'Furnished'}</li>
                </ul>
                <p className="listingLocationTitle">Location</p>
                
                <div className="leafletContainer">
                    <MapContainer style={{ height: '100%', width: '100%' }}
                        center={[listing.geolocation.lat, listing.geolocation.long]}
                    zoom={13} scrollWheelZoom={false}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/
                            copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        />
                        <Marker position={[listing.geolocation.lat, listing.geolocation.long]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                
                {auth.currentUser?.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className="primaryButton">
                        Contact Owner
                    </Link>
                )}
              </div>
            </div>
        </main>
    )
}

export default Listing