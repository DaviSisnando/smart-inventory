import { Schema, model, Types } from 'mongoose'

export interface UserFields {
    email: string;
    password: string;
    _id: Types.ObjectId;
}

interface UserFieldsDocument extends Document {}

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