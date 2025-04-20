import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
    });



    const uploadOnCloundinary = async(localFilePath) =>{
        try {
            if(!localFilePath)
                return null
            const resource = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
            console.log('File has been uploaded on cloudinary', resource)
            fs.unlinkSync(localFilePath)
            return resource
        } catch (error) {
            fs.unlinkSync(localFilePath)
            console.log('upload file failed in cloudinary')
            return null
        }
    }
    
    
 export {uploadOnCloundinary }
 