import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { ShoppingBag, Eye, X, CheckCircle2, Clock, Truck, PackageCheck, Search } from 'lucide-react';

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true);
      // PATCH /api/admin/orders/:id/status via Express API
      const res = await axiosClient.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      
      setOrders(prev => prev.map(o => o.id === orderId ? res.data : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(res.data);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update status: " + (err.response?.data?.error || err.message));
    } finally {
      setUpdatingStatus(false);
    }
  };

  const statusColors = {
    'Pending': 'bg-amber-100 text-amber-800 border-amber-300',
    'Processing': 'bg-blue-100 text-blue-800 border-blue-300',
    'Shipped': 'bg-purple-100 text-purple-800 border-purple-300',
    'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-300'
  };

  const statusIcons = {
    'Pending': Clock,
    'Processing': PackageCheck,
    'Shipped': Truck,
    'Delivered': CheckCircle2
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch = order.id?.toLowerCase().includes(search.toLowerCase()) ||
                          order.userId?.toLowerCase().includes(search.toLowerCase()) ||
                          order.items?.some(i => i.name?.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-sage-950 font-bold flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-gold-600" />
          Order Management
        </h1>
        <p className="text-sage-600 text-sm mt-1">
          Review placed orders, view customer details, and update fulfillment status (Express API)
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/70 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by Order ID, User ID, or item name..."
            className="input-premium pl-12"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-premium"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center py-12 text-sage-600 font-medium">Loading orders list...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-white/70">
          <ShoppingBag className="w-12 h-12 text-sage-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-sage-900">No Orders Found</h3>
          <p className="text-sage-600 text-sm mt-1">
            {search || statusFilter !== 'ALL'
              ? 'No orders match your filter criteria.'
              : 'Orders placed by customers will automatically appear here.'}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl border border-white/70 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-sage-800">
              <thead className="bg-sage-100/60 border-b border-sage-200/60 text-xs font-semibold uppercase tracking-wider text-sage-700">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Items Count</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Fulfillment Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Clock;
                  return (
                    <tr key={order.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-sage-950">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-sage-600">
                        {order.userId?.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-sage-800">
                        {order.items?.reduce((acc, item) => acc + (item.qty || 1), 0) || 0} items
                      </td>
                      <td className="px-6 py-4 font-bold text-sage-950">
                        ${order.total?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status] || 'bg-sage-100'}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{order.status || 'Pending'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="btn-secondary py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-sage-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-2xl p-6 rounded-3xl border border-white/80 shadow-2xl bg-white/95 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-sage-100">
              <div>
                <h2 className="font-heading text-2xl font-bold text-sage-950">
                  Order #{selectedOrder.id}
                </h2>
                <p className="text-xs text-sage-500 font-mono mt-0.5">
                  User ID: {selectedOrder.userId}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-sage-100 text-sage-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Update Dropdown (Section 7c) */}
            <div className="my-6 p-4 rounded-2xl bg-sage-50 border border-sage-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700">
                  Fulfillment Status
                </label>
                <p className="text-xs text-sage-500 mt-0.5">Update status manually as order moves through fulfillment</p>
              </div>

              <select
                disabled={updatingStatus}
                value={selectedOrder.status || 'Pending'}
                onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                className="input-premium sm:w-48 text-sm font-semibold"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Purchased Items Table */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-sage-950">Items Purchased</h3>
              <div className="border border-sage-200 rounded-2xl overflow-hidden divide-y divide-sage-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between bg-white">
                    <div>
                      <div className="font-semibold text-sage-900 text-sm">{item.name}</div>
                      <div className="text-xs text-sage-500 font-mono">Product ID: {item.productId}</div>
                    </div>
                    <div className="text-right text-sm">
                      <span className="text-sage-600">{item.qty} × ${item.price?.toFixed(2)}</span>
                      <div className="font-bold text-sage-950">${((item.qty || 1) * (item.price || 0)).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-4 border-t border-sage-200 flex items-center justify-between font-bold text-lg text-sage-950">
              <span>Order Total</span>
              <span>${selectedOrder.total?.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-secondary py-2.5 px-6 text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersManager;
