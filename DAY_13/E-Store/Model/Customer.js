import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const CustomerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    address:{
        street:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
    },
    refreshToken:{type:String}
},{timestamps:true})

 CustomerSchema.pre('save', async function(next) {
        if (!this.isModified('password')) {
            return next();
        }
 
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
  });
  CustomerSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
 
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        } catch (error) {
            return next(error);
        }
    }
 
    next();
  });

  CustomerSchema.methods.comparePassword = async function(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
  };
 
  
 
export default mongoose.model('Customer',CustomerSchema)