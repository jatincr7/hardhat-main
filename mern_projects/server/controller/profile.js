import ImageHelper from '../helper/imageHelper.js'
import UserModel from '../models/user.js'

 const imageUpload =async function (req, res) {
    ImageHelper.single('image')
     const img = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
     try {
         const userProfile = await UserModel.updateOne({ email: req.body.email }, {
             $set: {
                 profileImg: {
                     data: req.file.buffer,
                     contentType: req.file.mimetype
                 }
             }
         })
         if (userProfile.nModified > 1) {
             return res.status(200).json({
            
                 success: true,
                 message: "Profile picture added successfully"
             })
         }
         return res.status(500).json({
             success: false,
             message: "Some error occured while uploading the profile picture"
         })
     } catch (e) {
         console.log('errrrrrrrrr>>>>>>>>>>>>>',e)
     }

    

 }

// router.post('/upload', upload.single('image'), async (req, res, next) => {
//     const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
//     const savedImage = await ImageModel.create(image);
//     res.send(savedImage);

export default imageUpload;