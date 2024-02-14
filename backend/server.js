import express from "express"
const app = express();
import dotenv from "dotenv"
dotenv.config()
import colors from "colors"
import cors from "cors";
app.use(cors());
import connectDB from "./config/db.js";
connectDB();
import {errorHandler} from './middleware/errorMiddleware.js'


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
import productRoutes from "./routes/productRoutes.js";
app.use("/api/product", productRoutes);
import cartRoutes from "./routes/cartRoutes.js";
app.use("/api/cart", cartRoutes);
import orderRoutes from "./routes/orderRoutes.js"
app.use('/api/order', orderRoutes);



// // Next js is a server side language and cannot be static
// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// }
// else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.bold));
