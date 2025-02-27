
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileEdit, 
  Settings, 
  Search, 
  MenuIcon, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navigation() {
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen, isMobile]);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      name: "Optimize",
      path: "/optimize",
      icon: <FileEdit className="w-4 h-4 mr-2" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <Search className="w-4 h-4 mr-2" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ];

  const isLandingPage = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled || !isLandingPage ? 
          "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-display font-bold text-xl"
          >
            <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center">
              <span className="font-display font-bold">S</span>
            </div>
            <span>SEO.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {!isLandingPage && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all",
                  location.pathname === item.path
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {isLandingPage && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#features">Features</a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#how-it-works">How it works</a>
                </Button>
                <Button className="ml-2" asChild>
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 md:hidden animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            {isLandingPage ? (
              <>
                <a 
                  href="#features" 
                  className="px-4 py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="px-4 py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it works
                </a>
                <Link
                  to="/dashboard"
                  className="mt-4 w-full px-4 py-3 bg-primary text-white rounded-md text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-3 rounded-md text-lg font-medium flex items-center",
                    location.pathname === item.path
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navigation;
