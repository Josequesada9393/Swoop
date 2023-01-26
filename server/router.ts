
import express from 'express'
const route = express.Router()
import userController from './controllers/userController';
import itemController from './controllers/itemController';

import orderController from './controllers/orderController';
import upload from './middleware/upload'



route.post('/register', upload.single('avatar'), userController.createProfile);
route.put('/editProfile/:id', userController.updateProfile)
route.get('/users/:id', userController.getProfile)
route.get('/users', userController.getUsers);
route.get('/users/:email', userController.getUserByEmail)

route.get('/items', itemController.getItems);
route.get('items/:category', itemController.getByCategory);
route.get('/items/:id', itemController.getItemById);

route.get('/order/:id',orderController.getOrder);
route.post('/order/:id',orderController.checkout);


export default route;