const roleConfig = {
  "/api/admin": ["superadmin", "admin"], 
  "/api/user": ["user", "admin", "superadmin"], 
  "/api/superadmin": ["superadmin"],
  "/api/users": ["superadmin", "admin"], 
  "/api/user/:id": ["superadmin", "admin", "user"], 
  "/api/admin/data": ["superadmin", "admin"],
  "/api/user/:id": ["superadmin", "admin"], 
};

export default roleConfig;
