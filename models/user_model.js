import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
  
      },
      password: {
        type: String,
        required: true,
      },
}, {
    timestamps: true,
});

// Ecrypting the Password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      
    } catch (error) {
      return next (error);
    }
  });
  
  // comparing the passwords
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); 
  };

  export const UserModel = model('User', UserSchema);