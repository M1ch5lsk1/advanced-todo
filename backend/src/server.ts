import app from './app';
import config from './config/config';
// import { run as connectToMongoDB } from './controllers/itemController';

// connectToMongoDB();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});