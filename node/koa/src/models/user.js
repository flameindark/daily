import mongoose, {Schema} from 'mongoose'

let schema =  new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', schema);