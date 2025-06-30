const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Added CORS package
const rateLimit = require('./src/middleware/rateLimit');
const userRoutes = require('./src/routes/users');
const propertyRoutes = require('./src/routes/properties');
const commercialRoutes = require('./src/routes/commercial');
const inquiryRoutes = require('./src/routes/inquiries');
// app.js
//const dbTestRouter = require('./routes/dbTest');
//app.use('/db-test', dbTestRouter);

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Use env variable or default
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
app.use(express.json());
app.use(rateLimit);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/commercial', commercialRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));