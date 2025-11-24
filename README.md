# VUW Grade Calculator - Fastify API

POST endpoint created using Fastify to calculate GPAs. Written using Typescript and Typebox for schema validation.

In the future: may attempt to improve validation messages (Typebox's integration with Fastify is not perfect), may create
some way of storing course data with Mongo—this could allow for this project to link into the React application and remove
the need for client-side calculations.

## `POST /`

### Query Params

```json
{
  "type": "object",
  "properties": {
    "years": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "trimesters": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "courses": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "grade": {
                        "anyOf": [
                          {
                            "const": "A+",
                            "type": "string"
                          },
                          {
                            "const": "A",
                            "type": "string"
                          },
                          {
                            "const": "A-",
                            "type": "string"
                          },
                          {
                            "const": "B+",
                            "type": "string"
                          },
                          {
                            "const": "B",
                            "type": "string"
                          },
                          {
                            "const": "B-",
                            "type": "string"
                          },
                          {
                            "const": "C+",
                            "type": "string"
                          },
                          {
                            "const": "C",
                            "type": "string"
                          },
                          {
                            "const": "C-",
                            "type": "string"
                          },
                          {
                            "const": "D",
                            "type": "string"
                          },
                          {
                            "const": "E",
                            "type": "string"
                          },
                          {
                            "const": "K",
                            "type": "string"
                          },
                          {
                            "const": "L",
                            "type": "string"
                          }
                        ]
                      },
                      "points": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "name",
                      "grade",
                      "points"
                    ]
                  }
                }
              },
              "required": [
                "courses"
              ]
            }
          }
        },
        "required": [
          "trimesters"
        ]
      }
    }
  },
  "required": [
    "years"
  ]
}
```

### Responses

**200**:

```json
{
  "type": "object",
  "properties": {
    "calculatedGrade": {
      "type": "number"
    }
  }
}
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

Returns the request schema seen in `POST /` above—I just used this to get that JSON response.