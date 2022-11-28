import { Request, Response } from 'express'
import InventoryCategory from '../models/InventoryCategory'

async function create(req: Request, res: Response) {
    try {
        const { nome } = req.body
        const inventoryCategory = await InventoryCategory.create({ nome })

        return res.status(201).json({ data: inventoryCategory })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const inventoryCategorys = await InventoryCategory.find().populate('produtos produtosRemessa')

        return res.status(200).json(inventoryCategorys)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const inventoryCategory = await InventoryCategory.findById(id).populate('produtos produtosRemessa')
        const totalProducts = inventoryCategory?.produtos?.length
        const totalShipping = inventoryCategory?.produtosRemessa?.length
        if (!inventoryCategory) return res.status(404).json({ error: 'InventoryCategory not found.' })

        return res.status(200).json({inventoryCategory, totalProducts, totalShipping})
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const inventoryCategory = await InventoryCategory.findByIdAndUpdate(id, req.body, { new: true })
        if (!inventoryCategory) return res.status(404).json({ error: 'InventoryCategory not found.' })

        return res.status(200).json(inventoryCategory)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const inventoryCategory = await InventoryCategory.findByIdAndDelete(id)
        if (!inventoryCategory) return res.status(404).json({ error: 'InventoryCategory not found.' })
        
        return res.status(200).json(inventoryCategory)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}