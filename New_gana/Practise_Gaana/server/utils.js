// function CreateResult(error, data) {
//     const result = {}
//     if (error) {
//       result['error'] = error
//       result['status'] = 'error'
//     } else {
//       result['status'] = 'success'
//       result['data'] = data
//     }
  
//     return result
//   }

  function CreateResult(error, data) {
    const result = {}
    if (error) {
      result['data'] = []
      result['message'] = 'error occured'
    } else {
      result['message'] = 'successful query'
      result['data'] = data
    }
  
    return result
  }
  
  function createError(error) {
    const result = {}
    result['error'] = error
    result['status'] = 'error'
  
    return result
  }
  
  module.exports = {
    CreateResult: CreateResult

  }
  