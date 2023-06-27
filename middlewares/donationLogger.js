module.exports = function (donation) {
    return function (req, res, next) {
        console.log(`${donation.donorName} donated ${donation.amount} at ${new Date()}\n ${donation.message}`);
        next();
    }
}


