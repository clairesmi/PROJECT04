import React from 'react'

class ImageUpload extends React.Component {
  constructor () {
    super()
    this.state = {
      image: null
    }

    this.handleUpload = this.handleUpload.bind(this)
  }

  // https://api.cloudinary.com/v1_1/dpmupgnig/image/upload
  // qpedrr5c - upload presets

  handleUpload({ target: { files } }) {
    const body = new FormData
    body.append('file', files[0])
    body.append('upload_preset', 'qpedrr5c')
    fetch('https://api.cloudinary.com/v1_1/dpmupgnig/image/upload', { method: 'POST', body, contentType: 'application/json' })
      .then(res => res.json())  
      .then(res => {
        console.log(this.props, 'props')
        this.setState(
          { image: res.secure_url },
          this.props.onChange({ target: { name: this.props.name, value: res.secure_url } })
        )
      })
  }

  render() {
    const { image } = this.state 
    // console.log(image, 'image')
    // console.log(this.state, 'iu')
    return (
      <>
      <input 
        type="file"
        placeholder="Place Image"
        id="files"
        name="image"
        onChange={this.handleUpload}
      />
      </>
    )
  }

}

export default ImageUpload