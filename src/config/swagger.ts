import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const isProduction = __dirname.includes("dist");
const routesPath = isProduction
  ? path.join(__dirname, "..", "routes", "*.js")
  : path.join(__dirname, "..", "routes", "*.ts");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NUTECH API Documentation",
      version: "1.0.0",
      description:
        "API Documentation untuk Membership, Information, dan Transaction Module",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Masukkan JWT token",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Status code",
              example: 0,
            },
            message: {
              type: "string",
              description: "Response message",
              example: "Sukses",
            },
            data: {
              type: "object",
              nullable: true,
              description: "Response data",
            },
          },
        },
        RegistrationRequest: {
          type: "object",
          required: ["email", "first_name", "last_name", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@nutech-integrasi.com",
            },
            first_name: {
              type: "string",
              example: "User",
            },
            last_name: {
              type: "string",
              example: "Nutech",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "password123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@nutech-integrasi.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 0,
            },
            message: {
              type: "string",
              example: "Login Sukses",
            },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        UserProfile: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@nutech-integrasi.com",
            },
            first_name: {
              type: "string",
              example: "User",
            },
            last_name: {
              type: "string",
              example: "Nutech",
            },
            profile_image: {
              type: "string",
              nullable: true,
              example: "https://yoururlapi.com/profile.jpeg",
            },
          },
        },
        UpdateProfileRequest: {
          type: "object",
          required: ["first_name", "last_name"],
          properties: {
            first_name: {
              type: "string",
              example: "User Edited",
            },
            last_name: {
              type: "string",
              example: "Nutech Edited",
            },
          },
        },
        Banner: {
          type: "object",
          properties: {
            banner_name: {
              type: "string",
              example: "Banner 1",
            },
            banner_image: {
              type: "string",
              example: "https://nutech-integrasi.com/banner1.png",
            },
            description: {
              type: "string",
              example: "Lerem Ipsum Dolor sit amet",
            },
          },
        },
        Service: {
          type: "object",
          properties: {
            service_code: {
              type: "string",
              example: "PAJAK",
            },
            service_name: {
              type: "string",
              example: "Pajak PBB",
            },
            service_icon: {
              type: "string",
              example: "https://nutech-integrasi.com/pajak.png",
            },
            service_tariff: {
              type: "integer",
              example: 40000,
            },
          },
        },
        BalanceResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 0,
            },
            message: {
              type: "string",
              example: "Get Balance Berhasil",
            },
            data: {
              type: "object",
              properties: {
                balance: {
                  type: "integer",
                  example: 1000000,
                },
              },
            },
          },
        },
        TopUpRequest: {
          type: "object",
          required: ["top_up_amount"],
          properties: {
            top_up_amount: {
              type: "integer",
              minimum: 1,
              example: 1000000,
            },
          },
        },
        TransactionRequest: {
          type: "object",
          required: ["service_code"],
          properties: {
            service_code: {
              type: "string",
              example: "PULSA",
            },
          },
        },
        TransactionResponse: {
          type: "object",
          properties: {
            invoice_number: {
              type: "string",
              example: "INV17082023-001",
            },
            service_code: {
              type: "string",
              example: "PULSA",
            },
            service_name: {
              type: "string",
              example: "Pulsa",
            },
            transaction_type: {
              type: "string",
              enum: ["PAYMENT"],
              example: "PAYMENT",
            },
            total_amount: {
              type: "integer",
              example: 10000,
            },
            created_on: {
              type: "string",
              format: "date-time",
              example: "2023-08-17T10:10:10.000Z",
            },
          },
        },
        HistoryRecord: {
          type: "object",
          properties: {
            invoice_number: {
              type: "string",
              example: "INV17082023-001",
            },
            transaction_type: {
              type: "string",
              enum: ["TOPUP", "PAYMENT"],
              example: "TOPUP",
            },
            description: {
              type: "string",
              example: "Top Up balance",
            },
            total_amount: {
              type: "integer",
              example: 100000,
            },
            created_on: {
              type: "string",
              format: "date-time",
              example: "2023-08-17T10:10:10.000Z",
            },
          },
        },
        HistoryResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 0,
            },
            message: {
              type: "string",
              example: "Get History Berhasil",
            },
            data: {
              type: "object",
              properties: {
                offset: {
                  type: "integer",
                  example: 0,
                },
                limit: {
                  type: "integer",
                  example: 3,
                },
                records: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/HistoryRecord",
                  },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 102,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            data: {
              type: "object",
              nullable: true,
              example: null,
            },
          },
        },
        UnauthorizedResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 108,
            },
            message: {
              type: "string",
              example: "Token tidak tidak valid atau kadaluwarsa",
            },
            data: {
              type: "object",
              nullable: true,
              example: null,
            },
          },
        },
      },
    },
    tags: [
      {
        name: "1. Module Membership",
        description: "API untuk registrasi, login, dan profile management",
      },
      {
        name: "2. Module Information",
        description: "API untuk banner dan services information",
      },
      {
        name: "3. Module Transaction",
        description: "API untuk balance, top up, dan transaksi",
      },
    ],
  },
  apis: [routesPath],
};

export const swaggerSpec = swaggerJsdoc(options);
