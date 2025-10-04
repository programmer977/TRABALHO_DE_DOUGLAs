
// src/index.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Agendamento Médico',
      version: '1.0.0',
      description: 'Documentação da API para o sistema de agendamento de consultas médicas.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Rotas da API
app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api', appointmentRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
