import mongoose, {Schema} from 'mongoose'

let schema =  new Schema({
  id: Schema.Types.ObjectId, 
  content: String,
  title: String,
  createTime: { type: Date, default: Date.now },
  tags: [String],
  category: [String],
  readNum: Number
});

export default mongoose.model('Article', schema);