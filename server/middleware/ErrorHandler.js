const errorHandler = (req, res) => {
    res.status(400).send("Something went wrong, Please try again")
}
module.exports = errorHandler