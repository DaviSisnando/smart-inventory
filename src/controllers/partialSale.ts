import { Request, Response } from 'express'
import PartialSale from '../models/PartialSale'
import Product from '../models/Product'
import Shipment from '../models/Shipment'

async function create(req: Request, res: Response) {
    try {
        const { refDoProduto, refDaRemessa } = req.body
        // const product = await Product.findById({ _id: refDoProduto })
        const shipment = await Shipment.findById({ _id: refDaRemessa })
        if(!shipment) return res.status(404).json({ error: 'Remessa não encontrada. Tente novamente.' })

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

async function profitData(req: Request, res: Response) {
    try {
        const { start, end } = req.params

        const saleData = await Promise.all([
            PartialSale.aggregate([
                {
                    $match: {
                        'dataVenda': {$gte: new Date(start), $lte: new Date(end)}
                    }
                },
                {
                    $project: {
                        qtdVendida: 1,
                        valorCompraProdutoUnit: 1,
                        valorVendaUnit: 1,
                    }
                },
                {
                    $addFields: {
                        totalLucro: { $multiply: [{ $subtract: ["$valorVendaUnit", "$valorCompraProdutoUnit"] }, "$qtdVendida"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {$sum: "$totalLucro"}
                    }
                }
            ]),
            PartialSale.aggregate([
                {
                    $match: {
                        'dataVenda': {$gte: new Date(start), $lte: new Date(end)}
                    }
                },
                {
                    $project: {
                        qtdVendida: 1,
                        valorVendaUnit: 1,
                    }
                },
                {
                    $addFields: {
                        totalVendido: { $multiply: ["$valorVendaUnit", "$qtdVendida"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {$sum: "$totalVendido"}
                    }
                }
            ])
        ])
        
        const response = { totalLucro: parseFloat(saleData[0][0].total), totalVendido: parseFloat(saleData[1][0].total) }
        return res.status(200).json(response)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function productQuantityProfit(req: Request, res: Response) {
    try {
        const { id, start, end } = req.params

        console.log(id)

        const product = await Product.findById(id)
        if(!product) return res.status(404).json({ error: 'Product not found'})
        const matchDateProduct = {
            $match: {
                'dataVenda': {$gte: new Date(start), $lte: new Date(end)},
                'refDoProduto': id
            }
        }

        const productData = await Promise.all([
            PartialSale.aggregate([
                matchDateProduct,
                {
                    $group: {
                        _id: null,
                        total: {$sum: "$qtdVendida"}
                    }
                }
            ]),
            PartialSale.aggregate([
                matchDateProduct,
                {
                    $addFields: {
                        totalLucro: { $multiply: [{ $subtract: ["$valorVendaUnit", "$valorCompraProdutoUnit"] }, "$qtdVendida"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {$sum: "$totalLucro"}
                    }
                }
            ])
        ])

        const response = { totalLucro: parseFloat(productData[0][0].total), totalVendido: parseFloat(productData[1][0].total) }
        return res.status(200).json(response)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne, profitData, productQuantityProfit}
