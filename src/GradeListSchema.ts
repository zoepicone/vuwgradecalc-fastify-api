import { Static, Type } from '@sinclair/typebox'

const ValidGradesBoxed = Type.Union([
  Type.Literal('A+'),
  Type.Literal('A'),
  Type.Literal('A-'),
  Type.Literal('B+'),
  Type.Literal('B'),
  Type.Literal('B-'),
  Type.Literal('C+'),
  Type.Literal('C'),
  Type.Literal('C-'),
  Type.Literal('D'),
  Type.Literal('E'),
  Type.Literal('K'),
  Type.Literal('L')])
export type ValidGrades = Static<typeof ValidGradesBoxed>

export const GradeList =
  Type.Object({
    years: Type.Array(Type.Object({
      trimesters: Type.Array(Type.Object({
        courses: Type.Array(Type.Object({
          name: Type.String(),
          grade: ValidGradesBoxed,
          points: Type.Number()
        }))
      }))
    }))
  })

export type GradeListType = Static<typeof GradeList>