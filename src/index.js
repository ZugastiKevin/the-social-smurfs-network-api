const express = require('express');
const mongoose = require('mongoose');
const smurfsRouters = require('./routers/smurfs_routers');
const smurfRouters = require('./routers/smurf_routers');

const app = express();
const PORT = process.env.PORT;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const dbCO = await mongoose.connect(
      process.env.MONGODB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    console.log(`MongoDB Connected: ${dbCO.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(express.json());

app.use('/api/smurfs', smurfsRouters);
app.use('/api/smurf', smurfRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Listening for requests');
  });
});
