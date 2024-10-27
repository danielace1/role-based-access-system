import mongoose from "mongoose";
import Session from "../models/session.model.js";

const getUserRoleAndROleId = async (sessionId) => {
  const roleQuery = [
    {
      $match: { _id: new mongoose.Types.ObjectId(sessionId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    {
      $lookup: {
        from: "roles",
        localField: "user.role",
        foreignField: "_id",
        as: "role",
      },
    },
    {
      $unwind: "$role",
    },

    {
      $project: {
        _id: 1,
        role: "$role.name",
        roleId: "$role._id",
      },
    },
  ];

  const userRoleAndId = await Session.aggregate(roleQuery);
  console.log("Retrieved user roles:", userRoleAndId);
  return userRoleAndId;
};

export default getUserRoleAndROleId;
