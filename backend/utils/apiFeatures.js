class ApiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    // API ka search feature
    search(){
        const keyword = this.queryString.keyword
        ?{
            // search is implemented on only name of the product 
            name:{
                $regex:this.queryString.keyword,
                $options:"i", // i is for case senstive it will search for capital and smallcase letter 
            },
        }
        :{};
        // this.query === Product.find
        this.query = this.query.find({...keyword});
        return this; // return this class
    }
    // API ka filter feature
    filter(){
        const queryCopy = {...this.queryString};

        // remove some fields from category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        //filter for price
        let queryStr = JSON.stringify(queryCopy); // convert object into string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        // this.query === Product.find
        this.query = this.query.find(JSON.parse(queryStr));

       
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
}

module.exports = ApiFeatures;