  class apiResponse{
    constructor(statusCode,message="success",data ){
        this.statusCode=statusCode,
        this.message=message,
        this.data=data,
        this.success=statusCode<400//  diffrent type of status code show different error
    }
  }
  export {apiResponse}