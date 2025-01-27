import ApartmentRepository from '../repositories/apartment.repository';
import { ApiError } from '../exceptions/api.error';
import { Apartment } from '../inerfaces/apartment.interface';

class ApartmentService {
  async create(apartment: Apartment, files: Express.Multer.File[]): Promise<Apartment> {
    try {
      const imagePaths = files ? files.map((file) => file.path) : [];
      const newApartment = await ApartmentRepository.create({ ...apartment, images: imagePaths });

      if (!newApartment) {
        throw ApiError.BadRequest('Не удалось создать квартиру.');
      }

      return newApartment;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при создании квартиры.');
    }
  }

  async getAll(
    filters: { minPrice?: number; maxPrice?: number; rooms?: number },
    page: number,
    limit: number,
  ): Promise<{ apartments: Apartment[]; total: number }> {
    try {
      const { apartments, total } = await ApartmentRepository.getAll(filters, page, limit);

      if (apartments.length === 0) {
        throw ApiError.NotFound('Квартиры по заданным фильтрам не найдены.');
      }

      return { apartments, total };
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении списка квартир.');
    }
  }

  async getById(id: string): Promise<Apartment> {
    try {
      const apartment = await ApartmentRepository.getById(id);
      if (!apartment) {
        throw ApiError.NotFound(`Квартира с ID ${id} не найдена.`);
      }
      return apartment;
    } catch (error) {
      throw ApiError.InternalServerError(`Ошибка при получении квартиры с ID ${id}.`);
    }
  }

  async update(id: string, apartment: Apartment, files: Express.Multer.File[], removedImages?: string[]): Promise<Apartment | null> {
    try {
      const existingApartment = await ApartmentRepository.getById(id);
      if (!existingApartment) {
        throw ApiError.NotFound(`Квартира с ID ${id} не найдена.`);
      }

      const newImagePaths = files ? files.map((file) => file.path) : [];
      const updatedImages = removedImages
        ? existingApartment.images.filter((img) => !removedImages.includes(img))
        : existingApartment.images;

      const updatedData = {
        ...apartment,
        images: [...updatedImages, ...newImagePaths],
      };

      await ApartmentRepository.update(id, updatedData);

      const updatedApartment = await ApartmentRepository.getById(id);
      return updatedApartment!;
    } catch (error) {
      console.error('Ошибка при обновлении квартиры:', error);
      throw ApiError.InternalServerError('Ошибка при обновлении квартиры.');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const existingApartment = await ApartmentRepository.getById(id);
      if (!existingApartment) {
        return { message: `Квартира с ID ${id} не найдена.` };
      }

      await ApartmentRepository.delete(id);
      return { message: 'Квартира успешно удалена.' };
    } catch (error) {
      throw ApiError.InternalServerError(`Ошибка при удалении квартиры с ID ${id}.`);
    }
  }
}

export default new ApartmentService();
