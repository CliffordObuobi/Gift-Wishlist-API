import express from "express";
import wishlistRouter from "./routes/wishlist_route.js";
import router from "./routes/auth_routes.js"; 
import "dotenv/config";
import mongoose from "mongoose";

// Make the database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database is Connected");
    })
    .catch((error) => {
        console.error("Database connection error:", error); // Log the error
    });

// Create an Express app
const app = express();

// Use global middlewares
app.use(express.json());

// Use routes
app.use("/api/", wishlistRouter); // Mount wishlist routes with base URL
app.use("/auth", router); // Mount authentication routes with base URL

// Listen for incoming request
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Added space
});