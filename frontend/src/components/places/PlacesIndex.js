import React from 'react'
import axios from 'axios'
import PlacesMap from '../places/PlacesMap'
import PlacesCard from '../places/PlacesCard'

class PlacesIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      places: null,
      mapShow: true, 
      search: '',
      placeChosen: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleUncheck = this.handleUncheck.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get('/api/places')
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err))
  }

  handleCheck() {
    this.setState({ mapShow: false })
  }

  handleUncheck() {
    this.setState({ mapShow: true })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  filteredPlaces() {
    const { places, search } = this.state
    const re = new RegExp(search, 'i')
    return places.filter((place) => {
      return re.test(place.postcode)
    })
  }

  render() {
    if (!this.state.places) return null
    // const { places, categories } = this.state
    
    // console.log(categories)
    return (
      <>
      <div>

        {!this.state.mapShow &&
        <>

      {/* <div>{this.filteredCategories().map(category => 
        <CategoriesCard key={category.id} {...category} />
      )}
      </div> */}

      <h1>Your Places</h1>
        <h2>Search by postcode</h2>

<input
  placeholder="Search"
  onChange={this.handleChange}
  name="search"
/>



        <h2>Switch to map view</h2>
        <input 
          type='checkbox'
          name='mapSwitch'
          onChange={this.handleUncheck} 
        />
        <div>
          {this.filteredPlaces().map(place => 
            <PlacesCard key={place.id} {...place} />
          )}
        </div>
        </>
        }
        {this.state.mapShow &&
          <div>
            <h2>Switch to list view</h2>
            <input 
              type='checkbox'
              name='mapSwitch'
              onChange={this.handleCheck} 
            />
            <PlacesMap />
          </div>
        }
      </div>
      </>
    )
  }

}

export default PlacesIndex