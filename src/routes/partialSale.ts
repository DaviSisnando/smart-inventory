import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne, profitData, productQuantityProfit } from '../controllers/partialSale'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/date/:start/:end', profitData);
router.get('/product/:id/:start/:end', productQuantityProfit);
router.get('/:id', listOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router