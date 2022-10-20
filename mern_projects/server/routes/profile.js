
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import UserModel from '../models/user.js';
const router = express.Router();
import ImageSchema from '../models/image.js';
import upload from "../helper/imageHelper.js"

// const upload = multer({ storage: storage });

router.post('/profile', async (req, res, next) => {
    try {
        // upload(req, res, (err) => {
        //     if(err){
        //         console. log (err)
        //     }
        //     else{
        //         // console.log("req.file : ", req.file.filename)
        //         const newImage = new ImageSchema({
        //             name: req.body.name,
        //             image: {
        //                 data:req.file.filename,
        //                 contentType: 'image/png'
        //             }
        //         })
        //         newImage.save()
        //         .then(() => {
        //             return res.status(200).json({
        //                 success: true,
        //                 message: "Profile picture added successfully"
        //             })
        //         })
        //     }
        // })

        // console.log("file\>>>>>>>>111111", req.file);
        // let { email } = req.query
        // let profileImg = {}
        // profileImg.data = fs.readFileSync(req.file.buffer)
        // profileImg.contentType=req.file.mimetype
        // const user = await UserModel.findOne({email })
        // console.log('user!!!',user)
        // const userProfile = await UserModel.updateOne({ email }, {
        //     $set: {
        //         profileImg
        //     }
        // })
        // console.log('updated>>>>>',userProfile)
        // if (userProfile.nModified) {
        //     return res.status(200).json({
            
        //         success: true,
        //         message: "Profile picture added successfully"
        //     })
        // }
    } catch (e) {
        console.log('error ',e)
    }
        
        
        
        // return res.status(500).json({
        //     success: false,
        //     message: "Some error occured while uploading the profile picture"
        // })
    
});

export default router
