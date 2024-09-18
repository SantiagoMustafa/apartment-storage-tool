// DEPENDENCIES
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// IMPORT PATHS
import { auth } from "./auth/auth";
import { department } from "./department/department";

// IMPORT ERROR MODEL
import ErrorModel from "./models/Error";

// CONFIG
const PORT = process.env.PORT;
const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/auth", auth);
app.use("/department", department);

// REQUEST NOT FOUND
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: "Endpoint not found",
    code: "NOT_FOUND",
  });
});

app.use(
  (
    err: ErrorModel,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const response = {
      status: err.status,
      success: false,
      message: err.message,
      code: err.code,
    };

    res.status(err.status).send(response);
  }
);

app.listen(PORT, () => {
  console.log("listen on port: ", PORT);
});
