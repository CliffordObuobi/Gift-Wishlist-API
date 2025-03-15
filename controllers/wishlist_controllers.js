import { WishlistModel } from "../models/wishlist_models.js";

import { addwishlistValidator } from "../validators/wishlist_validators.js";

// Add items they want as gifts

export async function addWishlist(req, res) {
  try {
      const wishlist = new WishlistModel({
          ...req.body,
          userId: req.user.userId,
      });
      await wishlist.save();
      res.status(201).json(wishlist);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

// See their personal wishlist.
export async function getWishlist(req, res) {
  try {
      const wishlists = await WishlistModel.find({ userId: req.user.userId });
      res.json(wishlists);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Remove items from their wishlist.
export async function deleteWishlist(req, res) {
  try {
      const wishlist = await WishlistModel.findById(req.params.id);
      if (!wishlist) {
          return res.status(404).json({ message: 'Wishlist item not found' });
      }
      if (wishlist.userId.toString() !== req.user.userId) {
          return res.status(403).json({ message: 'Forbidden' });
      }
      await WishlistModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Wishlist item deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}