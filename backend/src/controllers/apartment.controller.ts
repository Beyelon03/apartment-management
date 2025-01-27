import { NextFunction, Request, Response } from 'express';
import ApartmentService from '../services/apartment.service';
import { uploadImages } from '../middlewares/multer.upload.middleware';

class ApartmentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const apartmentData = await ApartmentService.create(req.body, []);
      res.status(201).json(apartmentData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { minPrice, maxPrice, rooms } = req.query;
      const filters: { minPrice?: number; maxPrice?: number; rooms?: number } = {};
      if (minPrice) filters.minPrice = Number(minPrice);
      if (maxPrice) filters.maxPrice = Number(maxPrice);
      if (rooms) filters.rooms = Number(rooms);

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { apartments, total } = await ApartmentService.getAll(filters, page, limit);

      res.status(200).json({
        apartments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const apartment = await ApartmentService.getById(id);
      res.status(200).json(apartment);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      uploadImages(req, res, async () => {
        const files = Array.isArray(req.files) ? req.files : req.files?.['images'] || [];
        const { id } = req.params;
        const { removedImages, ...apartmentData } = req.body;

        const apartment = await ApartmentService.update(id, apartmentData, files, removedImages);

        res.status(200).json(apartment);
      });
    } catch (error) {
      next(error);
    }
  }


  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const apartment = await ApartmentService.delete(id);
      res.status(200).json(apartment);
    } catch (error) {
      next(error);
    }
  }
}

export default new ApartmentController();
