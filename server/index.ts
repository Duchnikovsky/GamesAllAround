const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./utils/uploadthing";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.APP_PORT || 3001;

const authRoute = require("./routes/authRoutes");
const cartRoute = require("./routes/cartRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const categoriesRoute = require("./routes/categoriesRoutes");
const producentsRoute = require("./routes/producentsRoutes");
const productsRoute = require("./routes/productsRoutes");
const ordersRoute = require("./routes/ordersRoutes");

app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/dashboard", dashboardRoute);
app.use("/categories", categoriesRoute);
app.use("/producents", producentsRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute)

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      isDev: true,
    },
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
