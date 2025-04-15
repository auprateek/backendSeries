import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        index: true,
        trime: true,
        lowercase : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        trime: true,
        lowercase : true
    },
    fullName :
    {
        type : String,
        required : true,
        unique : true,
        index: true,
        trime: true,
    },
    avatar : {
        type: String,
        required: true
    },
    coverImage:  {
        type: String,
    },
    watchHistory: [{
        type: Schema.type.ObjectId,
        ref : "Video"
    }],
    password:{
        type: String,
        required: [true,'Passowrd is required']

    },
    refreshToken : {
        type: String
    }
},
{
    timestamps: true
}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password, this.password,)
}

userSchema.methods.generateAccessToken = function(){
    jsonwebtoken.sign({
        _id: this._id,
        email : this.email,
        userName = this.userName,
        fullName = this.fullName

    }, process.env.ACCESS_TOKEN_SECRET , {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}


userSchema.methods.generateRefreshToken = function(){
    jsonwebtoken.sign({
        _id: this._id,

    }, process.env.REFRESH_TOKEN_SECRET , {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema)