
import { Router } from 'express';
import { createDoctor, getDoctors, getDoctorById } from '../controllers/doctorController';

const router = Router();

router.post('/doctors', createDoctor);
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);

export default router;
