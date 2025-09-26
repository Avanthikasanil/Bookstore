import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroupExample from '../form/ProductForm';



export default function AddDrawer({ open, onClose, products, setProducts }) {
  return (
    
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 2, position: 'relative' }}>

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/*  Your Form Component */}
        <FormGroupExample
          modalStatus={open}
          setShowModal={onClose}
          products={products}
          setProducts={setProducts}
        />
      </Box>
    </Drawer>
  );
}



