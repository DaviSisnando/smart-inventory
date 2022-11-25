import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne } from '../controllers/user'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/:email/:password', listOne);
router.put('/:id/:password', updateOne);
router.delete('/:id', deleteOne);

export default router