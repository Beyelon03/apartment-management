import { Router } from 'express';
import ApartmentRoutes from './apartment.routes';

class AppRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/apartments', ApartmentRoutes);
  }
}

export default new AppRoutes().router;
