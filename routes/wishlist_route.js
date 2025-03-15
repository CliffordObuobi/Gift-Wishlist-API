import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
} from "../controllers/wishlist_controllers.js";
import { addwishlistValidator } from "../validators/wishlist_validators.js";
import {authenticateToken} from "../middleware/auth_middleware.js"


// Create the wishlist Router
const wishlistRouter = Router();

// Define the routes
wishlistRouter.post("/wishlist", authenticateToken, async (req, res, next) => {
    const { error, value } = addwishlistValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
}, addWishlist);

wishlistRouter.get("/wishlist", authenticateToken, getWishlist);

wishlistRouter.delete("/wishlist/:id", authenticateToken, deleteWishlist);

// export the router
export default wishlistRouter;