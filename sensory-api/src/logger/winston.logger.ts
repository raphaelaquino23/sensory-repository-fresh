import { createLogger, transports, format } from "winston";

const winston = require("winston");

export const winstonLogger = createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "post-service" },
  //there are levels that conforms to the severity ordering specified by RFC5424
  //   const levels = {
  //   error: 0,
  //   warn: 1,
  //   info: 2,
  //   http: 3,
  //   verbose: 4,
  //   debug: 5,
  //   silly: 6
  // };
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console(),
  ],
});

if (process.env.NODE_ENV !== "production") {
  winstonLogger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

winstonLogger.info("Hello! This is a winston logger saying good morning!");
