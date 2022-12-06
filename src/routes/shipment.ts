import {Router} from "express"; 

import { create, listAll, listOne, updateOne, deleteOne, getTotalShipment, totalSpent } from '../controllers/shipment'

const router = Router();

router.post('/', create);
router.get('/', listAll);
router.get('/total', getTotalShipment);
router.get('/product/:id/:start/:end', totalSpent);
router.get('/:id', listOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router