import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser =  asyncHandler( async (req,res) =>{
   //get data from user
   // user name , password, avatar, first name, email
   // validation
   //check if user exist: username and email
   // check for images and avatar
   //if available then upload then cloudinary
   //save cloudinary url to image and avatar
   //create user object- create entry in db
   //remove pass and refresh token from response 


   const {fullName, email, password, username} = req.body
   console.log('',fullName, email, password, username)
   if(
    [fullName , username,password,email].some((field) =>{
        return field?.trim ===""
    })
   )
   {
    throw new apiError(400,"All field required")
   }

//  const existingUser =  User.findOne({
//     $or : [{username} , {email}]
//    })
const existingUser = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
  // console.log('existing user',existingUser )
   if(existingUser)
   {
    throw new apiError(409,"User exist")
   }

   const localPathAvatar = req.files?.avatar[0]?.path
  // const localPathCoverImage = req.files?.coverImage[0]?.path
  let localPathCoverImage ;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0)
  {
    localPathCoverImage = req.files?.coverImage[0]?.path
  }
   if(!localPathAvatar)
   {
    throw new apiError(409,"Please send avatar")
   }
   const avatar  = await uploadOnCloundinary(localPathAvatar)
   const coverImage  = await uploadOnCloundinary(localPathCoverImage)
   if(!avatar)
   {
    throw new apiError(409,"Please send avatar")
   }

   const user = await User.create(
    {
        fullName,
        avatar: avatar.url,
        coverImage : coverImage?.url,
        email,
        password,
        username :  username.toLowerCase()
    }
   )
   const createdUser = await User.findById(user._id).select("-password -refresToken")

   if(!createdUser)
   {
    throw new apiError(409,"User not created")
   }
  return res.status(201). json(
    new apiResponse(200, createdUser, "User Created successfully")
  )

}

)


export {registerUser}