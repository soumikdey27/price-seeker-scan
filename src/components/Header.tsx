
import { UserCircle, Menu, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // For demo purposes, let's assume user is logged in
  // In a real app, this would come from context or auth state
  const isLoggedIn = true;
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '', // empty for demo, will show initials
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            PH
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            PriceHunter
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="hidden sm:flex">
            <NavigationMenuItem>
              <Link 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                to="/"
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                to="/about"
              >
                About Us
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                to="/how-it-works"
              >
                How It Works
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                to="/contact"
              >
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden sm:flex">
              <Button variant="outline" className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                <span>Login</span>
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white py-4 px-4 absolute top-full left-0 right-0 border-b border-gray-200 shadow-lg">
          <nav className="space-y-3 flex flex-col">
            <Link 
              to="/"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/how-it-works"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/contact"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="flex items-center gap-2 w-full justify-start">
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="flex items-center gap-2 w-full justify-center">
                    <UserCircle className="h-5 w-5" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
