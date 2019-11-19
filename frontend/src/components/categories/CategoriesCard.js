import React from 'react'

const CategoriesCard = ({ name, places }) => (
<>
  <h2>{name}</h2>
  <div>
    {places.map(place => 
      <div key={place.id}>
        <p>{place.name} {place.postcode}</p>
        <img src={place.image} alt={place.name}/>
      </div>
    )}
  </div>
</>


)

export default CategoriesCard