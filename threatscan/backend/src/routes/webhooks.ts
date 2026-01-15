import { FastifyInstance } from "fastify";

export default async function webhookRoutes(server: FastifyInstance) {
  server.post("/circle", async (request) => {
    console.log("📩 Circle webhook received", request.body);
    return { received: true };
  });
}
