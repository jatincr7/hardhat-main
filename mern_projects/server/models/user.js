import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
const UserSchema =mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  profileImg:
  {
    data: Buffer,
    contentType: String
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', UserSchema);
export default User;
 
