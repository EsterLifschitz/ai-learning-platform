const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');
const apiRoutes = require('./src/routes/api.js');
const errorHandler = require('./src/middleware/errorHandler.js');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());  
 
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'AI Learning Platform API is running successfully!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});