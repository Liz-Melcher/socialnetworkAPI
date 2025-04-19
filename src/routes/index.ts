// routes/index.ts
import { Router } from 'express';
import apiRoutes from './api';

const router = Router();

// Mount all /api routes
router.use('/api', apiRoutes);


export default router;
