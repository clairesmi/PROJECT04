import React from 'react'
import axios from 'axios'
import PlacesForm from '../places/PlacesForm'
import Auth from '../../lib/auth'


class PlaceEdit extends React.Component {
  constructor () {
    super()
    this.state = {
      data: {
        name: '',
        postcode: '',
        image: '',
        description: '',
        visited: false,
        categories: []
      }, 
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    const placeId = this.props.match.params.id
    axios.get(`/api/places/${placeId}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
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

  handleSubmit(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.put(`/api/places/${placeId}/`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/places/${res.data.id}`)
      })
      .catch(err => (this.setState({ errors: err.response.data.errors })))
  }


  render() {
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

export default PlaceEdit