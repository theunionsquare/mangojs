import "reflect-metadata";
import { ServerBuilder } from "@theunionsquare/mangojs-core";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerJson from "../swagger.json";
import { routes } from "./routes";

dotenv.config();

// set microservice port
const PORT = Number(process.env.PORT) || 3010;

// set express cors options
let corsOptions = {
  allowedOrigins: ["http://localhost:3080", "http://localhost:3090"],
  credentials: true,
};

// cors
const corsOriginFunction = function (origin, callback) {
  // allow requests with no origin
  // (like mobile apps or curl requests)
  if (!origin) return callback(null, true);
  if (corsOptions.allowedOrigins.indexOf(origin) === -1) {
    var msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
    return callback(new Error(msg), false);
  }
  return callback(null, true);
};

///////////////////
// PREPARE SERVER
const applicationServer = new ServerBuilder()
  .setName("server-name")
  .setPort(PORT)
  .setUserAuthentication(true)
  .setRoutes(routes)
  .enableSwagger(true)
  .setSwaggerSpec(swaggerJSDoc(swaggerJson))
  .expressUse(helmet())
  .expressUse(
    cors({
      origin: corsOriginFunction,
      credentials: corsOptions.credentials,
    })
  )
  .expressUse(cookieParser())
  //.setCheck(applicationPreCheck) // set pre-checks
  .build(); // build

///////////////////
// START SERVER
applicationServer
  .then((appExpress) => {
    appExpress.run();
  })
  .catch((err) => {
    console.log({ err }, "ERROR STARTING SERVER");
  });
