const { toast } = require("react-toastify")

function handleAuthErrorsWithToasts(res) {
    if ('msg' in res && res.msg === "token does not exist in middleware") toast.warn('You must be logged in to access that route!')
    else if ('err' in res && res.err.name === "TokenExpiredError") toast.warn('Your session expired. Please log in again.')
    else if ('msg' in res) toast.error(res.msg)
    else toast.error('An error occured... The server did not respond with the proper data. Try logging in again.')
}

module.exports = {
    handleAuthErrorsWithToasts
}