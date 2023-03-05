import User from "../models/User.js"

  export const pagination =  function paginatedResults(model) {
    return async (req, res, next) => {

      const { page = 1, limit = 10 } = req.query;
    
      const startIndex = (page - 1)*limit
      const endIndex = page * limit
    
      const results = {}
      if(endIndex < await model.countDocuments().exec()){
        results.next = {
          page: page + 1,
        limit: limit 
        }
      }
      if(startIndex > 0){
        results.previous = {
          page: page - 1,
        limit: limit
        }
      }
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec() 
        // res.paginatedResults = results
        res.json(results)
        next();
      } catch (error) {
        next(error);
      }
      };
    
  } 