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
    created_date: Date
})

models.Post = mongoose.model('Post', postSchema)

export default models