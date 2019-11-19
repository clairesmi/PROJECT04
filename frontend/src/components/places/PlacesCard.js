import React from 'react'
import { Link }  from 'react-router-dom'

const PlaceCard = ({ name, image, id, postcode, categories }) => (
  <div>
    <Link to={`/places/${id}`}>
      <h4>{name}</h4>
      <div>
        <div>
          <img className="image" src={image} alt={name} />
        </div>
        <div>
          {postcode}
        </div>
    
      </div>

    </Link>
    <div>
      {categories.map(category => 
        <div key={category.id}>{category.name}</div>
      )}
    </div>
 
  </div>
)

export default PlaceCard
