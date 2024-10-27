"use client"

import Head from "../header";
import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add,
  Search,
  Print,
  Inventory,
  ShoppingCart,
  LocalPharmacy,
  TrendingUp,
  Assignment,
  Close
} from '@mui/icons-material';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showBillDialog, setShowBillDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const billRef = useRef();

  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: '',
    price: ''
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Paracetamol', stock: 500, price: 5.99, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin', stock: 200, price: 12.99, status: 'Low Stock' },
    { id: 3, name: 'Aspirin', stock: 300, price: 4.99, status: 'In Stock' },
    { id: 4, name: 'Cetirizine', stock: 50, price: 8.99, status: 'Critical Stock' },
  ]);

  const handleAddProduct = () => {
    const stock = parseInt(newProduct.stock);
    const price = parseFloat(newProduct.price);
  
    if (!newProduct.name || stock < 0 || price < 0) {
      alert('Please provide valid product details.');
      return;
    }
  
    const newProductWithStatus = {
      id: products.length + 1,
      ...newProduct,
      stock: stock,
      price: price,
      status: determineStatus(stock),
    };
  
    setProducts([...products, newProductWithStatus]);
    setNewProduct({ name: '', stock: '', price: '' });
    setOpenAddProduct(false);
  };
  

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2024-10-27',
      items: [
        { name: 'Paracetamol', quantity: 2, price: 5.99 },
        { name: 'Aspirin', quantity: 1, price: 4.99 }
      ],
      status: 'Pending',
      total: 16.97,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2024-10-27',
      items: [
        { name: 'Amoxicillin', quantity: 1, price: 12.99 }
      ],
      status: 'Completed',
      total: 12.99,
      paymentMethod: 'Cash'
    }
  ]);

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleSelectPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowBillDialog(true);
  };

  const generatePrescriptionBill = () => {
    if (!selectedPrescription) return;

    setSelectedOrder(selectedPrescription);
    setShowBillDialog(true);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'PRE-001',
      doctor: 'Dr. Smith',
      patient: 'John Doe',
      medication: 'Ibuprofen',
      dosage: '200mg twice daily',
      duration: '5 days',
      status: 'Pending'
    },
    {
      id: 'PRE-002',
      doctor: 'Dr. Johnson',
      patient: 'Jane Smith',
      medication: 'Amoxicillin',
      dosage: '500mg thrice daily',
      duration: '7 days',
      status: 'Completed'
    }
  ]);

  const [newPrescription, setNewPrescription] = useState({
    doctor: '',
    patient: '',
    medication: '',
    dosage: '',
    duration: ''
  });

  const [openAddPrescription, setOpenAddPrescription] = useState(false);

  const handleNewProductChange = (field) => (event) => {
    setNewProduct({
      ...newProduct,
      [field]: event.target.value
    });
  };

  const handleEditProductChange = (field) => (event) => {
    setEditingProduct({
      ...editingProduct,
      [field]: event.target.value
    });
  };

  const determineStatus = (stock) => {
    if (stock > 300) return 'In Stock';
    if (stock > 100) return 'Low Stock';
    return 'Critical Stock';
  };

  const handleAddProduct = () => {
    const stock = parseInt(newProduct.stock);
    const newProductWithStatus = {
      id: products.length + 1,
      ...newProduct,
      stock: stock,
      price: parseFloat(newProduct.price),
      status: determineStatus(stock)
    };
    
    setProducts([...products, newProductWithStatus]);
    setNewProduct({ name: '', stock: '', price: '' });
    setOpenAddProduct(false);
  };

  const handleEditProduct = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        const stock = parseInt(editingProduct.stock);
        return {
          ...editingProduct,
          stock: stock,
          price: parseFloat(editingProduct.price),
          status: determineStatus(stock)
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setOpenEditProduct(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setOpenEditProduct(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const generateBill = (order) => {
    setSelectedOrder(order);
    setShowBillDialog(true);
  };

  const downloadPDF = async () => {
    if (billRef.current) {
      try {
        const dataUrl = await toPng(billRef.current, { quality: 0.95 });
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`pharmacy-bill-${selectedOrder.id}.pdf`);
      } catch (err) {
        console.error('Error generating PDF:', err);
      }
    }
  };

  const handleAddPrescription = () => {
    const newPrescription = {
      id: `PRE-${prescriptions.length + 1}`,
      doctor: '',
      patient: '',
      medication: '',
      dosage: '',
      duration: '',
      status: 'Pending'
    };
    
    setPrescriptions([...prescriptions, newPrescription]);
  };

  const handlePrescriptionChange = (field) => (event) => {
    setNewPrescription({
      ...newPrescription,
      [field]: event.target.value
    });
  };

  const handleAddNewPrescription = () => {
    const newPrescriptionWithStatus = {
      ...newPrescription,
      status: 'Pending'
    };
    
    setPrescriptions([...prescriptions, newPrescriptionWithStatus]);
    setNewPrescription({ doctor: '', patient: '', medication: '', dosage: '', duration: '' });
    setOpenAddPrescription(false);
  };

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { title: 'Total Products', value: products.length, icon: <Inventory className="text-blue-500" />, color: 'bg-blue-50' },
        { title: 'Pending Orders', value: orders.filter(o => o.status === 'Pending').length, icon: <ShoppingCart className="text-orange-500" />, color: 'bg-orange-50' },
        { title: 'Low Stock Items', value: products.filter(p => p.status === 'Low Stock').length, icon: <TrendingUp className="text-red-500" />, color: 'bg-red-50' },
        { title: 'Completed Orders', value: orders.filter(o => o.status === 'Completed').length, icon: <Assignment className="text-green-500" />, color: 'bg-green-50' }
      ].map((stat, index) => (
        <Card key={index} className={`${stat.color} border-none shadow-md hover:shadow-lg transition-shadow`}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <Typography variant="h6" className="font-semibold text-gray-700">{stat.title}</Typography>
              <Typography variant="h4" className="mt-2 font-bold">{stat.value}</Typography>
            </div>
            <div className="p-4 rounded-full bg-white shadow-sm">{stat.icon}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <Head />
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LocalPharmacy className="text-4xl text-blue-600" />
              <div>
                <Typography variant="h5" className="text-gray-800 font-bold">
                  Pharmacy Dashboard
                </Typography>
                <Typography variant="subtitle2" className="text-gray-500">
                  Manage inventory and orders efficiently
                </Typography>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setOpenAddProduct(true)}
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Add New Product
            </Button>
          </div>
        </div>

        <DashboardStats />

        <Tabs value={activeTab} onChange={handleTabChange} className="mb-6">
          <Tab label="Inventory" />
          <Tab label="Orders" />
          <Tab label="Prescriptions" />
        </Tabs>

        {activeTab === 0 && (
          <div>
            <TextField
              variant="outlined"
              placeholder="Search Products..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
            />
            <TableContainer component={Paper} className="shadow-lg">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip label={product.status} color={
                          product.status === 'In Stock' ? 'success' : 
                          product.status === 'Low Stock' ? 'warning' : 'error'
                        } />
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(product)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 1 && (
          <div>
            <TableContainer component={Paper} className="shadow-lg">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => generateBill(order)}>
                          Generate Bill
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* Dialog for Adding New Product */}
        <Dialog open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
            <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.name}
            onChange={handleNewProductChange('name')}
            />
            <TextField
            label="Stock"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.stock}
            onChange={handleNewProductChange('stock')}
            />
            <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.price}
            onChange={handleNewProductChange('price')}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenAddProduct(false)} color="secondary">
            Cancel
            </Button>
            <Button onClick={handleAddProduct} color="primary">
            Add Product
            </Button>
        </DialogActions>
        </Dialog>

                {/* Dialog for Editing Product */}
        <Dialog open={openEditProduct} onClose={() => setOpenEditProduct(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
            {editingProduct && (
            <>
        <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={editingProduct.name}
        onChange={handleEditProductChange('name')}
        />
        <TextField
        label="Stock"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={editingProduct.stock}
        onChange={handleEditProductChange('stock')}
        />
        <TextField
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={editingProduct.price}
        onChange={handleEditProductChange('price')}
        />
    </>
    )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenEditProduct(false)} color="secondary">
            Cancel
            </Button>
            <Button onClick={handleEditProduct} color="primary">
            Update Product
            </Button>
        </DialogActions>
        </Dialog>

        {/* Dialog for Viewing and Downloading Bill */}
        <Dialog open={showBillDialog} onClose={() => setShowBillDialog(false)}>
          <DialogTitle>Bill for Order {selectedOrder && selectedOrder.id}</DialogTitle>
          <DialogContent ref={billRef}>
            <Typography variant="h6">Customer: {selectedOrder && selectedOrder.customer}</Typography>
            <Typography variant="subtitle1">Date: {selectedOrder && selectedOrder.date}</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder && selectedOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6">Total: ${selectedOrder && selectedOrder.total.toFixed(2)}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={downloadPDF} color="primary">
              Download Bill
            </Button>
            <Button onClick={() => setShowBillDialog(false)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {activeTab === 2 && (
        <div>
          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Tests</TableCell>
                  <TableCell>Medicines</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.patient}</TableCell>
                    <TableCell>{prescription.doctor}</TableCell>
                    <TableCell>{prescription.diagnosis}</TableCell>
                    <TableCell>
                      {prescription.tests.join(', ')}
                    </TableCell>
                    <TableCell>
                      {prescription.medicines.length > 0 ? prescription.medicines[0].name : 'No medicines'}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleSelectPrescription(prescription)}>
                        View Bill
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Dialog for Viewing and Downloading Prescription Bill */}
      <Dialog open={showBillDialog} onClose={() => setShowBillDialog(false)}>
        <DialogTitle>Prescription Bill for {selectedPrescription && selectedPrescription.patient}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Patient: {selectedPrescription && selectedPrescription.patient}</Typography>
          <Typography variant="body1">Doctor: {selectedPrescription && selectedPrescription.doctor}</Typography>
          <Typography variant="body1">Diagnosis: {selectedPrescription && selectedPrescription.diagnosis}</Typography>
          <Typography variant="body1">Tests:</Typography>
          <ul>
            {selectedPrescription && selectedPrescription.tests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
          <Typography variant="body1">Medicines:</Typography>
          <ul>
            {selectedPrescription && selectedPrescription.medicines.length > 0 ? 
              selectedPrescription.medicines.map((medicine, index) => (
                <li key={index}>
                  {medicine.name}: {medicine.dosage}
                </li>
              )) : <li>No medicines prescribed</li>}
          </ul>
          <Typography variant="body1">Total: $0.00</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={downloadPDF} color="primary">
            Download PDF
          </Button>
          <Button onClick={() => setShowBillDialog(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}}