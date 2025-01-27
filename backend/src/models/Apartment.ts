import { model, Schema } from 'mongoose';
import { Apartment } from '../inerfaces/apartment.interface';

const apartmentSchema = new Schema<Apartment>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 90,
    },
    description: {
      type: String,
      required: true,
      maxlength: 335,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rooms: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const ApartmentModel = model<Apartment>('Apartment', apartmentSchema);

export default ApartmentModel;
