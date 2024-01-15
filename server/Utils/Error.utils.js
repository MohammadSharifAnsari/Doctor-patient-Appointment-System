
class appError extends Error{

    constructor(errorMessage,errorStatus){
      super(errorMessage);
     this.statusCode=errorStatus;

     Error.captureStackTrace(this,this.constructor);
     
    }
               
             
            
};

export default appError;
