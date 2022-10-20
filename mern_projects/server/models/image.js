import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name : { type : String, require : true },
    image: { data: Buffer, contentType: String }
});

const ImageSchema = mongoose.model('ImageSchema',imageSchema)


export default ImageSchema;