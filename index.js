const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors');
const Admin = require('./models/admin');

const jwt = require('jsonwebtoken')
require('dotenv').config();



// Routes 
const projects = require('./routes/projects');

app.use(cors())
app.use(express.json())

// Database Connection

mongoose.connect(process.env.DATABASE_URL)
.then(result =>{
    console.log('Success');
})

app.listen(process.env.PORT);
app.use('/projects', projects)


app.get('/', (req, res) => {
        res.send('Good');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (!admin) {
      return res.status(404).json({ message: 'Admin does not Exist' });
    }
  
  
    // If the password does not match, return an error message
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  
    // Create a JWT token
    const token = jwt.sign(
      { id: admin._id},
      process.env.jwtSecret,
      { expiresIn: '1h' }
    );
  
    // Send the JWT token to the React frontend
    res.json({ token, name: admin.name });
  });

  
  // Protected route
  app.get('/admin', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
  
    // Verify the JWT token
    try {
      const decodedToken = jwt.verify(token, process.env.jwtSecret);
  
      if (decodedToken.isAdmin) {
        res.json({ message: 'You have access to the admin route' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
