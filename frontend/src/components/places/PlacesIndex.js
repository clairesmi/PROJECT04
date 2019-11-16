import React from 'react'
import axios from 'axios'
import PlacesMap from '../places/PlacesMap'
import PlacesCard from '../places/PlacesCard'

class PlacesIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      places: null,
      mapShow: true
    }

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

  render() {
    if (!this.state.places) return null
    const { places } = this.state
    console.log(places)
    return (
      <>
      <div>
        {!this.state.mapShow &&
        <>
        <h1>Your Places</h1>
        <h2>Switch to map view</h2>
        <input 
          type='checkbox'
          name='mapSwitch'
          onChange={this.handleUncheck} 
        />
        <div>
          {places.map(place => 
            <PlacesCard key={place.id} {...place} />
          )}
        </div>
        </>
        }
        {this.state.mapShow &&
          <div>
            <h1>Your Places</h1>
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