import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Introduction from "./pages/Introduction";
import TechStack from "./pages/TechStack";
import DSAlgo from "./pages/DSAlgo";
import Implementation from "./pages/Implementation";
import Results from "./pages/Results";
import Conclusion from "./pages/Conclusion";
import References from "./pages/References";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/ds-algo" element={<DSAlgo />} />
            <Route path="/implementation" element={<Implementation />} />
            <Route path="/results" element={<Results />} />
            <Route path="/conclusion" element={<Conclusion />} />
            <Route path="/references" element={<References />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
