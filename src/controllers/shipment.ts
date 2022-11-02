import { Request, Response } from 'express'
import Product from '../models/Product'
import Shipment from '../models/Shipment'

async function create(req: Request, res: Response) {
    try {
        const { refProduto } = req.body
        const product = await Product.findById({ _id: refProduto })
        if(!product) return res.status(404).json({ error: 'Este produto não foi encontrado. Tente novamente.' })
        
        const shipment = await Shipment.create(req.body)
        return res.status(201).json({ data: shipment })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const shipments = await Shipment.find()
        return res.status(200).json(shipments)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const shipment = await Shipment.findById(id)
        if (!shipment) return res.status(404).json({ error: 'Shipment not found.' })

        return res.status(200).json(shipment)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const shipment = await Shipment.findByIdAndUpdate(id, req.body, { new: true })
        if (!shipment) return res.status(404).json({ error: 'Shipment not found.' })

        return res.status(200).json(shipment)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const shipment = await Shipment.findByIdAndDelete(id)
        if (!shipment) return res.status(404).json({ error: 'Shipment not found.' })

        return res.status(200).json(shipment)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}