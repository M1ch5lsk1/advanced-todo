import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  getItemByName,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = Router();

router.get('/', getItems);
router.get('/:name', getItemByName);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;