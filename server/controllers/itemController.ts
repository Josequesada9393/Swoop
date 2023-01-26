import Item from '../models/item'
// const { Request, Response, NextFunction } =  require('express');
import { Request, Response } from "express";
import axios from 'axios';


export const getItems = async (req:Request, res:Response) => {
  try {
    const items = await Item.find();
    return res.status(200).send(items);
  } catch (e) {
    res.status(500);
  }
};

export const getByCategory = async (req:Request, res:Response) => {
  try {

  } catch (e) {
    res.status(500);
  }
};

export const getItemById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id
    const item = await Item.findById(id)
    return res.status(200).json(item);

  } catch (e) {
    res.status(500);
  }
};

export const createItem = async (req:any, res:Response) => {
  try {
    const accessToken = await req.headers.authorization.split(' ')[1]
    const response = await fetch('https://dev-sydr5gofiqca2n6a.us.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    const userInfo = await response.json()

    const newItem = await Item.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      location: req.body.location,
      image: req.file ? req.file.path : undefined,
      date_added: Date.now(),
      seller: userInfo.email
    });
    res.status(201).json(newItem);
  } catch (e) {
    res.status(500);
  }
};

export const updateItem = async (req:Request, res:Response) => {
  try {
  } catch (e) {
    res.status(500);
  }
};

export const deleteItem = async (req:Request, res:Response) => {
  try {

  } catch (e) {
    res.status(500);
  }
};

export default { getItemById, getByCategory, deleteItem, updateItem, createItem, getItems }

