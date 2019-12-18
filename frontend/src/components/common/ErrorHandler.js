function errorHandler (err, req, res, next) {
  if (err.name === 'ValidationError') {
    const errors = {}

    for (const key in err.errors) {
      errors[key] = 'This field is required'
    }

    return res.status(422).json({ message: 'Unprocessable Entity', errors })
  }

  res.setStatus(500)
  next(err)

}

module.exports = errorHandler