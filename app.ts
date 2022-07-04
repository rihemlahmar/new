import dotenv from "dotenv";
dotenv.config();
import multer  from'multer'
import express from "express";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./src/routes/index";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/profile', express.static('upload/images'));
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api',routes.dbRouter)
app.use('/api',routes.authRouter)
app.use('/api',routes.companyRouter)
app.use('/api',routes.packRouter)
app.use('/api',routes.moduleRouter)
app.use('/api',routes.featureRouter)
app.use('/api',routes.adminRouter)
app.use('/api',routes.codeRouter)

//Swagger Doc
app.use("/api-swagger-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database
import "./config/database";

// server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
