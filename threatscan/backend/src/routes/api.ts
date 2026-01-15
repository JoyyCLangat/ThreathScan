import { FastifyInstance } from "fastify";
import { runThreatScan } from "../agent/scanner";

export default async function apiRoutes(server: FastifyInstance) {
  server.post("/scan", async (request, reply) => {
    const result = await runThreatScan();
    return { status: "completed", result };
  });
}
