
// src/controllers/patientController.ts
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export const createPatient = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios' });
  }

  try {
    // Usando o Prisma Client para criar um novo paciente.
    const newPatient = await prisma.patient.create({
      data: {
        name,
        email,
        phone,
      },
    });

    res.status(201).json(newPatient);
  } catch (error) {
    // O Prisma pode lançar exceções por violações de restrição (ex: email único).
    res.status(500).json({ message: 'Erro ao criar paciente', error });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    // Usando o Prisma Client para buscar todos os pacientes.
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pacientes', error });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  // O ID agora é um número, então precisamos convertê-lo.
  const id = parseInt(req.params.id, 10);

  // Validação simples para garantir que é um número.
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Usando o Prisma Client para buscar um paciente pelo ID.
    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar paciente', error });
  }
};
