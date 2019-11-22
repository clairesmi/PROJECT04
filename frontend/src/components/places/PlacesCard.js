import React from 'react'
import { Link }  from 'react-router-dom'

const PlaceCard = ({ name, image, id, postcode, categories }) => (
  <div  className='container'> 
    <div className='column-card'>
      <Link to={`/places/${id}`} style={{ textDecoration: 'none' }}>
        <h4 className="index-card">{name}</h4>
        <div>
          <img className="image" src={image} alt={name} />
          <div className="index-card">
            {postcode}
          </div>
        </div>
      </Link>
      <h5 className="categories">Categories</h5>
      <div className="cat-items">
        {categories.map(category => 
          <div key={category.id}>{category.name}</div>
        )}
      </div>
    </div>
  </div>

)

export default PlaceCard
