import { Schema, model, Types } from 'mongoose'

export interface SalesFields {
    vendas: [string];
    lucroTotal: number;
    qtdVendas: number;
    lucroMensal: [string];
    lucroPorCategoria: [string];
}

interface SalesFieldsDocument extends Document, SalesFields {
    _id: Types.ObjectId
}

const SalesSchema: Schema = new Schema({
    vendas: [String],
    lucroTotal: { type: Number, default: 0},
    qtdVendas: { type: Number, default: 0},
    lucroMensal: [String],
    lucroPorCategoria: [String]
});

export default model<SalesFieldsDocument>('Sale', SalesSchema);