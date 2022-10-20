
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import UserModel from '../models/user.js';
const router = express.Router();
import ImageSchema from '../models/image.js';
import upload from "../helper/imageHelper.js"

// const upload = multer({ storage: storage });



export default router
