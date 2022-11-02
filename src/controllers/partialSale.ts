import { Request, Response } from 'express'
import PartialSale from '../models/PartialSale'
import Product from '../models/Product'
import Shipment from '../models/Shipment'

async function create(req: Request, res: Response) {
    try {
        const { refDoProduto, refDaRemessa } = req.body
        const product = await Product.findById({ _id: refDoProduto })
        const shipment = await Shipment.findById({ _id: refDaRemessa })
        if(!product || !shipment) return res.status(404).json({ error: 'Produto ou remessa não foram encontrados. Tente novamente.' })

        const partialSale = await PartialSale.create(req.body)

        return res.status(201).json({ data: partialSale })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const partialSales = await PartialSale.find()

        return res.status(200).json(partialSales)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const partialSale = await PartialSale.findById(id)
        if (!partialSale) return res.status(404).json({ error: 'PartialSale not found.' })

        return res.status(200).json(partialSale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const partialSale = await PartialSale.findByIdAndUpdate(id, req.body, { new: true })
        if (!partialSale) return res.status(404).json({ error: 'PartialSale not found.' })

        return res.status(200).json(partialSale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const partialSale = await PartialSale.findByIdAndDelete(id)
        if (!partialSale) return res.status(404).json({ error: 'PartialSale not found.' })
        
        return res.status(200).json(partialSale)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}
