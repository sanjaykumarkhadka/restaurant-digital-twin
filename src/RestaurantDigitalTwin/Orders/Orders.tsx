import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  Utensils,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  ChefHat,
  Coffee,
  ShoppingBag,
  Percent,
  Star,
  Activity,
  BarChart2,
  Brain,
  QrCode,
  Table as TableIcon,
  Send,
  Filter,
  Search,
  Plus,
  History,
  Timer,
  DollarSign,
  Bell,
  Settings,
  Printer,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCcw
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Textarea } from "@/components/ui/textarea";

// Mock order data
const orderData = {
  activeOrders: [
    {
      id: 'ORD001',
      table: 'T12',
      items: [
        { name: 'Grilled Salmon', quantity: 2, price: 24.99, special: 'No spicy' },
        { name: 'Caesar Salad', quantity: 1, price: 12.99, special: 'Extra cheese' }
      ],
      status: 'preparing',
      timeElapsed: '12:30',
      priority: 'high',
      server: 'John D.',
      totalAmount: 62.97
    },
    {
      id: 'ORD002',
      table: 'T08',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { name: 'Tiramisu', quantity: 2, price: 8.99 }
      ],
      status: 'ready',
      timeElapsed: '08:45',
      priority: 'medium',
      server: 'Sarah M.',
      totalAmount: 36.97
    }
  ],
  orderHistory: [
    {
      date: '2024-03-20',
      orders: 142,
      revenue: 4250.80,
      avgOrderValue: 29.93,
      topItems: ['Grilled Salmon', 'Tiramisu', 'Caesar Salad']
    },
    {
      date: '2024-03-19',
      orders: 156,
      revenue: 4890.50,
      avgOrderValue: 31.35,
      topItems: ['Margherita Pizza', 'Chocolate Cake', 'Steak']
    }
  ],
  popularItems: [
    { name: 'Grilled Salmon', orders: 450, revenue: 11245.50, rating: 4.8 },
    { name: 'Margherita Pizza', orders: 380, revenue: 7220.20, rating: 4.7 },
    { name: 'Tiramisu', orders: 290, revenue: 2610.10, rating: 4.9 }
  ],
  qrCodeMenu: {
    totalScans: 1250,
    activeUsers: 45,
    avgTimeSpent: '3:20',
    popularCategories: ['Main Course', 'Desserts', 'Beverages']
  },
  analytics: {
    preparationTime: {
      average: '18:30',
      target: '15:00',
      trend: 'improving'
    },
    orderAccuracy: 98.5,
    customerSatisfaction: 4.7,
    peakHours: [
      { hour: '12:00', orders: 45 },
      { hour: '13:00', orders: 62 },
      { hour: '19:00', orders: 58 },
      { hour: '20:00', orders: 51 }
    ]
  },
  aiInsights: [
    {
      type: 'prediction',
      title: 'Peak Hour Alert',
      description: 'Prepare for 30% more orders between 19:00-21:00',
      confidence: 92
    },
    {
      type: 'optimization',
      title: 'Menu Performance',
      description: 'Consider promoting Grilled Salmon - high margin, high satisfaction',
      confidence: 88
    }
  ]
};

// Enhance table status data
const tableStatus = {
  tables: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.5 ? 'occupied' : 'empty',
    seats: Math.floor(Math.random() * 3 + 2),
    reservationTime: Math.random() > 0.7 ? '19:30' : null,
    currentOrder: Math.random() > 0.5 ? 'ORD00' + Math.floor(Math.random() * 9 + 1) : null,
    serviceStatus: Math.random() > 0.5 ? 'served' : 'waiting',
    notes: '',
    canMerge: true,
    merged: false,
    mergedWith: [],
  }))
};

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [showTableView, setShowTableView] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableDetails, setShowTableDetails] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [tables, setTables] = useState(tableStatus.tables);

  // Handle table click
  const handleTableClick = (table) => {
    setSelectedTable(table);
    setShowTableDetails(true);
  };

  // Handle table drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tables);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTables(items);
  };

  // Handle table merge
  const handleTableMerge = (tableId, targetTableId) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          merged: true,
          mergedWith: [...table.mergedWith, targetTableId]
        };
      }
      if (table.id === targetTableId) {
        return {
          ...table,
          merged: true,
          mergedWith: [...table.mergedWith, tableId]
        };
      }
      return table;
    }));
  };

  // Update table notes
  const updateTableNotes = (tableId, notes) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, notes } : table
    ));
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-orange-900/20 to-red-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Order Hub Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 
            to-red-400 bg-clip-text text-transparent">
            Orders
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-orange-500/10 text-orange-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Order Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Order Monitoring
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowTableView(true)}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Order Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <ShoppingBag className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="outline">Today</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Active Orders</h3>
            <div className="text-2xl font-bold">{orderData.activeOrders.length}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <Badge variant="outline">Today</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Revenue</h3>
            <div className="text-2xl font-bold">
              ${orderData.orderHistory[0].revenue.toLocaleString()}
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Timer className="h-5 w-5 text-purple-500" />
            </div>
            <Badge variant="outline">Average</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Preparation Time</h3>
            <div className="text-2xl font-bold">{orderData.analytics.preparationTime.average}</div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <Badge variant="outline">Accuracy</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Order Accuracy</h3>
            <div className="text-2xl font-bold">{orderData.analytics.orderAccuracy}%</div>
          </div>
        </Card>
      </div>

      {/* Active Orders & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            Live Order Feed
          </h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {orderData.activeOrders.map((order) => (
                <Card key={order.id} className={`p-4 ${
                  order.status === 'ready' 
                    ? 'bg-green-500/10 border-green-500/30'
                    : order.priority === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-white/5'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{order.id}</Badge>
                      <div className="flex items-center gap-2">
                        <TableIcon className="h-4 w-4" />
                        <span>Table {order.table}</span>
                      </div>
                      <Badge className={
                        order.priority === 'high' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                      }>
                        {order.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{order.timeElapsed}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.quantity}x</span>
                          <span>{item.name}</span>
                          {item.special && (
                            <Badge variant="outline" className="text-xs">
                              {item.special}
                            </Badge>
                          )}
                        </div>
                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{order.server[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{order.server}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-500">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Order Analytics */}
        <div className="space-y-6">
          {/* Peak Hours Chart */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-400" />
              Peak Hours
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={orderData.analytics.peakHours}>
                <defs>
                  <linearGradient id="peakHoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  fill="url(#peakHoursGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Popular Items */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-yellow-400" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {orderData.popularItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 
                    to-red-400 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="bg-green-500/10">
                        ${item.revenue.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ShoppingBag className="h-4 w-4" />
                        {item.orders} orders
                      </div>
                      <div className="flex items-center gap-1 text-sm text-yellow-400">
                        <Star className="h-4 w-4" />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* QR Code Menu Stats */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <QrCode className="h-5 w-5 text-purple-400" />
            Digital Menu Performance
          </h3>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Update Menu
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg bg-purple-500/10">
            <div className="text-2xl font-bold">{orderData.qrCodeMenu.totalScans}</div>
            <div className="text-sm text-muted-foreground">Total Scans</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10">
            <div className="text-2xl font-bold">{orderData.qrCodeMenu.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold">{orderData.qrCodeMenu.avgTimeSpent}</div>
            <div className="text-sm text-muted-foreground">Avg. Time Spent</div>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/10">
            <div className="text-2xl font-bold">{orderData.qrCodeMenu.popularCategories[0]}</div>
            <div className="text-sm text-muted-foreground">Top Category</div>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-purple-500/10">
                {insight.confidence}% Confidence
              </Badge>
              <Button variant="outline" size="sm">Take Action</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          New Order
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <Printer className="h-4 w-4" />
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-orange-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Table View Dialog */}
      <Dialog open={showTableView} onOpenChange={setShowTableView}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TableIcon className="h-5 w-5" />
                Restaurant Floor Plan
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMiniMap(!showMiniMap)}
              >
                {showMiniMap ? 'Hide' : 'Show'} Mini Map
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-4 gap-4">
            {/* Main Table Grid */}
            <div className="col-span-3">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tables" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-5 gap-4"
                    >
                      {tables.map((table, index) => (
                        <Draggable
                          key={table.id}
                          draggableId={`table-${table.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 rounded-lg border-2 transition-colors cursor-pointer 
                                ${table.status === 'occupied' 
                                  ? 'bg-red-500/10 border-red-500/50' 
                                  : 'bg-green-500/10 border-green-500/50'}
                                ${table.merged ? 'ring-2 ring-purple-500' : ''}
                              `}
                              onClick={() => handleTableClick(table)}
                            >
                              <div className="text-center">
                                <div className="text-lg font-bold">Table {table.id}</div>
                                <div className="text-sm text-muted-foreground">
                                  {table.seats} Seats
                                </div>
                                {table.status === 'occupied' && (
                                  <>
                                    <Badge variant="outline" className="mt-2">
                                      {table.currentOrder}
                                    </Badge>
                                    <Badge 
                                      className={`mt-1 ${
                                        table.serviceStatus === 'served' 
                                          ? 'bg-green-500/10' 
                                          : 'bg-yellow-500/10'
                                      }`}
                                    >
                                      {table.serviceStatus}
                                    </Badge>
                                  </>
                                )}
                                {table.merged && (
                                  <Badge variant="outline" className="mt-1 bg-purple-500/10">
                                    Merged
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Mini Map */}
            {showMiniMap && (
              <div className="col-span-1 border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Mini Map</h3>
                <div className="grid grid-cols-5 gap-1">
                  {tables.map((table) => (
                    <div
                      key={`mini-${table.id}`}
                      className={`w-4 h-4 rounded-sm ${
                        table.status === 'occupied' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table Details Dialog */}
          <Dialog open={showTableDetails} onOpenChange={setShowTableDetails}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Table {selectedTable?.id} Details
                </DialogTitle>
              </DialogHeader>
              {selectedTable && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Status</h4>
                      <Select
                        value={selectedTable.status}
                        onValueChange={(value) => {
                          setTables(tables.map(t =>
                            t.id === selectedTable.id ? { ...t, status: value } : t
                          ));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empty">Empty</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Service Status</h4>
                      <Select
                        value={selectedTable.serviceStatus}
                        onValueChange={(value) => {
                          setTables(tables.map(t =>
                            t.id === selectedTable.id ? { ...t, serviceStatus: value } : t
                          ));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="waiting">Waiting</SelectItem>
                          <SelectItem value="served">Served</SelectItem>
                          <SelectItem value="finished">Finished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Table Merging */}
                  <div>
                    <h4 className="font-semibold mb-2">Merge with Table</h4>
                    <Select
                      onValueChange={(targetTableId) => {
                        handleTableMerge(selectedTable.id, parseInt(targetTableId));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select table to merge" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables
                          .filter(t => t.id !== selectedTable.id && t.canMerge)
                          .map(table => (
                            <SelectItem key={table.id} value={table.id.toString()}>
                              Table {table.id}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="font-semibold mb-2">Table Notes</h4>
                    <Textarea
                      value={selectedTable.notes}
                      onChange={(e) => updateTableNotes(selectedTable.id, e.target.value)}
                      placeholder="Add special requirements or notes..."
                      className="min-h-[100px]"
                    />
                  </div>

                  {selectedTable.currentOrder && (
                    <div>
                      <h4 className="font-semibold mb-2">Current Order</h4>
                      <div className="p-4 rounded-lg bg-secondary">
                        <div className="font-medium">{selectedTable.currentOrder}</div>
                        {/* Add order details here */}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500/50" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500/50" />
              <span className="text-sm">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500/50" />
              <span className="text-sm">Merged</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">Reserved</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
