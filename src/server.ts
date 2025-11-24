import Fastify from 'fastify'
import postCalculateGrade from "./postCalculateGrade.js";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

const fastify = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(postCalculateGrade)

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}