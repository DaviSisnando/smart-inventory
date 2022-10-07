import express from 'express'
import {Router} from "express"; 

import { create } from '../controllers/user'

const router = Router();
router.post('/', create);

export default router