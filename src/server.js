import mongoose from 'mongoose';
import app from './app.js';
import config from './app/config/index.js';


async function startServer() {
    try {
        await mongoose.connect(config.database_url);
        console.log('Connected to MongoDB');
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:3000`);
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1);
    }
}
startServer();