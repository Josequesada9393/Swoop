
import express from 'express'
const authRouter = express.Router()

import itemController from './controllers/itemController';

import upload from './middleware/upload'



authRouter.post('/items',  upload.single('image'), itemController.createItem)
authRouter.put('/editItem/:id', upload.single('image'), itemController.updateItem)
authRouter.delete('/items/:id', itemController.deleteItem);



export default authRouter;