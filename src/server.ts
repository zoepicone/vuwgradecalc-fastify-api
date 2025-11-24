import Fastify from 'fastify'
import postCalculateGrade from "./postCalculateGrade.js";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import getSchema from "./getSchema.js";

const fastify = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(postCalculateGrade)
fastify.register(getSchema)

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}