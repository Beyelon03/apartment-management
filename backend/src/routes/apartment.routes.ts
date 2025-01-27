import { Router } from 'express';

import ApartmentController from '../controllers/apartment.controller';
import { createApartmentValidation, updateApartmentValidation } from '../middlewares/apartment.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

class ApartmentRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/create', createApartmentValidation(), validateRequest, ApartmentController.create);
    this.router.get('/', ApartmentController.getAll);
    this.router.get('/:id', ApartmentController.getById);
    this.router.patch('/:id',   ApartmentController.update);
    this.router.delete('/:id', ApartmentController.delete);
  }
}

export default new ApartmentRoutes().router;
