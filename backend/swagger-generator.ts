import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/route.ts'];

const generateSwagger = () => {
  try {
    const result = swaggerAutogen(outputFile, endpointsFiles);
    console.log('Swagger documentation generated.', result);
  } catch (error) {
    console.error('Error generating Swagger documentation:', (error as Error).message);
  }
};

generateSwagger();