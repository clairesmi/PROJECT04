import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated() // needs to be invoked as per documentation

const PlacesForm = ({ data, options, handleChange, handleSubmit, handleCheck, handleMultiSelect }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label>
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
      <label className="label">Categories</label>
      <div className="control">
        <Select 
          getOptionValue={option => option.id}
          getOptionLabel={option => option.name}
          options={options}
          
          isMulti
          onChange={handleMultiSelect}
          components={animatedComponents}
        />
      </div>

      <button type ="submit" className="button">Submit</button>
    </form>
  </div>

)

export default PlacesForm