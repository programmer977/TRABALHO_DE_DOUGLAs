
// src/controllers/doctorController.ts
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export const createDoctor = async (req: Request, res: Response) => {
  const { name, email, specialty } = req.body;

  if (!name || !email || !specialty) {
    return res.status(400).json({ message: 'Nome, email e especialidade são obrigatórios' });
  }

  try {
    // Usando o Prisma Client para criar um novo médico.
    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        email,
        specialty,
      },
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar médico', error });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  try {
    // Usando o Prisma Client para buscar todos os médicos.
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médicos', error });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  // O ID agora é um número.
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Usando o Prisma Client para buscar um médico pelo ID.
    const doctor = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médico', error });
  }
};
