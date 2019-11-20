import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

import PlacesComment from './PlacesComment'

class PlacesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      place: null,
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const placeId = this.props.match.params.id
    // console.log(placeId)
    axios.get(`/api/places/${placeId}`)
      .then(res => this.setState({ place: res.data }))
      .catch(err => console.log(err))
  }

  isOwner() { 
    // return Auth.getPayload().sub === this.state.place.user.id
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.post(`/api/places/${placeId}/comments/`, { text: this.state.text }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ place: res.data, text: '' })
      })
      .catch(err => console.log(err))
  }

  handleDelete(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.delete(`/api/places/${placeId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/places'))
      .catch(err => console.log(err))
  }

  handleDeleteComment(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.delete(`/api/places/${placeId}/comments/${e.target.value}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ places: res.data })

      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.place) return null
    const { place } = this.state
    // console.log(place)
    return (
      <>
        <h1 className="place-show-header">{place.name}</h1>
        <div className="place-show-wrapper">
          <div className="place-detail">
            <img className="place-show-image" src={place.image} alt={place.name}/>
            {/* {place.description} */}
            <h2 className="place-show-categories">Categories</h2>
            {place.categories.map(cat => 
              <p className="place-show-cat-list" key={cat.id}>{cat.name}</p>
            )}

          <>
          <Link to={`/places/${place.id}/edit`}><button className="edit-place">Edit {place.name}</button></Link>
          <button className="delete-place" onClick={this.handleDelete}>Delete {place.name}</button>
          </>

          </div>
          <div>
            <h3 className="notes-header">Notes to Self</h3>
            <PlacesComment 
              place={place}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              value={this.state.text}
            />
 
            {place.comments.map(comment => 
              <div key={comment.id} className="note-header">
                note:
                <p>{comment.text}</p>
                {/* {this.isOwner() &&  */}
                {/* <button onClick={this.handleDeleteComment} value={comment.id}>x</button> */}
                {/* } */}
              </div>
            )}
          </div>
      
        </div>
      </>
    )
  }
}

export default PlacesShow