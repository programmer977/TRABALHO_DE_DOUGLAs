
import { Router } from 'express';
import { createPatient, getPatients, getPatientById } from '../controllers/patientController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de pacientes
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do paciente.
 *               email:
 *                 type: string
 *                 description: E-mail único do paciente.
 *             example:
 *               name: "João da Silva"
 *               email: "joao.silva@example.com"
 *     responses:
 *       '201':
 *         description: Paciente criado com sucesso.
 *       '400':
 *         description: E-mail já existe.
 *       '500':
 *         description: Erro no servidor.
 */
router.post('/patients', createPatient);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Retorna a lista de todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       '200':
 *         description: Lista de pacientes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient' # Referenciaremos um Schema que podemos criar
 *       '500':
 *         description: Erro no servidor.
 */
router.get('/patients', getPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Busca um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID numérico do paciente.
 *     responses:
 *       '200':
 *         description: Paciente encontrado.
 *       '404':
 *         description: Paciente não encontrado.
 *       '500':
 *         description: Erro no servidor.
 */
router.get('/patients/:id', getPatientById);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do paciente.
 *         name:
 *           type: string
 *           description: Nome do paciente.
 *         email:
 *           type: string
 *           description: E-mail do paciente.
 *       example:
 *         id: 1
 *         name: "Maria da Silva"
 *         email: "maria.silva@example.com"
 */
