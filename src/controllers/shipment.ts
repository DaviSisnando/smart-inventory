import { Request, Response } from 'express'
import mongoose from 'mongoose';
import Product from '../models/Product'
import Shipment from '../models/Shipment'
const ObjectId = mongoose.Types.ObjectId;

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

async function getTotalShipment(_req: Request, res: Response) {
    try {
        const shipments = await Shipment.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$qtdAtual"},
                }
            }
        ])
        return res.status(200).json({total: shipments[0].totalAmount})
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function totalSpent(req: Request, res: Response) {
    try {
        const { id, start, end } = req.params

        const product = await Product.findById(id)
        if(!product) return res.status(404).json({ error: 'Product not found'})
        const matchDateProduct = {
            $match: {
                'dataAquisicao': {$gte: new Date(start), $lte: new Date(end)},
                'refProduto': new ObjectId(id)
            }
        }
    
        const totalProductSpent = await Shipment.aggregate([
            matchDateProduct,
            {
                $addFields: {
                    totalGasto: { $multiply: ["$qtdComprada", "$precoUnit"] }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$totalGasto"}
                }
            }
        ])
        return res.status(200).json({ totalGasto: parseFloat(totalProductSpent[0].total) })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne, getTotalShipment, totalSpent}