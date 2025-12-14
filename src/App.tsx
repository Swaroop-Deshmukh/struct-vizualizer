import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BookRide from "./pages/BookRide";
import FindShares from "./pages/FindShares";
import Wallet from "./pages/Wallet";
import EcoImpact from "./pages/EcoImpact";
import DriverDashboard from "./pages/DriverDashboard";
import DriverEarnings from "./pages/DriverEarnings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">🚗</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

// Driver route wrapper
function DriverRoute({ children }: { children: React.ReactNode }) {
  const { user, isDriver, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">🚗</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isDriver) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Auth route (redirect if logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isDriver } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">🚗</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    // Redirect drivers to driver dashboard, passengers to home
    return <Navigate to={isDriver ? "/driver" : "/"} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      
      {/* Passenger routes */}
      <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute><Layout><BookRide /></Layout></ProtectedRoute>} />
      <Route path="/shares" element={<ProtectedRoute><Layout><FindShares /></Layout></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><Layout><Wallet /></Layout></ProtectedRoute>} />
      <Route path="/eco" element={<ProtectedRoute><Layout><EcoImpact /></Layout></ProtectedRoute>} />
      <Route path="/rides" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/safety" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      
      {/* Driver routes */}
      <Route path="/driver" element={<DriverRoute><Layout><DriverDashboard /></Layout></DriverRoute>} />
      <Route path="/driver/earnings" element={<DriverRoute><Layout><DriverEarnings /></Layout></DriverRoute>} />
      <Route path="/driver/rides" element={<DriverRoute><Layout><DriverDashboard /></Layout></DriverRoute>} />
      <Route path="/driver/rides" element={<DriverRoute><Layout><DriverDashboard /></Layout></DriverRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
