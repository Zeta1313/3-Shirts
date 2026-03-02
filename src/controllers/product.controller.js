import * as productService from '../services/product.service.js';

export const getAll = async (req, res) => {
    try {
        const records = await productService.getAll();
        res.json({ message: 'OK', data: records });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', data: null });
    }
};

export const getById = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id', data: null });

    try {
        const record = await productService.getById(id);
        if (!record) return res.status(404).json({ message: 'Not found', data: null });

        res.json({ message: 'OK', data: record });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', data: null });
    }
};