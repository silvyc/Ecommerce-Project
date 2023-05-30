import { startListening } from './app';
import { connectDatabase } from './database';

connectDatabase();
startListening();
