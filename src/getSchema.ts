import {FastifyInstance} from "fastify";
import {GradeList} from "./GradeListSchema.js";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get<{Reply: Object}>(
    '/schema'
  ,
  (request, reply) => {
    return reply.status(200).send(GradeList)
  }
  )
}

export default routes;