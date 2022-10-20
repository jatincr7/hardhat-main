import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import upload from "../helper/imageHelper.js"
import fs from "fs";

export const register = function (req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err)
      }
      else {
        var newUser = new User({
          hash_password: bcrypt.hashSync(req.body.password, 10),
          profileImg: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: 'image/png'
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
            console.log("error while savinf the user >>>>",err)
            return res.status(400).send({
              message: err
            });
          } else {
            user.hash_password = undefined;
            console.log("user>>>>>",user)
            return res.status(200).send(user);
          }
        
        });
      }
    
    })
  } catch (e) {
    console.log("sign in error >>>>>>", e)
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
      console.log('user >>>>>>',user)
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

