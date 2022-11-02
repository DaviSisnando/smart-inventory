import { Schema, model, Types } from 'mongoose'

export interface InventoryCategoryFields {
    nome: string;
    produtosRemessa: string;
    produtos: string;
    qtdTotoalProdutosCategoria: number;
    qtdTiposProdutos: number;
    qtdTiposDeProdutosCategoria: number;
}

interface InventoryCategoryFieldsDocument extends Document, InventoryCategoryFields {
    _id: Types.ObjectId
}

const InventoryCategorySchema: Schema = new Schema({
    nome: String,
    produtosRemessa: [{type: Types.ObjectId, ref: 'Shipment'}],
    produtos: [{type: Types.ObjectId, ref: 'Product'}],
    qtdTotoalProdutosCategoria: Number,
    qtdTiposProdutos: Number,
    qtdTiposDeProdutosCategoria: Number,
});

export default model<InventoryCategoryFieldsDocument>('InventoryCategory', InventoryCategorySchema);