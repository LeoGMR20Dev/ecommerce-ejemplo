const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation for the API",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: "Development server",
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
    schemas: {
      /* Users */

      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@example.com",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },
      UserInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@exmaple.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },

      /* Roles */

      Role: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cac",
          },
          name: {
            type: "string",
            example: "visitor",
          },
        },
      },
      RoleInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "visitor",
          },
        },
      },

      /* Products */

      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cac",
          },
          name: {
            type: "string",
            example: "Blue Jean",
          },
          description: {
            type: "string",
            example: "A Size L Blue Jean for all ages",
          },
          price: {
            type: "number",
            example: 49.99,
          },
          stock: {
            type: "number",
            example: 150,
          },
          category: {
            type: "string",
            example: "Pants",
          },
          imageUrl: {
            type: "string",
            example: "image.jpg",
          },
        },
      },
      ProductInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Blue Jean",
          },
          description: {
            type: "string",
            example: "A Size L Blue Jean for all ages",
          },
          price: {
            type: "number",
            example: 49.99,
          },
          stock: {
            type: "number",
            example: 150,
          },
          category: {
            type: "string",
            example: "Pants",
          },
          imageUrl: {
            type: "string",
            example: "image.jpg",
          },
        },
      },

      Order: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cae",
          },
          product: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cac",
          },
          description: {
            type: "string",
            example: "A description for the order",
          },
          quantity: {
            type: "number",
            example: 1,
          },
          price: {
            type: "number",
            example: 49.99,
          },
          discount: {
            type: "number",
            example: 15.99,
          },
          total: {
            type: "number",
            example: 34.0,
          },
        },
      },
      OrderInput: {
        type: "object",
        properties: {
          product: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cac",
          },
          description: {
            type: "string",
            example: "A description for the order",
          },
          quantity: {
            type: "number",
            example: 1,
          },
          discount: {
            type: "number",
            example: 15.99,
          },
        },
      },

      /* Auth */

      LoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "example@gmail.com",
          },
          password: {
            type: "string",
            example: "AbC@1235",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/presentation/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
