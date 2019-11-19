import React from 'react'

const PlacesComment = ({ value, place, handleChange, handleSubmit }) => (

  <form onSubmit={handleSubmit}>
    <label>
    Leave yourself a note about {place.name}
    </label>
    <textarea name="text" onChange={handleChange} value={value}/>
    <input 
      type="submit"
      value="Submit"
    />
  </form>



)

export default PlacesComment