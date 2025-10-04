
import { Router } from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);

export default router;
