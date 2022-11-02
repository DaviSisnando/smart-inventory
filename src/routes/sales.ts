import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne } from '../controllers/sales'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/:id', listOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router