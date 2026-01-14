import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);
// common middlewares
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// importing routes
import healthCheckRoutes from "./routes/healthCheck.routes.js";
import UploadFilesRoutes from "./routes/upload.routes.js";
import UploadVideosRoutes from "./routes/upload.routes.js";
import DeleteFiles from "./routes/upload-delete.routes.js";

// using routes
app.use("/api/v1/health-check", healthCheckRoutes);
app.use("/api/v1/file", UploadFilesRoutes);
app.use("/api/v1/file", DeleteFiles);
app.use("/api/v1/file", UploadVideosRoutes);
export { app };
