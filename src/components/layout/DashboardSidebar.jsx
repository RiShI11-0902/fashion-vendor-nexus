
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

import {
  ShoppingBag,
  Grid2x2,
  Package,
  Settings,
  ListPlus,
  ClipboardList,
  BarChart3
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-6">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-gold mr-2" />
            <span className="font-display text-xl font-semibold">FashionVendor</span>
          </Link>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard") && !isActive("/products") && !isActive("/settings") && !isActive("/stores") && !isActive("/orders") && !isActive("/analytics") ? "bg-accent" : ""}>
                  <Link to="/dashboard">
                    <Grid2x2 className="h-4 w-4 mr-2" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/analytics") ? "bg-accent" : ""}>
                  <Link to="/dashboard/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/stores") ? "bg-accent" : ""}>
                  <Link to="/dashboard/stores">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span>My Stores</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/products") ? "bg-accent" : ""}>
                  <Link to="/dashboard/products">
                    <Package className="h-4 w-4 mr-2" />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/orders") ? "bg-accent" : ""}>
                  <Link to="/dashboard/orders">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/create-store") ? "bg-accent" : ""}>
                  <Link to="/dashboard/create-store">
                    <ListPlus className="h-4 w-4 mr-2" />
                    <span>Create Store</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard/settings") ? "bg-accent" : ""}>
                  <Link to="/dashboard/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
