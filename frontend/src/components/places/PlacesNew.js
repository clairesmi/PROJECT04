import React from 'react'
// import axios from 'axios'
import PlacesForm from './PlacesForm'
// import Auth from '../auth'

class PlacesNew extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        name: '',
        postcode: '',
        image: '',
        description: '',
        visited: false  
      }, 
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)

  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleCheck({ target: { name, value, type, checked } }) { // destructured const name = e.target.value etc.
    const newValue = type === 'checkbox' ? checked : value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }


  render() {
    console.log(this.state.data)
    return (
      <div>
        <PlacesForm 
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default PlacesNew