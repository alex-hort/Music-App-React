import mongoose from 'mongoose';

const URI = process.env.MONGO_URI as string;

mongoose
.connect(URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})


export default mongoose;    