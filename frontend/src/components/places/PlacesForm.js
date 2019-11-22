import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated() // needs to be invoked as per documentation

const PlacesForm = ({ data, options, handleChange, handleSubmit, handleCheck, handleMultiSelect }) => (
  <div>
    <h2 className="create-title">Add to your map</h2>
    <div className="form-wrapper">
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <div className="create-field">
            <input 
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
          <div className="create-field">
            <input 
              placeholder="Postcode"
              name="postcode"
              onChange={handleChange}
              value={data.postcode}
            />
          </div>
          <div className="create-field">
            <input 
              placeholder="Image"
              name="image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
          <div className="create-field">
            <input 
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description}
            />
          </div>
          <div className="create-field-check">
       I've been here
            <input className="visited-check"
              type="checkbox"
              placeholder="Visited"
              name="visited"
              checked={data.visited}
              onChange={handleCheck}
              value={data.visited}
            />
          </div>          
          <div className="select-control">
            <Select
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
              options={options}
          
              isMulti
              onChange={handleMultiSelect}
              components={animatedComponents}
            />
          </div>
          <button type ="submit" className="create-button">Submit</button>
        </form>
      </div>
    </div>
  </div>

)

export default PlacesForm