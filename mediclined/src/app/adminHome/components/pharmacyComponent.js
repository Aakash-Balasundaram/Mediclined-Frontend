import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { PHARMACY_URL } from "../../constants.js";
import secureLocalStorage from "react-secure-storage";

export default function Pharmacy() {
  const [product, setProduct] = useState({
    Name: "",
    Price: "",
    Clinic_ID: "",
    Type: "",
    Category: "",
    Strength_and_Form: "",
  });

  const [openProductDelete, setOpenProductDelete] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(product);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleGetAllProducts = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.get(PHARMACY_URL + "/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.MSG);
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
    }
  };

  const handleCreateProduct = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const url = product.Clinic_ID ? `${PHARMACY_URL}/product` : `${PHARMACY_URL}/Addproduct`;

      const data = {
        productName: product.ProductName,
        price: product.Price,
        clinicID: product.Clinic_ID,
      };

      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        showAlert("Product added successfully!", "success");
        handleGetAllProducts();
        setProduct({
          ProductName: "",
          Price: "",
          Quantity: "",
          Clinic_ID: "",
        });
      }
    } catch (error) {
      showAlert(error.response?.data?.ERR || "Error occurred", "error");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpenEditProduct(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.put(
        PHARMACY_URL,
        {
          productName: editingProduct.ProductName,
          price: editingProduct.Price,
          quantity: editingProduct.Quantity,
          clinicID: editingProduct.Clinic_ID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setOpenEditProduct(false);
        showAlert("Product updated successfully!", "success");
        handleGetAllProducts();
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
    }
  };

  const handleDeleteProduct = async (productName) => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.delete(PHARMACY_URL + `/${productName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        showAlert("Product deleted successfully!", "success");
        handleGetAllProducts();
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
    }
  };

  const handleClickOpenProductDelete = (productName) => {
    setProduct((prev) => ({ ...prev, ProductName: productName }));
    setOpenProductDelete(true);
  };

  const handleClose = () => {
    setOpenProductDelete(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" gap={2}>
        <Box width="50%">
          <Typography variant="h6">Add Product Details</Typography>
          <TextField
            name="ProductName"
            label="Product Name"
            value={product.ProductName}
            onChange={handleChangeProduct}
            fullWidth
            margin="dense"
          />
          <TextField
            name="Price"
            label="Price"
            value={product.Price}
            onChange={handleChangeProduct}
            fullWidth
            margin="dense"
          />
          <TextField
            name="Quantity"
            label="Quantity"
            value={product.Quantity}
            onChange={handleChangeProduct}
            fullWidth
            margin="dense"
          />
          <TextField
            name="Clinic_ID"
            label="Clinic ID"
            value={product.Clinic_ID}
            onChange={handleChangeProduct}
            fullWidth
            margin="dense"
          />
          <Button variant="contained" color="primary" onClick={handleCreateProduct} fullWidth>
            Add Product
          </Button>
        </Box>
      </Box>

      <Box display="flex" gap={2}>
        <Box width="50%">
          <Typography variant="h6">All Products</Typography>
          <div>
            {products.map((product) => (
              <Box key={product.ProductName} p={2} border="1px solid gray" borderRadius="5px">
                <Typography>Name: {product.ProductName}</Typography>
                <Typography>Price: ${product.Price}</Typography>
                <Typography>Quantity: {product.Quantity}</Typography>
                <IconButton onClick={() => handleEditProduct(product)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleClickOpenProductDelete(product.ProductName)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </div>
        </Box>
      </Box>

      <Dialog open={openProductDelete} onClose={handleClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteProduct(product.ProductName)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
