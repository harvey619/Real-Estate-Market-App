// Shimmering placeholder cards shown while listings load — feels faster
// and more polished than a full-screen spinner.
function ListingSkeleton({ count = 6 }) {
  return (
    <ul className="categoryListings">
      {Array.from({ length: count }).map((_, i) => (
        <li className="categoryListing skeletonCard" key={i}>
          <div className="skeletonImg shimmer" />
          <div className="categoryListingDetails">
            <div className="skeletonLine shimmer" style={{ width: '40%', height: 10 }} />
            <div className="skeletonLine shimmer" style={{ width: '80%', height: 16 }} />
            <div className="skeletonLine shimmer" style={{ width: '50%', height: 18, marginTop: 12 }} />
            <div className="skeletonLine shimmer" style={{ width: '65%', height: 12, marginTop: 16 }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ListingSkeleton
