import {Router} from "express"; 
import user from "./user";
import product from "./product";
import inventoryCategory from './inventoryCategory';
import shipment from './shipment';
import partialSale from './partialSale';
import sales from './sales';

const router = Router();

router.use("/users", user);
router.use("/products", product);
router.use("/inventoryCategory", inventoryCategory);
router.use("/shipment", shipment);
router.use("/partialSale", partialSale);
router.use("/sales", sales);

export default router