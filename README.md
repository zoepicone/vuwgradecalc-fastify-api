# VUW Grade Calculator - Fastify API

POST endpoint created using Fastify to calculate GPAs. Written using Typescript and Typebox for schema validation.

In the future: may attempt to improve validation messages (Typebox's integration with Fastify is not perfect), may create
some way of storing course data with Mongo—this could allow for this project to link into the React application and remove
the need for client-side calculations.

## `POST /`

### Query Params

```yaml
requestBody:
  content:
    application/json:
      schema:
        type: object
        properties:
          years:
            type: array
            description: A year holds a number of trimesters.
            items:
              type: object
              properties:
                trimesters:
                  type: array
                  description: |
                    A trimester holds a number of courses. 
                    There can only be three trimesters in a year.
                  maxItems: 3
                  items:
                    type: object
                    properties:
                      courses:
                        type: array
                        description: |
                          A course is the basic unit used in calculating the grade point average. 
                          The grade and corresponding point value for each course are combined and summed to determine the final GPA.
                        items:
                          type: object
                          properties:
                            name:
                              type: string
                              description: |
                                Name of the course taken.
                            grade:
                              type: string
                              enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E', 'K', 'L']
                              description: |
                                Letter value representing grade received in the course.
                            points:
                              type: number
                              minimum: 0
                              description: |
                                Numeric value representing total number of points the course was worth.
                                Generally 15 or 20, although we do not restrict this value.
```

### Responses

**200**:

```yaml
content:
  application/json:
    schema:
      type: object
      properties:
        calculatedGrade:
          type: number
```

**400**: Error response

### Example

**Request**:

```json
{
  "years": [
    {
      "trimesters": [
        {
          "courses": [
            {
              "name": "SWEN101",
              "grade": "A+",
              "points": 20
            },
            {
              "name": "SWEN205",
              "grade": "B-",
              "points": 15
            }
          ]
        }
      ]
    }
  ]
}
```

**Response**:

```json
{
  "calculatedGrade": 6.86
}
```

## `GET /schema`

Returns the request schema required for `POST /` in JSON form.