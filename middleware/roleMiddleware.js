import roleConfig from "../config/roleConfig.js";
import getUserRoleAndROleId from "../services/userRoleService.js";

async function checkMiddleware(req, res, next) {
  try {
    const sessionId = req.headers["id"];
    console.log("Request Headers:", req.headers);

    if (!sessionId) {
      return res.status(401).json({ message: "No session ID provided" });
    }

    const userRoles = await getUserRoleAndROleId(sessionId);
    const requestedFullPath = req.originalUrl;
    console.log("Requested Full Path:", requestedFullPath);

    console.log("Requested Base URL:", req.baseUrl);

    const allowedRoles = roleConfig[requestedFullPath] || [];

    console.log("Allowed Roles:", allowedRoles);
    if (userRoles.length > 0 && allowedRoles.includes(userRoles[0].role)) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export default checkMiddleware;
