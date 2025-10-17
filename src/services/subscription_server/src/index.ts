import "reflect-metadata";
import { DefaultContainer } from "./inversify.config";
import { Types, INVERSITY_TYPES, ServerBuilder } from "@giusmento/mangojs-core";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerJson from "../swagger.json";
import { routes } from "./routes";

dotenv.config();

// Server Configuration
const PORT = Number(process.env.PORT) || 3020;
const SERVICE_NAME = "subscription_server";

// CORS Configuration
const corsOptions = {
  allowedOrigins: [
    "http://localhost:3080",
    "http://localhost:3090",
    ...(process.env.ALLOWED_ORIGINS?.split(",") || []),
  ],
  credentials: true,
};

const corsOriginFunction = function (origin: any, callback: any) {
  if (!origin) return callback(null, true);
  if (corsOptions.allowedOrigins.indexOf(origin) === -1) {
    const msg =
      "The CORS policy for this site does not allow access from the specified Origin.";
    return callback(new Error(msg), false);
  }
  return callback(null, true);
};

// Get bootstrap actions
const applicationPreCheck = DefaultContainer.get(
  INVERSITY_TYPES.ApplicationPreCheck
) as Types.IApplicationPreCheck;

// Build and configure server
const applicationServer = new ServerBuilder()
  .setName(SERVICE_NAME)
  .setPort(PORT)
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
  .setCheck(applicationPreCheck)
  .build();

// Start server
applicationServer
  .then((appExpress) => {
    console.log(`🚀 ${SERVICE_NAME} starting on port ${PORT}`);
    appExpress.run();
  })
  .catch((err) => {
    console.error(`❌ Error starting ${SERVICE_NAME}:`, err);
    process.exit(1);
  });
