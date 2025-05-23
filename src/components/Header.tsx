
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            PH
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            PriceHunter
          </span>
        </div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login Button */}
        <Button variant="outline" className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          <span>Login</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
