
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
  SidebarHeader,
  useSidebar,
} from "../../components/ui/sidebar";

import {
  ShoppingBag,
  Grid2x2,
  Package,
  Settings,
  ListPlus,
  ClipboardList,
  BarChart3,
  Store
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  
  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.includes(path);
  };

  const menuItems = [
    {
      title: "Overview",
      icon: Grid2x2,
      path: "/dashboard",
      active: isActive("/dashboard") && location.pathname === "/dashboard"
    },
    {
      title: "Analytics", 
      icon: BarChart3,
      path: "/dashboard/analytics",
      active: isActive("/dashboard/analytics")
    },
    {
      title: "My Store",
      icon: Store,
      path: "/dashboard/store",
      active: isActive("/dashboard/store")
    },
    {
      title: "Products",
      icon: Package,
      path: "/dashboard/products", 
      active: isActive("/dashboard/products")
    },
    {
      title: "Orders",
      icon: ClipboardList,
      path: "/dashboard/orders",
      active: isActive("/dashboard/orders")
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      active: isActive("/dashboard/settings")
    }
  ];

  return (
    <Sidebar 
      variant="sidebar" 
      className="border-r bg-background"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center px-3 py-2">
          <ShoppingBag className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
          {state !== "collapsed" && (
            <span className="font-semibold text-foreground truncate">
              FashionVendor
            </span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {state !== "collapsed" ? "Dashboard" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.active}
                    className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
