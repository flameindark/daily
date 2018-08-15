import mongoose, {Schema} from 'mongoose'

let schema =  new Schema({
  name: String,
  password: String
});

export default mongoose.model('User', schema);