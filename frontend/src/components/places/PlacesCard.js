import React from 'react'
import { Link }  from 'react-router-dom'

const CreatureCard = ({ name, image, id }) => (
  <div>
    <Link to={`/places/${id}`}>
      <h4>{name}</h4>
      <div>
        <div>
          <img className="image" src={image} alt={name} />
        </div>
      </div>

    </Link>
 
  </div>
)

export default CreatureCard
