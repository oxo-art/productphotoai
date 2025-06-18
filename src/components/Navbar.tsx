
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Navigate through the application
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <a href="/" className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                  Home
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                  Gallery
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                  Settings
                </a>
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-xl font-semibold">ImageApp</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-primary">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Gallery
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
