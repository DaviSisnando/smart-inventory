import { Schema, model, Types } from 'mongoose'

export interface SaleFields {
    comprador: string;
    dataVenda: Date;
    vendasParciais: [string];
    lucroTotal: number;
    valorTotal: number;
}

interface SaleFieldsDocument extends Document, SaleFields {
    _id: Types.ObjectId
}

const SaleSchema: Schema = new Schema({
    comprador: String,
    dataVenda: { type: Date, default: Date.now() },
    vendasParciais: [{type: Types.ObjectId, ref: 'PartialSale'}],
    lucroTotal: Number,
    valorTotal: Number
});

export default model<SaleFieldsDocument>('Sales', SaleSchema);