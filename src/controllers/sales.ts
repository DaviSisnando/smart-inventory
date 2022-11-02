import { Request, Response } from 'express'
import Sales from '../models/Sales'

async function create(req: Request, res: Response) {
    try {
        const sales = await Sales.create(req.body)

        return res.status(201).json({ data: sales })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const sales = await Sales.find().populate('vendasParciais')

        return res.status(200).json(sales)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const sale = await Sales.findById(id)
        if (!sale) return res.status(404).json({ error: 'Sale not found.' })

        return res.status(200).json(sale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const sale = await Sales.findByIdAndUpdate(id, req.body, { new: true })
        if (!sale) return res.status(404).json({ error: 'Sale not found.' })

        return res.status(200).json(sale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const sale = await Sales.findByIdAndDelete(id)
        if (!sale) return res.status(404).json({ error: 'Sale not found.' })
        
        return res.status(200).json(sale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}