import jwt from "jsonwebtoken"
import { apiError } from "../utils/apiError"
import { asyncHandler } from "../utils/asyncHandler"
import { User } from "../models/user.model"

export const verifyJWT = asyncHandler( async (req , res , next) =>{
    try {
        const token = req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer", "")
    
        if(!token)
        {
            throw new apiError(401,"Un authorized access error")
        }
    
      const decodeToken =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
       if(!user)
        {
            throw new apiError(401,"Un authorized access error")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new apiError(401,"Un authorized access error in catch")
    }


})