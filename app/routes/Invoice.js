import express from 'express';
import InvoiceController from '../controllers/InvoiceController.js';
const router = express.Router();


router.post("/create", InvoiceController.create);
router.get("/view", InvoiceController.view);


export default router;
