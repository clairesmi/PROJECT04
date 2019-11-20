import React from 'react'

const PlacesComment = ({ value, place, handleChange, handleSubmit }) => (
  <div className="comment-form">
    <label>
    Leave yourself a note about {place.name}
    </label>
    <form onSubmit={handleSubmit}>
      <textarea className="comment-text-input" name="text" onChange={handleChange} value={value}/>
      <div>
        <input className="comment-submit-button"
          type="submit"
          value="Save"
        />
      </div>
    </form>
  </div>

)

export default PlacesComment