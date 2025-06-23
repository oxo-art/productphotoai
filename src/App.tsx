
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UnifiedThemeProvider } from "@/contexts/UnifiedThemeContext";
import { GradientThemeProvider } from "@/contexts/GradientThemeContext";
import { GlassThemeProvider } from "@/contexts/GlassThemeContext";
import { ArtisticThemeProvider } from "@/contexts/ArtisticThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UnifiedThemeProvider>
      <GradientThemeProvider>
        <GlassThemeProvider>
          <ArtisticThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ArtisticThemeProvider>
        </GlassThemeProvider>
      </GradientThemeProvider>
    </UnifiedThemeProvider>
  </QueryClientProvider>
);

export default App;
