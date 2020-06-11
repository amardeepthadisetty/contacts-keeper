const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg : 'No token. Authorization failed'});
        
    }

    try {
        const decodedResult = jwt.verify(token, config.get('jwtSecret') );

        req.user = decodedResult.user;
        next();
        
    } catch (error) {
        console.log("res is: ", error);
        return res.status(401).json({ msg: 'No token. Authorization failed' });
    }

}