import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/User'

const encryptedPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

async function create(req: Request, res: Response) {
    try {
        const user = await User.create(req.body)
        return res.status(200).json({ data: user })
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create}