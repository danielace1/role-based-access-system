import jwt from "jsonwebtoken";

const middelware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "You are not allowed to access this resource" });
      }

      next();
    });
  };
};

export default middelware;
