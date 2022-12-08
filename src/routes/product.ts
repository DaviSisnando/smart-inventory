import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne, listByName } from '../controllers/product'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/:id', listOne);
router.get('/find/:query',listByName)
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router