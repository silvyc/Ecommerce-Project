import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    await mongoose.connect('mongodb+srv://cluster0.swmgm2y.mongodb.net/', {
      dbName: 'Cluster0',
      user: 'test',
      pass: 'test',
    });
    console.log('database connected');
  } catch (err) {
    console.log(err);
  }
}

export function disconnectDatabase() {
  mongoose.connection.close();
}
