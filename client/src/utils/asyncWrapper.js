const asyncWrapper = promise =>
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ error, data: null }))

export default asyncWrapper
