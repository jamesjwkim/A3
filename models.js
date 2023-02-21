import mongoose from 'mongoose';

let models = {}

console.log("connecting to mongoDB")
// TODO: Copy your mongodb connection string here
// and make sure you are connecting to the right database in it
//await mongoose.connect('mongodb://localhost:27017/webShare')
//await mongoose.connect('mongodb+srv://jamesjwkim:james1234@cluster0.jehfpav.mongodb.net/websiteSharer)
await mongoose.connect('mongodb+srv://jamesjwkim:james1234@cluster0.jehfpav.mongodb.net/websiteSharer?retryWrites=true&w=majority')
console.log("successfully connected to mongodb")

const postSchema = new mongoose.Schema({
    url: String,
    description: String,
    username: String,
    likes: [String],
    created_date: Date
})

models.Post = mongoose.model('Post', postSchema)

const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    post: {type: mongoose.Schema.Types.ObjectId, ref:"Post"},
    created_date: Date
})

models.Comment = mongoose.model('Comment', commentSchema)

export default models