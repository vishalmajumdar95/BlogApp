const jwt = require('jsonwebtoken');

// GenerateToken
function generateToken(userdata) {
    return jwt.sign({ userdata }, process.env.SECRET_KEY, { expiresIn: '1h' })
}


// AuthenticateToken
function authenticateToken(req, res, next) {
    var authHeader = req.query.token || req.body.token || req.headers.cookie;
    var token = authHeader && authHeader.split('')[0]
    console.log(token)
    console.log(authHeader)
    if (token === undefined) {
        res.send({ "error": "token not found!" })
        next()
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.decode = decoded;
        next();
    } catch (error) {
        console.log(error, "Token error");
        req.Error = error.message
        next()
    }
};


module.exports = { generateToken, authenticateToken };