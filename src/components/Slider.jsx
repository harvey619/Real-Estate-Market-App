import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
import { resolveImage, handleImageError } from '../utils/images'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    useEffect(() => {
        const fetchListings = async () => {
            try {
              //Get a reference
              const listingsRef = collection(db, 'listings')

              //Create a query
              const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))

              //Execute a query
              const querySnap = await getDocs(q)

              const listings = []

              querySnap.forEach((doc) => {
                return listings.push({id: doc.id, data:doc.data()})
              })

              setListings(listings)
              setLoading(false)
        } catch (error) {
              toast.error('Could not fetch listings')
              setLoading(false)
        }
      }
    fetchListings()

    }, [])

  const navigate = useNavigate()

  if(loading) {
    return <Spinner />
  }

  if(!listings || listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Featured homes</p>
     <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div className='swiperSlideDiv' style={{ height: '280px' }}>
                <img
                  src={resolveImage(data.imageUrls?.[0], id)}
                  onError={handleImageError(id)}
                  alt={data.name}
                  className='swiperSlideImg'
                />
                <div className='swiperSlideShade'></div>
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${(data.discountedPrice ?? data.regularPrice)
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
