import React from 'react'

class ImageUpload extends React.Component {
  constructor () {
    super()
    this.state = {
      image: null,
      loading: false
    }

    this.handleUpload = this.handleUpload.bind(this)
  }

  // https://api.cloudinary.com/v1_1/dpmupgnig/image/upload - url for image locations
  // qpedrr5c - upload presets

  handleUpload({ target: { files } }) {
    this.setState({ loading: true }, () => {
      const body = new FormData
      body.append('file', files[0])
      body.append('upload_preset', 'qpedrr5c')
      fetch('https://api.cloudinary.com/v1_1/dpmupgnig/image/upload', { method: 'POST', body, contentType: 'application/json' })
        .then(res => res.json())  
        .then(res => {
          console.log(this.props, 'props')
          this.setState(
            { image: res.secure_url, loading: false },
            this.props.onChange({ target: { name: this.props.name, value: res.secure_url } })
          )
        })
    })
  }

  render() {
    const { image, loading } = this.state
    return (
      <>
      {(image || loading ) ? 
        <div className="image-upload">
          {image ? 
            <img src={image} className="image-preview"/>
            :
            <div className="loading-spinner">Loading</div>
          }
        </div>
        :
      <>
      <input 
        type="file"
        placeholder="Place Image"
        id="files"
        name="image"
        onChange={this.handleUpload}
      />
      </>
      }
    </>
    )
  }

}

export default ImageUpload