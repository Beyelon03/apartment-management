import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import AppRoutes from './routes/app.routes';
import handleError from './middlewares/error.middleware';

dotenv.config();

class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/uploads', express.static('uploads'));
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api', AppRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(handleError);
  }

  private async connectToDatabase() {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error('MONGO_URI не определен.');
    }

    await mongoose.connect(dbUri);
    console.log('Подключено к MongoDB.');
  }

  public async start() {
    const port = process.env.PORT;
    if (!port) {
      throw new Error('PORT не определен.');
    }

    try {
      await this.connectToDatabase();
      this.app.listen(port, () => {
        console.log(`Сервер запущен: http://localhost:${port}.`);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Ошибка:', error.message);
      }
      process.exit(1);
    }
  }
}

const app = new App();
void app.start();
