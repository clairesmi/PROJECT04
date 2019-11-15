import React from 'react'

const PlacesForm = ({ data, handleChange, handleSubmit, handleCheck }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name
      </label>
      <div className="field">
        <input 
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
      </div>
      <div className="field">
        <input 
          placeholder="Postcode"
          name="postcode"
          onChange={handleChange}
          value={data.postcode}
        />
      </div>
      <div className="Field">
        <input 
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={data.image}
        />
      </div>
      <div className="Field">
        <input 
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={data.description}
        />
      </div>
      <div className="Field">
       I've been here
        <input 
          type="checkbox"
          placeholder="Visited"
          name="visited"
          checked={data.visited}
          onChange={handleCheck}
          value={data.visited}
        />
      </div>


    </form>
  </div>

)

export default PlacesForm