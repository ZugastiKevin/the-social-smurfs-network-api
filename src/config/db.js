const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    moongoose.set('strictQuery', false);
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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Listening for requests');
  });
});
