import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { addItem } from "../services";
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, {useState} from 'react'
import { Item } from "../Types/Types";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';

export default function AddItem({ items }: {items: Item[]}) {

  const dispatch = useDispatch();

  const addItemState = useSelector((state: any) => state.addItem);

  const {getAccessTokenSilently} = useAuth0()

  const [image, setImage]:any = useState<string | File>("")

  const handleClickOpen = () => {
    dispatch({type: 'ADDITEM_OPEN'});
  };

  const handleClose = () => {
    dispatch({type: 'ADDITEM_OPEN'});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = await new FormData()
    formData.append('image', image);
    formData.append('title', addItemState.title);
    formData.append('description', addItemState.description);
    formData.append('category', addItemState.category);
    formData.append('price', addItemState.price);
    formData.append('quantity', addItemState.quantity);
    formData.append('location', addItemState.location);

    await postItem(formData)
    if (e.target) {
      const target = e.target as HTMLFormElement
      target.reset();
    }
    handleClose()
  };


  const postItem = async (data: any) => {
    try {
      const token = await getAccessTokenSilently()
      const post = await addItem(data, token);
      dispatch({ type: 'APP_ITEMS', payload: [...items, post] });
      dispatch({ type: 'APP_FILTERED_ITEMS', payload: [...items, post] });
    } catch (e) {
      console.log(e);
    }
  }

  let itemPosition = {
    display: "flex",
    flexDirection: "row"
  }

  return (
    <div>
      <Button id="sellNow" variant="contained" startIcon={<AddIcon />} sx={{ display: { xs: 'none', md: 'flex', background: '#E25F1C' } }} onClick={handleClickOpen}>
        Sell Now
      </Button>
      <Dialog open={addItemState.open} onClose={handleClose} data-testid='closebutton' >
        <DialogActions>
          <IconButton sx={{ padding: 0 }} onClick={handleClose} >
            <CloseIcon sx={{ fontSize: '1.3em' }} />
          </IconButton>
        </DialogActions>
        <DialogTitle sx={{ textAlign: 'center', padding: 0 }}>Add new item for sale</DialogTitle>
        <DialogContent>
          <form
          id="sellForm"
            onSubmit={e => handleSubmit(e)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "2rem",
              maxWidth: '600px'
            }}
          >
            <TextField
              sx={{ width: '30em', marginBottom: '0.7em' }}
              label="Title"
              type="text"
              variant="outlined"
              required
              data-testid="Title-1"
              inputProps={{ "data-testid": "title-input" }}
              value={addItemState.title}
              onChange={(e) => dispatch({type:'ADDITEM_TITLE', payload: e.target.value})}
            />
            <TextField
              sx={{ width: '30em', marginBottom: '0.7em' }}
              multiline
              rows={5}
              label="Description"
              variant="standard"
              data-testid="Description-1"
              inputProps={{ "data-testid": "desc-input" }}
              required
              value={addItemState.description}
              onChange={(e) => dispatch({type:'ADDITEM_DESCRIPTION', payload: e.target.value})}
            />
            <FormControl id="cat-select-label" sx={{ width: '30em', marginBottom: '0.7em' }}>
              <InputLabel id="cat-select-label">Category</InputLabel>
              <Select
                labelId="cat-select-label"
                value={addItemState.category}
                label="Category"
                data-testid="Category-1"
                inputProps={{ "data-testid": "cat-input" }}
                onChange={(e) => dispatch({type:'ADDITEM_CATEGORY', payload: e.target.value})}
              >
                <MenuItem value={'clothes'}>Clothes</MenuItem>
                <MenuItem value={'accessories'}>Accesories</MenuItem>
                <MenuItem value={'home'}>Home & Garden</MenuItem>
                <MenuItem value={'electronics'}>Electronics</MenuItem>
                <MenuItem value={'hobbies'}>Hobbies</MenuItem>
                <MenuItem value={'freebies'}>Freebies</MenuItem>
              </Select>
            </FormControl>
            <div style={itemPosition as React.CSSProperties}>
              <TextField
                sx={{ width: '10em', marginBottom: '0.7em' }}
                label="Price"
                variant="outlined"
                required
                data-testid="Price-1"
                inputProps={{ "data-testid": "price-input" }}
                value={addItemState.price}
                onChange={(e) =>dispatch({type:'ADDITEM_PRICE', payload: e.target.value})}
              />

              <TextField
                sx={{ width: '10em', marginBottom: '0.7em' }}
                label="Quantity"
                variant="outlined"
                required
                data-testid="Quantity-1"
                inputProps={{ "data-testid": "quant-input" }}
                value={addItemState.quantity}
                onChange={(e) => dispatch({type:'ADDITEM_QUANTITY', payload: e.target.value})}
              />

              <TextField
                sx={{ width: '10em', marginBottom: '0.7em' }}
                label="Location"
                variant="outlined"
                required
                data-testid="Location-1"
                inputProps={{ "data-testid": "location-input" }}
                value={addItemState.location}
                onChange={(e) => dispatch({type:'ADDITEM_LOCATION', payload:e.target.value})}
              />
            </div>

              <input
              accept="image/*"
              style={{ display: 'none', margin: "2px" }}
              id="contained-button-file"
              multiple
              data-testid="Image-1"
              type="file"
              onChange={(e) => setImage(e.target.files === null ? "" : e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">

                  <PhotoCamera />
                </IconButton>
              </label>


            <Button
              sx={{ width: '16em', height: '3em', margin: 1 }}
              variant="contained"
              color="primary"
              type="submit"
              data-testid="Add Item-1"
            >
              Add item
            </Button>
          </form>
        </DialogContent>

      </Dialog>
    </div >
  );
}

