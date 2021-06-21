const { toast } = require("react-toastify")

function handleAuthErrorsWithToasts(res) {
    if ('msg' in res && res.msg === "token does not exist in middleware") toast.warn('You must be logged in to access that route!')
    else if ('err' in res && res.err.name === "TokenExpiredError") toast.warn('Your session expired. Please log in again.')
    else if ('msg' in res) toast.error(res.msg)
    else toast.error('An error occured... The server did not respond with the proper data. Try logging in again.')
}

function clickLastRememberedSortButton() {
    const lastBtn = document.querySelector(`.${localStorage.sort}`)
    const btnSortNew = document.querySelector('.btn-sort-new')
    setTimeout(() => {
        if (lastBtn) {
            if (lastBtn.classList.contains('btn-sort-mark') && lastBtn.style.display === 'none') {
                return btnSortNew.click()
            }
            // console.log('going to click last button: ', lastBtn, 'in two seconds....');
            return lastBtn.click()
        }
        btnSortNew.click()
    }, 25)
}

module.exports = {
    handleAuthErrorsWithToasts,
    clickLastRememberedSortButton
}