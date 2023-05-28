import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: function (categories) {
          return categories?.length;
        },
      },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const productModel = model('product', productSchema);

export default productModel;
