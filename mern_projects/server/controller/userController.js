import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import upload from "../helper/imageHelper.js"
import fs from "fs";

export const register = function (req, res) {
  try {
  
    upload(req, res, async (err) => {
      if (err) {

      }
      else {
        if (['image/jpeg', 'image/png', 'image/jpg'].includes(req.file.mimetype)) {
        var newUser = new User({
          hash_password: bcrypt.hashSync(req.body.password, 10),
          profileImg: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: req.file.mimetype
          },
          email: req.body.email
        });
        const isUserExist = await User.findOne({ email: req.body.email })
        if (isUserExist) {
          return res.status(401).send({
            message: "User with this email already exist "
          });
        }
        await newUser.save(function (err, user) {
          if (err) {
           
            return res.status(400).send({
              message: err
            });
          } else {
            user.hash_password = undefined;
            return res.status(200).send(user);
          }
        
        });
        }
        else {
          return res.status(400).send({
            message: "Only file with extension jpg or png is allowed"
          });
        }
        
      }
    
    })
  } catch (e) {
  
  }
}

export const signIn = function (req, res) {
  try {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      
      return res.status(200).json({ token: jwt.sign({ email: user.email},'BUZZINGO',{
        expiresIn: "2h",
      }), data: user });
    });
  } catch (e) {
    console.log(" some error occured whilelogin ", e);
    return res.status(500).json({
      message:"Internal Server error"
    })
  }
  };

