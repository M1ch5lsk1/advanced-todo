import { Request, Response, NextFunction } from 'express';
import { items, Item } from '../models/item';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || '';
if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
    }
const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

export const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.error("Error connecting to MongoDB:", error);
  }
}
run()
// Create an item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newItem: Item = { id: Date.now(), name };
    items.push(newItem);
    console.log(`Item created: ${JSON.stringify(newItem)}`);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = items.find((i) => i.id === id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getItemByName = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const item = items.find((i) => i.name == name);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    items[itemIndex].name = name;
    res.json(items[itemIndex]);
  } catch (error) {
    next(error);
  }
};

// Delete an item
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = await req.body;
    console.log(`Login attempt with name: ${email}`);
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Szukamy użytkownika po name
    const user = await client.db("advanced-TODO").collection("users").findOne({ email: email});
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Sprawdzamy hasło (tu zakładamy, że hasło jest przechowywane jawnie - w praktyce powinno być hashowane!)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Jeśli wszystko OK
    res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    next(error);
  }
};