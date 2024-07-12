import jwt from "jsonwebtoken";

//  for all routes protect

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWTKEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ status: 401, message: "UnAuthorized token" });
    }
    req.user = user;

    next();
  });
};

export default authMiddleWare;
