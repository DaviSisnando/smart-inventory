import { Schema, model, Types } from 'mongoose'

export interface InventoryFields {
    categorias: [string];
    totalDeProdutos: number;
}

interface InventoryFieldsDocument extends Document, InventoryFields {
    _id: Types.ObjectId
}

const InventorySchema: Schema = new Schema({
    categorias: [String],
    totalDeProdutos: Number,
});

export default model<InventoryFieldsDocument>('Inventory', InventorySchema);