import Invoice from '../models/InvoiceModel.js';

const create = async (req, res, next) => {

    const quotation_id = '12345';

    res.status(201).json({ message: 'Quotation created', quotation_id });

}

const view = async (req, res, next) => {
    const { token } = req.params;

    // 1 find id using token
    // 2 create filter 
    //
    // error handling

    const quotations = await Invoice.find({}, {user_id: 0});


    res.status(200).json({ message: 'Success', quotations });
}


export default { create, view };
