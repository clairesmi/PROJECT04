import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesCard = ({ name, places }) => (
<>
  <h2 className="category-name">{name}</h2>
  <div className="card-wrapper">
    {places.map(place => 
      <div key={place.id} className="category-container">
        <Link to={`/places/${place.id}`}>
          <p className="index-card-cat">{place.name} </p>
          <img src={place.image} alt={place.name} className="category-image"/>
          <p className="index-card-cat">{place.postcode}</p>
        </Link>
      </div>
    )}
  </div>
</>


)

export default CategoriesCard