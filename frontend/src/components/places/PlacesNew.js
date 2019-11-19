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
        visited: false,
        categories: ['']
      }, 
      errors: {}
    }

    // this.options = [
    //   { value: 'eating_out', label: 'Eating Out' },
    //   { value: 'bar', label: 'Bar' },
    //   { value: 'club', label: 'Club' },
    //   { value: 'day_time', label: 'Day time' },
    //   { value: 'family', label: 'Family' },
    //   { value: 'sport', label: 'Sport' },
    //   { value: 'active', label: 'Active' },
    //   { value: 'gallery', label: 'Gallery' },
    //   { value: 'museum', label: 'Museum' },
    //   { value: 'shopping', label: 'Shopping' },
    //   { value: 'landmark', label: 'Landmark' },
    //   { value: 'culture', label: 'Culture' },
    //   { value: 'art', label: 'Art' },
    //   { value: 'historical', label: 'Historical' },
    //   { value: 'music', label: 'Music' },
    //   { value: 'hotel', label: 'Hotel' }


    // ]
    this.options


    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)

  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => this.setState( { categories: res.data } ))
      .catch(err => console.log(err))
    console.log(this.state.categories)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
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
      .catch(err => (this.setState({ errors: err.response.data.errors })))
  }


  render() {

    if (!this.state.data.categories) return null
    const { categories } = this.state
    console.log(categories)

    return (
      <div>
        <PlacesForm 
          data={this.state.data}
          errors={this.state.errors}
          options={categories}
          // options={this.state.data.categories.map(({ id, name }) => ({ value: id, label: name }))}
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