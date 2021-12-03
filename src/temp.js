const Ajv = require('ajv').default

const parentSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'https://schemas.example.com/samples/parent',
  'title': 'Schema that references another schema multiple times',
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string',
    },
    'eldestChild': {
      '$ref': 'child',
    },
    'youngestChild': {
      '$ref': 'child',
    },
  },
}

const childSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'https://schemas.example.com/samples/child',
  'title': 'Schema referenced from a parent',
  'description': 'Example description',
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string',
    },
  },
}

const ajv = new Ajv({schemas: [parentSchema, childSchema]})

const schema = ajv.getSchema('https://schemas.example.com/samples/child')

console.log(schema)
