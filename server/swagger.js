// swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const url = process.env.BASE_URL || "http://localhost:5000";
console.log({ url });
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Notes API",
      version: "1.0.0",
      description: "API documentation for the E-Notes application",
    },
    servers: [
      {
        url,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./swaggers/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
