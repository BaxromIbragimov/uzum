function apiResponse(res, statusCode , data, error, pagiantion) {
    const response = {
        data: data || null,
        error: null,
        pagiantion: pagiantion || null,
        date:new Date
    }
    res.status(201).json(response)
}
module.exports=apiResponse