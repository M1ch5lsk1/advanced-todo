import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  getItemByName,
  updateItem,
  deleteItem,
  login
} from '../controllers/itemController';
// import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
const router = Router();

dotenv.config();

router.get('/', getItems);
router.get('/:name', getItemByName);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.post('/login', login);

export default router;