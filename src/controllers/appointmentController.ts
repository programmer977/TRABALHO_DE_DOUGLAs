
// src/controllers/appointmentController.ts
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export const createAppointment = async (req: Request, res: Response) => {
  const { patientId, doctorId, date, description } = req.body;

  // Convertendo para um objeto Date.
  const appointmentDate = new Date(date);

  if (!patientId || !doctorId || !date) {
    return res.status(400).json({ message: 'ID do paciente, ID do médico e data são obrigatórios' });
  }

  // Validação para garantir que os IDs são números.
  if (isNaN(patientId) || isNaN(doctorId)) {
    return res.status(400).json({ message: 'IDs de paciente e médico devem ser números' });
  }

  try {
    // Usando o Prisma Client para criar um novo agendamento.
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: appointmentDate,
        description,
      },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    // Usando o Prisma Client para buscar todos os agendamentos.
    // O `include` permite trazer dados relacionados na mesma consulta.
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true, // Inclui os dados do paciente relacionado.
        doctor: true,  // Inclui os dados do médico relacionado.
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos', error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  // O ID agora é um número.
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Usando o Prisma Client para buscar um agendamento pelo ID.
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamento', error });
  }
};
