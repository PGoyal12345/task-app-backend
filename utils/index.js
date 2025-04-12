const respondWithError = (err, response, statusCode) => {
    console.log('error occured', err);
    response.status(statusCode).json({error: err});
}

const getDate = (date) => {
    if(date){
        return date.toString()
    }else{
        return new Date().toString();
    }
}

module.exports = {
    respondWithError,
    getDate
}