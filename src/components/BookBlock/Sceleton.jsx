import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = (props) => (
  <ContentLoader
    className='skeleton-block'
    speed={2}
    width={300}
    height={443}
    viewBox="0 0 300 443"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="6" ry="6" width="185" height="300" /> 
    <rect x="0" y="330" rx="2" ry="2" width="185" height="20" />
    <rect x="0" y="360" rx="2" ry="2" width="60" height="12" />
    <rect x="0" y="411" rx="5" ry="5" width="50" height="22" /> 
    <circle cx="170" cy="420" r="18" />
  </ContentLoader>
)

export default Sceleton