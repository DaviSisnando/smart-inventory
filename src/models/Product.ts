import { Schema, model, Types } from 'mongoose'
import InventoryCategory from './InventoryCategory';

export interface ProductFields {
    codigoDoProduto: string;
    nome: string;
    categoriaReferencia: string;
    categoriaProduto: string;
    marca: Date;
}

interface ProductFieldsDocument extends Document, ProductFields {
    _id: Types.ObjectId
}

const ProductSchema: Schema = new Schema({
    codigoDoProduto: {type: String, required: true},
    nome: String,
    categoriaReferencia: {type: Types.ObjectId, required: true, ref: 'InventoryCategory'},
    categoriaProduto: String,
    marca: String,
});

ProductSchema.pre('save', async function (next) {
    let { _id: id, categoriaReferencia: categoriaReferenciaId } = this;

    await InventoryCategory.findByIdAndUpdate(categoriaReferenciaId, 
        { '$push': { 'produtos': id }}).catch(e => next(e))
    next();
})

ProductSchema.post('findOneAndDelete', async function (product, next) {
    let { _id: id, categoriaReferencia: categoriaReferenciaId } = product;
    
    await InventoryCategory.findByIdAndUpdate(categoriaReferenciaId, { '$pull': { 'produtos': id } }).catch();

    next();
});

export default model<ProductFieldsDocument>('Product', ProductSchema);