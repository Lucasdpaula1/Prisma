import swaggerJsdoc from "swagger-jsdoc";
const Definition = {
  definition: {
    oneapi: "3.0.0",
    info: {
      title: "api todo-list",
      description:
        "uma api voltada para a simplicidade de realizar tarefas simples",
      version: "1.0.0",
      contact: {
        url: "lucassilva@gmail.com",
      },
    },
  },
  apis: ["dist/controllers/*js"],
};
export const Option = swaggerJsdoc(Definition);
