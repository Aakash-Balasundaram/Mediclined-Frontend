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
  Alert,
  Chip,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { 
  Add, 
  Search, 
  Download, 
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showBillDialog, setShowBillDialog] = useState(false);
  const billRef = useRef();

  // Sample data
  const [products] = useState([
    { id: 1, name: 'Paracetamol', stock: 500, price: 5.99, category: 'Pain Relief', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin', stock: 200, price: 12.99, category: 'Antibiotics', status: 'Low Stock' },
    { id: 3, name: 'Aspirin', stock: 300, price: 4.99, category: 'Pain Relief', status: 'In Stock' },
    { id: 4, name: 'Cetirizine', stock: 50, price: 8.99, category: 'Allergy', status: 'Critical Stock' },
  ]);

  const [orders] = useState([
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

  // Dashboard Stats Component
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Pharmacy Dashboard</title>
      </Head>

      <div className="p-6">
        {/* Header */}
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

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Tabs */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 3,
          '& .MuiTab-root': {
            minHeight: '64px',
            fontSize: '1rem'
          }
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            className="bg-white rounded-t-lg shadow-sm"
          >
            <Tab 
              label="Inventory" 
              icon={<Inventory />} 
              iconPosition="start"
              className="font-semibold"
            />
            <Tab 
              label="Orders" 
              icon={<ShoppingCart />} 
              iconPosition="start"
              className="font-semibold"
            />
          </Tabs>
        </Box>

        {/* Inventory Tab */}
        {activeTab === 0 && (
          <div className="mt-4">
            <Card className="shadow-lg">
              <CardContent>
                <div className="mb-6">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products by name, category..."
                    InputProps={{
                      startAdornment: <Search className="mr-2 text-gray-400" />,
                      className: "bg-white"
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <TableContainer component={Paper} className="shadow-md">
                  <Table>
                    <TableHead className="bg-gray-50">
                      <TableRow>
                        <TableCell className="font-bold">Product Name</TableCell>
                        <TableCell className="font-bold">Category</TableCell>
                        <TableCell className="font-bold">Stock</TableCell>
                        <TableCell className="font-bold">Status</TableCell>
                        <TableCell className="font-bold">Price</TableCell>
                        <TableCell className="font-bold">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow 
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Chip 
                              label={product.category}
                              size="small"
                              className="bg-blue-100 text-blue-700"
                            />
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Chip 
                              label={product.status}
                              size="small"
                              className={
                                product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                                product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }
                            />
                          </TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="outlined"
                              className="border-blue-500 text-blue-500 hover:bg-blue-50"
                              onClick={() => setOpenAddProduct(true)}
                            >
                              Update Stock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 1 && (
          <div className="mt-4">
            <Card className="shadow-lg">
              <CardContent>
                <TableContainer component={Paper} className="shadow-md">
                  <Table>
                    <TableHead className="bg-gray-50">
                      <TableRow>
                        <TableCell className="font-bold">Order ID</TableCell>
                        <TableCell className="font-bold">Customer</TableCell>
                        <TableCell className="font-bold">Date</TableCell>
                        <TableCell className="font-bold">Items</TableCell>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="font-bold">Status</TableCell>
                        <TableCell className="font-bold">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow 
                          key={order.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items.length} items</TableCell>
                          <TableCell className="font-medium">${order.total}</TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              size="small"
                              className={
                                order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                'bg-orange-100 text-orange-700'
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Print />}
                              onClick={() => generateBill(order)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Generate Bill
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Product Dialog */}
        <Dialog 
          open={openAddProduct} 
          onClose={() => setOpenAddProduct(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="bg-gray-50 flex justify-between items-center">
            <Typography variant="h6" className="font-bold">Add New Product</Typography>
            <IconButton onClick={() => setOpenAddProduct(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent className="mt-4">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                className="bg-white"
              />
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                className="bg-white"
              />
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                variant="outlined"
                className="bg-white"
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                className="bg-white"
              />
            </div>
          </DialogContent>
          <DialogActions className="p-4">
            <Button 
              onClick={() => setOpenAddProduct(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={() => setOpenAddProduct(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Product
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bill Generation Dialog */}
        <Dialog 
          open={showBillDialog} 
          onClose={() => setShowBillDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="bg-gray-50 flex justify-between items-center">
            <Typography variant="h6" className="font-bold">Order Bill</Typography>
            <IconButton onClick={() => setShowBillDialog(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <div className="p-6" ref={billRef}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-2">
                    <LocalPharmacy className="text-4xl text-blue-600 mr-2" />
                    <Typography variant="h4" className="font-bold text-gray-700">
                      Pharmacy Name
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" className="text-gray-500">
                    Order Summary for {selectedOrder.customer}
                  </Typography>
                </div>
                <div className="mb-4">
                  <Typography variant="h6" className="font-semibold text-gray-700">
                    Order Details
                  </Typography>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <Typography variant="body2" className="text-gray-500">
                      Order ID: <span className="font-medium text-gray-700">{selectedOrder.id}</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Order Date: <span className="font-medium text-gray-700">{selectedOrder.date}</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Payment Method: <span className="font-medium text-gray-700">{selectedOrder.paymentMethod}</span>
                    </Typography>
                  </div>
                </div>
                <div className="mb-4">
                  <Typography variant="h6" className="font-semibold text-gray-700">
                    Items
                  </Typography>
                  <TableContainer component={Paper} className="mt-2">
                    <Table>
                      <TableHead className="bg-gray-100">
                        <TableRow>
                          <TableCell className="font-bold">Name</TableCell>
                          <TableCell className="font-bold">Quantity</TableCell>
                          <TableCell className="font-bold">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="text-right">
                  <Typography variant="h6" className="font-semibold text-gray-700">
                    Total: ${selectedOrder.total}
                  </Typography>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions className="p-4">
            <Button 
              onClick={() => setShowBillDialog(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
