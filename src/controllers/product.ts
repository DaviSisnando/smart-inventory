import { Request, Response } from 'express'
import Product from '../models/Product'
import InventoryCategory from '../models/InventoryCategory'

async function create(req: Request, res: Response) {
    try {
        const { categoriaReferencia } = req.body
        const inventoryCategory = await InventoryCategory.findById({ _id: categoriaReferencia })
        if(!inventoryCategory) return res.status(404).json({ error: 'Esta categoria não foi encontrada. Tente novamente.' })

        const product = await Product.create(req.body)

        return res.status(201).json({ data: product })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const products = await Product.find()

        return res.status(200).json(products)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ error: 'Product not found.' })

        return res.status(200).json(product)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        if (!product) return res.status(404).json({ error: 'Product not found.' })

        return res.status(200).json(product)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(404).json({ error: 'Product not found.' })

        return res.status(200).json(product)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}