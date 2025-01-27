import { Model } from 'mongoose';
import ApartmentModel from '../models/Apartment';
import { Apartment } from '../inerfaces/apartment.interface';

class ApartmentRepository {
  private readonly apartmentModel: Model<Apartment>;

  constructor(model: Model<Apartment>) {
    this.apartmentModel = model;
  }

  async create(apartment: Apartment): Promise<Apartment> {
    return await this.apartmentModel.create(apartment);
  }

  async getAll(
    filters: { minPrice?: number; maxPrice?: number; rooms?: number },
    page: number,
    limit: number,
  ): Promise<{ apartments: Apartment[]; total: number }> {
    const query: any = {};

    if (filters.minPrice) query.price = { ...query.price, $gte: filters.minPrice };
    if (filters.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice };
    if (filters.rooms) query.rooms = filters.rooms;

    const apartments = await this.apartmentModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.apartmentModel.countDocuments(query);
    return { apartments, total };
  }

  async getById(id: string): Promise<Apartment | null> {
    return this.apartmentModel.findById(id);
  }

  async update(id: string, apartment: Apartment): Promise<Apartment | null> {
    return this.apartmentModel.findByIdAndUpdate(id, apartment, { new: true });
  }

  async delete(id: string): Promise<Apartment | null> {
    return this.apartmentModel.findByIdAndDelete(id);
  }
}

export default new ApartmentRepository(ApartmentModel);
