import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  ChefHat,
  CheckCircle,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  Download,
  Flame,
  HelpCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Microwave,
  RefreshCw,
  Salad,
  Sandwich,
  Settings,
  Shield,
  ShoppingBasket,
  Soup,
  Sparkles,
  Trash2,
  Truck,
  User,
  Utensils,
  Wine
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Log event types for restaurant operations
const LOG_TYPES = {
  ORDER: { label: 'Order', icon: <ShoppingBasket className="h-4 w-4" />, color: 'text-green-400' },
  KITCHEN: { label: 'Kitchen', icon: <ChefHat className="h-4 w-4" />, color: 'text-orange-400' },
  INVENTORY: { label: 'Inventory', icon: <Sparkles className="h-4 w-4" />, color: 'text-blue-400' },
  DELIVERY: { label: 'Delivery', icon: <Truck className="h-4 w-4" />, color: 'text-purple-400' },
  PAYMENT: { label: 'Payment', icon: <CreditCard className="h-4 w-4" />, color: 'text-cyan-400' },
  CUSTOMER: { label: 'Customer', icon: <User className="h-4 w-4" />, color: 'text-indigo-400' },
  EQUIPMENT: { label: 'Equipment', icon: <Microwave className="h-4 w-4" />, color: 'text-gray-400' },
  STAFF: { label: 'Staff', icon: <Utensils className="h-4 w-4" />, color: 'text-yellow-400' }
};

// Mock log events for restaurant operations
const generateLogEvent = () => {
  const types = Object.keys(LOG_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const menuItems = ['Margherita Pizza', 'Caesar Salad', 'Beef Burger', 'Pasta Carbonara', 'Chocolate Cake'];
  const customers = ['Alex Johnson', 'Maria Garcia', 'James Smith', 'Sarah Lee', 'David Kim'];
  const staff = ['Chef Rodriguez', 'Server Thompson', 'Manager Chen', 'Bartender Wilson'];
  const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  const randomStaff = staff[Math.floor(Math.random() * staff.length)];

  const baseEvent = {
    id: Date.now(),
    timestamp: now,
    type: randomType,
    source: ['POS System', 'Kitchen Display', 'Inventory Mgmt', 'Delivery App'][Math.floor(Math.random() * 4)],
    status: ['success', 'warning', 'error', 'info'][Math.floor(Math.random() * 4)]
  };

  switch(randomType) {
    case 'ORDER':
      return {
        ...baseEvent,
        message: `New order from ${randomCustomer}`,
        details: {
          customer: randomCustomer,
          items: [
            { name: randomItem, quantity: Math.floor(1 + Math.random() * 3) },
            { name: menuItems[Math.floor(Math.random() * menuItems.length)], quantity: 1 }
          ],
          total: (15 + Math.random() * 35).toFixed(2),
          type: ['Dine-in', 'Takeout', 'Delivery'][Math.floor(Math.random() * 3)],
          server: randomStaff
        }
      };
    case 'KITCHEN':
      return {
        ...baseEvent,
        message: `Kitchen update for order #${Math.floor(1000 + Math.random() * 9000)}`,
        details: {
          chef: randomStaff,
          item: randomItem,
          status: ['Preparing', 'Cooking', 'Ready', 'Delayed'][Math.floor(Math.random() * 4)],
          timeElapsed: `${Math.floor(5 + Math.random() * 15)} minutes`,
          station: ['Grill', 'Fryer', 'Pizza Oven', 'Salad Station'][Math.floor(Math.random() * 4)]
        }
      };
    case 'INVENTORY':
      return {
        ...baseEvent,
        message: `Inventory ${Math.random() > 0.5 ? 'low' : 'restocked'} for ${['flour', 'cheese', 'lettuce', 'beef'][Math.floor(Math.random() * 4)]}`,
        details: {
          item: ['Flour', 'Cheese', 'Lettuce', 'Beef', 'Tomatoes'][Math.floor(Math.random() * 5)],
          quantity: Math.floor(Math.random() * 20),
          threshold: Math.floor(5 + Math.random() * 10),
          action: Math.random() > 0.5 ? 'Alert' : 'Restocked'
        }
      };
    case 'DELIVERY':
      return {
        ...baseEvent,
        message: `Delivery ${Math.random() > 0.5 ? 'dispatched' : 'completed'}`,
        details: {
          orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
          driver: ['Driver Smith', 'Driver Lee', 'Driver Garcia'][Math.floor(Math.random() * 3)],
          address: `${Math.floor(100 + Math.random() * 900)} Main St`,
          status: ['Dispatched', 'En Route', 'Delivered', 'Delayed'][Math.floor(Math.random() * 4)],
          eta: `${Math.floor(15 + Math.random() * 30)} minutes`
        }
      };
    case 'PAYMENT':
      return {
        ...baseEvent,
        message: `Payment ${Math.random() > 0.5 ? 'processed' : 'failed'} for order #${Math.floor(1000 + Math.random() * 9000)}`,
        details: {
          amount: (15 + Math.random() * 35).toFixed(2),
          method: ['Credit Card', 'Cash', 'Mobile Pay', 'Gift Card'][Math.floor(Math.random() * 4)],
          tip: (2 + Math.random() * 8).toFixed(2),
          server: randomStaff
        }
      };
    case 'CUSTOMER':
      return {
        ...baseEvent,
        message: `${randomCustomer} ${Math.random() > 0.5 ? 'arrived' : 'left feedback'}`,
        details: {
          customer: randomCustomer,
          partySize: Math.floor(1 + Math.random() * 6),
          waitTime: `${Math.floor(5 + Math.random() * 25)} minutes`,
          rating: Math.random() > 0.7 ? 'Complaint' : `${Math.floor(3 + Math.random() * 3)} stars`
        }
      };
    case 'EQUIPMENT':
      return {
        ...baseEvent,
        message: `${['Oven', 'Fryer', 'POS Terminal', 'Refrigerator'][Math.floor(Math.random() * 4)]} ${Math.random() > 0.5 ? 'alert' : 'maintenance'}`,
        details: {
          equipment: ['Oven', 'Fryer', 'POS Terminal', 'Refrigerator'][Math.floor(Math.random() * 4)],
          status: ['Overheating', 'Low Temp', 'Offline', 'Maintenance Due'][Math.floor(Math.random() * 4)],
          action: ['Monitoring', 'Technician Called', 'Rebooted', 'Scheduled'][Math.floor(Math.random() * 4)]
        }
      };
    default: // STAFF
      return {
        ...baseEvent,
        message: `${randomStaff} ${Math.random() > 0.5 ? 'shift started' : 'performance note'}`,
        details: {
          staff: randomStaff,
          role: ['Chef', 'Server', 'Manager', 'Host'][Math.floor(Math.random() * 4)],
          hours: `${Math.floor(4 + Math.random() * 6)} hours`,
          note: ['On time', 'Late arrival', 'High sales', 'Customer compliment'][Math.floor(Math.random() * 4)]
        }
      };
  }
};

export default function LogMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    warnings: 0,
    errors: 0,
    lastHour: 0,
    activeOrders: 0
  });
  const logsEndRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate live log events
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newEvent = generateLogEvent();
      setLogs(prev => [newEvent, ...prev].slice(0, 200));
      setStats(prev => ({
        total: prev.total + 1,
        warnings: prev.warnings + (newEvent.status === 'warning' ? 1 : 0),
        errors: prev.errors + (newEvent.status === 'error' ? 1 : 0),
        lastHour: prev.lastHour + 1,
        activeOrders: Math.floor(5 + Math.random() * 15) // Simulate active order count
      }));
    }, 800 + Math.random() * 1200); // Random interval between 0.8-2s

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset last hour count every hour
  useEffect(() => {
    const hourTimer = setInterval(() => {
      setStats(prev => ({ ...prev, lastHour: 0 }));
    }, 3600000);

    return () => clearInterval(hourTimer);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details.customer && log.details.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.staff && log.details.staff.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.item && log.details.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearLogs = () => {
    setLogs([]);
    setStats(prev => ({ ...prev, total: 0, warnings: 0, errors: 0 }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-gray-900/20 to-orange-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-300 
            to-amber-300 bg-clip-text text-transparent">
            Restaurant Digital Twin Monitor
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-orange-500/10 text-orange-500">
              <Flame className="h-4 w-4 mr-2" />
              Live Operations Active
            </Badge>
            <span className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              {stats.total} total events
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isPaused ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className="gap-2"
          >
            {isPaused ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Events</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-500/10">
              <ShoppingBasket className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Bell className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Kitchen Alerts</div>
              <div className="text-2xl font-bold">{stats.warnings}</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
              <div className="text-2xl font-bold">{stats.errors}</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by customer, staff, or menu item..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(LOG_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Log Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <ChefHat className="h-8 w-8 mb-2" />
                <p>No restaurant events match your filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    log.status === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : log.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' 
                        ? 'bg-red-500/10 text-red-400' 
                        : log.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-white/5'
                    }`}>
                      {LOG_TYPES[log.type].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${LOG_TYPES[log.type].color}`}>
                            {LOG_TYPES[log.type].label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.status === 'error' && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                          {log.status === 'warning' && (
                            <Badge variant="secondary" className="text-xs">
                              Alert
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </div>
                      </div>
                      <p className="mb-2">{log.message}</p>
                      <div className="text-sm text-muted-foreground">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium capitalize">{key}:</span>
                              <span>
                                {Array.isArray(value) ? (
                                  <ul className="list-disc list-inside">
                                    {value.map((item, i) => (
                                      <li key={i}>
                                        {item.name} (x{item.quantity})
                                      </li>
                                    ))}
                                  </ul>
                                ) : value instanceof Date ? (
                                  formatDate(value)
                                ) : (
                                  value
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {filteredLogs.filter(l => l.status === 'success').length} Normal
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            {filteredLogs.filter(l => l.status === 'warning').length} Alerts
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {filteredLogs.filter(l => l.status === 'error').length} Critical
          </span>
        </div>
        <div>
          {isPaused ? 'Updates Paused' : 'Streaming Live'}
        </div>
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
    </div>
  );
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}