import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesCard = ({ name, places }) => (
<>
  <h2>{name}</h2>
  <div>
    {places.map(place => 
      <div key={place.id}>
        <Link to={`/places/${place.id}`}>
          <p>{place.name} {place.postcode}</p>
          <img src={place.image} alt={place.name}/>
        </Link>
      </div>
    )}
  </div>
</>


)

export default CategoriesCard