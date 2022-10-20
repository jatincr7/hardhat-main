import express from 'express';
const router = express.Router();
import {signIn,register} from '../controller/userController.js'

router.post('/sign-up', register)
router.post('/sign-in',signIn)


export  default router 