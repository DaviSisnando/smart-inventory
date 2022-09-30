// const mongoose = require('mongoose');
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL);

// mongoose.set( 'useNewUrlParser', true)
// mongoose.set( 'useUnifiedTopology', true,)
  
  mongoose.connection.on('error', (err) => {
    console.log('Database connection error: ', err)
  })
  
  mongoose.connection.on('disconnected', ()  => {
    console.log('Application disconnected from database!')
  })
  
  mongoose.connection.on('connected', () => {
    console.log('Application connected to the database!')
  });
  
  export default mongoose