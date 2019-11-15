import React from 'react'
import MapGL, { GeolocateControl, NavigationControl, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'

class PlacesIndex extends React.Component {
  constructor() {
    super()

    this.state = { 
      places: null,
      postcodes: null,
      // searchTerm: '',

      viewport: {
        latitude: 51.5176,
        longitude: -0.1145,
        zoom: 11
      },
      showPopup: true
    }
  }


  componentDidMount() {
    axios.get('api/places')
      .then(res => {
        this.setState({ places: res.data })
        this.mapPostcodes()
      })
      .catch(err => console.log(err))
  }


  mapPostcodes() {
    const postcodes = this.state.places.map(place => place.postcode.replace(' ', ''))
    axios.post('https://api.postcodes.io/postcodes/', { postcodes } )
      .then(res => this.setState({ postcodes: res.data.result }))
      .catch(err => console.log(err))
  }
  


  render() {
    if (!this.state.places) return null
    if (!this.state.postcodes) return null
    const places = this.state.places
    const postcodes = this.state.postcodes
    // console.log(places)
    console.log(this.state.postcodes)
    return (
      <main className='map'>
        <div className='mapArea'>
          <MapGL
            mapboxApiAccessToken={'pk.eyJ1IjoiY2xhaXJlc21pdGgiLCJhIjoiY2syYWEwdTd5Mmh5cDNnbXozM3IyMDJ5dyJ9.td0T2VdcfVsCpW1Hc5x6jg'}
            height={'100vh'}
            width={'100vw'}
            mapStyle="mapbox://styles/mapbox/light-v10"
            scrollZoom={true}
            minZoom={0}
            maxZoom={20}
            touchZoom={true}


            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}>

            <GeolocateControl 
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />

            <div>

              {postcodes.map((postcode, i) => (
                <div key={i}>
                  {<Popup

                    latitude={postcode.result.latitude}
                    longitude={postcode.result.longitude}
                    closeButton={false}
                    closeOnClick={true}
                    tipSize={12}
                    sortByDepth={true}
                    anchor="bottom" >


                    {places.map(place =>
                      <div key={place.id}>
                        {place.postcode.replace(' ', '') === postcode.query ? <Link to={`/places/${place.id}`}>
                          {place.name} * {place.postcode} </Link> : null}

                      </div>)}

                  </Popup>}

                </div>
              ))}

            </div>
            <div style={{ position: 'absolute', right: 0 }}>
              <NavigationControl />
            </div>
          </MapGL>
        </div>
        
      </main>
    )
  }
}

export default PlacesIndex
