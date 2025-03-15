import { model, Schema } from "mongoose";

const wishlistSchema = new Schema(
  { 
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,

    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    storeLink: { type: String, required: true, unique: false},
  },
  {
    timestamps: true,
  }
);

export const WishlistModel = model("Wishlist", wishlistSchema);
