
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GradientThemeProvider } from "@/contexts/GradientThemeContext";
import { GlassThemeProvider } from "@/contexts/GlassThemeContext";
import Index from "./pages/Index";
import GlassIndex from "./pages/GlassIndex";
import DesignTool from "./pages/DesignTool";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GradientThemeProvider>
      <GlassThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/glass" element={<GlassIndex />} />
              <Route path="/design" element={<DesignTool />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GlassThemeProvider>
    </GradientThemeProvider>
  </QueryClientProvider>
);

export default App;
