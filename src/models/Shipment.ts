import { Schema, model, Types } from 'mongoose'
import InventoryCategory from './InventoryCategory';
import Product from './Product';

export interface ShipmentFields {
    refProduto: string;
    qtdComprada: number;
    qtdAtual: number;
    dataAquisicao: Date;
    precoUnit: number;
}

interface ShipmentFieldsDocument extends Document, ShipmentFields {
    _id: Types.ObjectId
}

const ShipmentSchema: Schema = new Schema({
    refProduto: {type: Types.ObjectId, required: true, ref: 'Product'},
    qtdComprada: Number,
    qtdAtual: Number,
    dataAquisicao: Date,
    precoUnit: Types.Decimal128,
});

ShipmentSchema.pre('save', async function (next) {
    let { _id: id, refProduto: refProdutoId } = this;

    const { categoriaReferencia } = await Product.findById(refProdutoId)

    await InventoryCategory.findByIdAndUpdate(categoriaReferencia, 
        { '$push': { 'produtosRemessa': id }}).catch(e => next(e))
    next();
})

ShipmentSchema.post('findOneAndDelete', async function (shipment, next) {
    let { _id: id, refProduto: refProdutoId } = shipment;
    
    await InventoryCategory.findByIdAndUpdate(refProdutoId, { '$pull': { 'produtosRemessa': id } }).catch();

    next();
});

export default model<ShipmentFieldsDocument>('Shipment', ShipmentSchema);