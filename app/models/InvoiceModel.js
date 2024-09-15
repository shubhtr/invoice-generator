import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    qty: { type: Number, required: [true, 'Qty is required'] },
    rate: { type: Number, required: [true, 'Rate is required'] },
    total: { type: Number, required: [true, 'Total is required'] },
});

const quotationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId },
    products: [productSchema],
    gst: { type: Number, required: [true, 'GST is required'] },
    totalGrand: { type: Number, required: [true, 'Grand Total is required'] },
});



export default mongoose.model("quotations", quotationSchema, "quotations");
