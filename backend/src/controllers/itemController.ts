import { Request, Response, NextFunction } from 'express';
import { items, Item } from '../models/item';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await client.db("advanced-TODO").collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Ustawiamy cookie z danymi użytkownika (np. email i id)
    // res.cookie('user', JSON.stringify({ email: user.email, id: user._id }), {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 dzień
    //   sameSite: 'lax',
    //   secure: process.env.NODE_ENV === 'production',
    // });
    delete user.password; // Usuwamy hasło przed wysłaniem
    res.status(200).json({ message: 'Login successful', user});
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body; // Hasło powinno być haszowane w produkcji
    if (!newUser.email || !newUser.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await client.db("advanced-TODO").collection("users").findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists'});
    }

    const result = await client.db("advanced-TODO").collection("users").insertOne(newUser);
    
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    next(error);
  }
}

export const toDoCreateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    
    // if (!title || !userId) {
    //   return res.status(400).json({ message: 'Title and userId are required' });
    // }

    
    const findUser = await client.db("advanced-TODO").collection("users").findOne({ _id: new ObjectId(req.body.userId) });
    if (!findUser) {
      return res.status(401).json({ message: 'Invalid userId' });
    }

    // const result = await client.db("advanced-TODO").collection("todos").updateOne();
    console.log(findUser);
    
    // res.status(201).json({ message: 'To-Do item created successfully', toDoId: result.insertedId });
  } catch (error) {
    next(error);
  }
}