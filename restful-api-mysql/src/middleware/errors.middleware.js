module.exports = {
    error404: (req, res, next) => {
        res.status(404).send({ message: 'Route not found' });
    },
    error500: (err, req, res, next) => {
        res.status(500).send({ message: 'Internal server error' });
    }
};
