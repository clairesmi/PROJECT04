import React from 'react'
import axios from 'axios'
import PlacesForm from './PlacesForm'
import Auth from '../../lib/auth'

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
      categories: [''],
      errors: {}
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)

  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => this.setState( { categories: res.data } ))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleCheck({ target: { name, value, type, checked } }) { // destructured const name = e.target.value etc.
    const newValue = type === 'checkbox' ? checked : value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }

  handleMultiSelect(selected) {
    if (!selected) {
      return this.setState({ data: { ...this.state.data, categories: [] } })
    }
    const data = { ...this.state.data, categories: selected.map(sel => sel.id) }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/places', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/places/${res.data.id}`)
      })
      .catch(err => this.setState({ errors: err.message }))
    // console.log(this.state)
  }


  render() {
    if (!this.state.categories) return null
    const { categories, data, errors } = this.state
    console.log(errors)
    // console.log(categories)
    return (
      <div className="create-page-wrapper">
        <PlacesForm 
          data={data}
          errors={errors}
          options={categories}
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          handleSubmit={this.handleSubmit}
          handleMultiSelect={this.handleMultiSelect}
        />
      </div>
    )
  }
}

export default PlacesNew