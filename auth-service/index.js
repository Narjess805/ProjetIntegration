require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/connection');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

