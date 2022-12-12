import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne, listBy } from '../controllers/sales'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/:id', listOne);
router.put('/:id', updateOne);
router.get('/find/:query',listBy)
router.delete('/:id', deleteOne);

export default router