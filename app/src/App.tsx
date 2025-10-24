import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import SetupChurch from "@/pages/SetupChurch";
import Ministries from "@/pages/Ministries";
import Events from "@/pages/Events";
import Volunteers from "@/pages/Volunteers";
import Schedules from "@/pages/Schedules";
import Notifications from "@/pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/church/createChurch" element={<ProtectedRoute><SetupChurch /></ProtectedRoute>} />
          
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ministries" element={<ProtectedRoute allowedRoles={['admin']}><Ministries /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute allowedRoles={['admin', 'minister']}><Events /></ProtectedRoute>} />
            <Route path="/volunteers" element={<ProtectedRoute allowedRoles={['admin', 'minister']}><Volunteers /></ProtectedRoute>} />
            <Route path="/schedules" element={<ProtectedRoute allowedRoles={['admin', 'minister']}><Schedules /></ProtectedRoute>} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
