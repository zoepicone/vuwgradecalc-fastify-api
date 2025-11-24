import {GradeList, GradeListType, ValidGrades} from "./GradeListSchema.js";
import {FastifyError, FastifyInstance} from "fastify";
import removeDuplicateObjects from "./lib/removeDuplicateObjects.js";

async function routes(fastify: FastifyInstance, options: any) {
  fastify.post<{Body: GradeListType, Reply: Object}>(
    '/',
    {
      schema: {
        body: GradeList,
        response: {
          200: {
            type: 'object',
            properties: {
              calculatedGrade: { type: 'number' }
            }
          }
        }
      }
    }
  ,
  (request, reply) => {
    const gradeListObject = request.body;
    reply.status(200).send({calculatedGrade: calculateGrade(gradeListObject)});
  })

  fastify.setErrorHandler((error: FastifyError, req, res) => {
    if (error.validation) {
      const validationErrors = error.validation;
      res.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Course structure invalid',
        details: removeDuplicateObjects(validationErrors.map(e => ({
                    keyword: e.keyword,
                    dataPath: e.instancePath,
                    message: e.message
                })))
      });
    } else {
      // Handle other types of errors
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong',
      });
    }
  })
}

function calculateGrade(gradeData: GradeListType) {
  const gradesMap = gradeData.years.flatMap((year) => {
    return year.trimesters.flatMap((trimester) => {
      return trimester.courses.map((course) => {return [gradeNameToPointValue(course.grade), course.points]})
    })
  })

  const totalPoints = gradesMap.reduce((acc, current) => acc + current[1], 0)
  const totalGradePoints = gradesMap.reduce((acc, current) => acc + (current[0] * current[1]), 0)

  return Math.round(totalGradePoints / totalPoints * 100) / 100
}

function gradeNameToPointValue(grade: ValidGrades) {
  switch(grade) {
    case 'A+':
      return 9;
    case 'A':
      return 8;
    case 'A-':
      return 7;
    case 'B+':
      return 6;
    case 'B':
      return 5;
    case 'B-':
      return 4;
    case 'C+':
      return 3;
    case 'C':
      return 2;
    case 'C-':
      return 1;
    default:
      return 0;
  }
}

export default routes;