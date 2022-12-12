import { Request, Response } from 'express'
import Sales from '../models/Sales'
import PartialSale from '../models/PartialSale'

async function create(req: Request, res: Response) {
    try {
        const { comprador, dataVenda, vendas } = req.body
        const sales = await Sales.create({ comprador, dataVenda })
        const idVenda = sales?._id

        console.log(vendas)
        vendas.forEach(
            async (a) => 
            await PartialSale.create({refDaRemessa: a.refDaRemessa, qtdVendida: a.qtdVendida, valorCompraProdutoUnit: a.valorCompraProdutoUnit, vendaId: idVenda})
        )
        // const partialSale = await PartialSale.create({refDaRemessa, qtdVendida, valorCompraProdutoUnit, vendaId: idVenda})
        
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

   
async function listBy(req: Request, res: Response) {
    try {
       
        const { query } = req.params
        const product = await Sales.find({comprador:{$regex:query,$options:'i'}})
        if (!product) return res.status(404).json({ error: 'Buyer  not found.' })
        
        return res.status(200).json(product)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne, listBy}