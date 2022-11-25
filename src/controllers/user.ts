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
        console.log(req.body)
        const { email, password } = req.body
        
        const hash = await encryptedPassword(password)
        const user = await User.create({ email, password: hash })
        
        return res.status(201).json({ data: user })
    } catch(e) {
        return res.status(404).json({ error: e })
    }
}

async function listAll(_req: Request, res: Response) {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function listOne(req: Request, res: Response) {
    try {
        const { email, password } = req.params

        const user = await User.findOne({"email": email})
        if (!user) return res.status(404).json({ error: 'User not found.' })

        if (user.password == await encryptedPassword(password))
        return res.status(200).json(user)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function updateOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { password } = req.body

        if (password) req.body.password = await encryptedPassword(password)
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (!user) return res.status(404).json({ error: 'User not found.' })
        return res.status(200).json(user)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(404).json({ error: 'User not found.' })
        return res.status(200).json(user)
    } catch(e) {
        return res.status(400).json({ error: e })
    }
}

export {create, listAll, listOne, updateOne, deleteOne}