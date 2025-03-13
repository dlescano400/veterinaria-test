import { Router } from 'express';
import appointmentController from '../controllers/appointment.controller';

const router = Router();

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               petId:
 *                 type: string
 *               veterinarianId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */
router.post('/', appointmentController.create);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get('/', appointmentController.getAll);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment details
 */
router.get('/:id', appointmentController.getById);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               description:
 *                 type: string
 *               petId:
 *                 type: string
 *               veterinarianId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated
 */

router.put('/:id', appointmentController.update);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted
 */

router.delete('/:id', appointmentController.delete);

export default router;
