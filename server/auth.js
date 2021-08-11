const jwt = require("jsonwebtoken");

// // middleware function for authentication
function verifyToken(req, res, next) {
  // get the token that JWT generates to verify this is the correct user and return that user in the post blog request
  const authenticatedToken = req.headers.authorization.split(" ")[1];
  // console.log(authenticatedToken);
  // console.log(authenticatedToken + " is working");
  // if (authenticatedToken === null) return res.sendStatus(401); // if null or undefined, return a 401 error
  // at this point we know we have a valid token, so we need to verify it
  try {
    const payLoad = jwt.verify(authenticatedToken, process.env.JWT_SECRET);
    req.userId = payLoad.userid;
    next();
  } catch {
    return res.sendStatus(403);
  }
}

module.exports = { verifyToken };
