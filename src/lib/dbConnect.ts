import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://vikashmishra8371:raXxlY7Qxp9RITrb@cluster0.ouwkxt4.mongodb.net/Hostle-Next?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Missing environment variable: MONGODB_URI');
}

let cachedClient: mongoose.Mongoose | null = null;
let isConnecting = false;

async function connectToDatabase() {
  if (cachedClient) {
    if (cachedClient.connection.readyState === 1) {
      console.log('Already connected to the database');
      return { client: cachedClient, db: cachedClient.connection };
    }
  }

  if (isConnecting) {
    console.log('Already connecting to the database');
    // Optionally, you might want to wait or retry here
    return new Promise((resolve, reject) => {
      const checkConnection = setInterval(() => {
        if (cachedClient?.connection.readyState === 1) {
          clearInterval(checkConnection);
          resolve({ client: cachedClient, db: cachedClient.connection });
        }
      }, 100);
    });
  }

  isConnecting = true;

  try {
    const client = await mongoose.connect(MONGODB_URI);

    cachedClient = client;
    console.log('Successfully connected to the database');
    return { client, db: client.connection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    // throw new Error('Error connecting to the database');
  } finally {
    isConnecting = false;
  }
}

export default connectToDatabase;
