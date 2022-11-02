import { Schema, model, Types } from 'mongoose'
import Sales from './Sales';

export interface PartialSaleFields {
    codigoDoProduto: string;
    categoriaDoProduto: string;
    refDoProduto: string;
    refDaRemessa: string;
    dataVenda: Date;
    qtdVendida: number;
    comprador: string;
    valorCompraProdutoUnit: number;
    valorVendaUnit: number;
    valorTotal: number;
    lucro: number;
    venda: string;
}

interface PartialSaleFieldsDocument extends Document, PartialSaleFields {
    _id: Types.ObjectId
}

const PartialSaleSchema: Schema = new Schema({
    codigoDoProduto: String,
    categoriaDoProduto: String,
    refDoProduto: String,
    refDaRemessa: String,
    dataVenda: Date,
    qtdVendida: Number,
    comprador: String,
    valorCompraProdutoUnit: Types.Decimal128,
    valorVendaUnit: Types.Decimal128,
    valorTotal: Types.Decimal128,
    lucro: Types.Decimal128,
    vendaId: {type: Types.ObjectId, required: true, ref: 'Sales'}
});

PartialSaleSchema.pre('save', async function (next) {
    let { _id: id, vendaId } = this;

    await Sales.findByIdAndUpdate(vendaId, 
        { '$push': { 'vendasParciais': id }}).catch(e => next(e))
    next();
})

PartialSaleSchema.post('findOneAndDelete', async function (partialSale, next) {
    let { _id: id, vendaId } = partialSale;
    
    await Sales.findByIdAndUpdate(vendaId, { '$pull': { 'vendasParciais': id } }).catch();

    next();
});

export default model<PartialSaleFieldsDocument>('PartialSale', PartialSaleSchema);