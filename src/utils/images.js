// Curated, high-quality real-estate photos used as graceful fallbacks
// whenever a listing's stored image URL is missing or fails to load.
export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
]

// Deterministic pick so the same listing always shows the same fallback.
export const getFallbackImage = (seed = '') => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % FALLBACK_IMAGES.length
  return FALLBACK_IMAGES[index]
}

// Returns a usable image URL, falling back when the stored value is empty.
export const resolveImage = (url, seed = '') => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return getFallbackImage(seed)
  }
  return url
}

// onError handler for <img> tags — swaps in a fallback once, avoiding loops.
export const handleImageError = (seed = '') => (e) => {
  const fallback = getFallbackImage(seed)
  if (e.target.src !== fallback) {
    e.target.src = fallback
  }
}
