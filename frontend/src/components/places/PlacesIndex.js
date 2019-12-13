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
    this.setState({ mapShow: !this.state.mapShow })
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

    return (
      <>
        {!this.state.mapShow &&
         <div className="place-index-page-wrapper">
        <>
        <div className="your-places">Your Places</div>
        <div className="place-index-controls">
          <input className='postcode-search'
            placeholder="search by postcode"
            onChange={this.handleChange}
            name="search"
          />
          <h2 className='mapheaders'>switch to map view
            <input className="maptoggle"
              type='checkbox'
              name='mapShow'
              onChange={this.handleCheck} 
            />
          </h2>
        </div>
            <div className="card-wrapper">
              {this.filteredPlaces().map(place => 
                <PlacesCard key={place.id} {...place} />
              )}

            </div>
        </>
         </div>
        }
        {this.state.mapShow &&
        <>
                  <div className="place-index-controls-map">
                    <h2 className='mapheaders'>switch to list view
                      <input className='maptoggle'
                        type='checkbox'
                        name='mapShow'
                        onChange={this.handleCheck} 
                      />
                    </h2>

                  </div>
        <div className="place-index-page-wrapper-map">
          <PlacesMap />
        </div>
        </>
        }
      </>
    )
  }

}

export default PlacesIndex