import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Dashboard from "./RestaurantDigitalTwin/Dashboard/Dashboard"
import Customers from "./RestaurantDigitalTwin/Customers/Customers"
import Orders from "./RestaurantDigitalTwin/Orders/Orders"
import Staff from "./RestaurantDigitalTwin/Staff/Staff"
import Finance from "./RestaurantDigitalTwin/Finance/Finance"
import Inventory from "./RestaurantDigitalTwin/Inventory/Inventory"
import Operations from "./RestaurantDigitalTwin/Operations/Operations"
import PhysicalTwin from "./RestaurantDigitalTwin/PhysicalTwin/PhysicalTwin"
import Profile from "./RestaurantDigitalTwin/Profile/Profile"
import AgenticAI from "./RestaurantDigitalTwin/AgenticAI/AgenticAI"
import LogMonitor from "./RestaurantDigitalTwin/LogMonitor/LogMonitor"
import AIAnalytics from "./RestaurantDigitalTwin/AIAnalytics/AIAnalytics"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/agentic-ai" element={<AgenticAI />} />
            <Route path="/log-monitor" element={<LogMonitor />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/physical-twin" element={<PhysicalTwin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
