import { Schema, model, Types } from 'mongoose'

export interface UserFields {
    email: string;
    password: string;
}

interface UserFieldsDocument extends Document, UserFields {
    _id: Types.ObjectId
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Atributo "email" obrigatório'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default model<UserFieldsDocument>('User', UserSchema);