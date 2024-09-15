import express from 'express';
import AuthRoutes from './Auth.js';
import InvoiceRoutes from './Invoice.js';

const apiRoutes = express.Router();

apiRoutes.use("/", AuthRoutes);
apiRoutes.use("/invoices/", InvoiceRoutes);

export default apiRoutes;
