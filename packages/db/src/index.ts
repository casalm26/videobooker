import mongoose from 'mongoose';

export async function connectDatabase(uri: string) {
  if (!uri) {
    throw new Error('Mongo connection string is required');
  }

  await mongoose.connect(uri);
  return mongoose.connection;
}
