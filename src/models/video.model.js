import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoSchame : {
        type: String,
        reuired : true
    },
    thumbnail : {
        type: String,
        reuired : true
    },
    title: {
        type: String,
        reuired : true
    },
    description: {
        type: String,
        reuired : true
    },
    duration: {
        type: Number,
        reuired : true
    },
    view:{
        type: Number,
        default :0
    },
    ispublished : {
        type : Boolean,
        default: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamp : true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)