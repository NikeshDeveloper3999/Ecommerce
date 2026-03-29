
const generateOTP = () => {
    return parseInt(Math.random() * 900000)
}


module.exports = { generateOTP }