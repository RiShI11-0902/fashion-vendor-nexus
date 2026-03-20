
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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
  Store,
  Sparkles,
  LogOut
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../stores/useAuthStore";

const DashboardSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (!path) {
      handleLogout()
    }
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
      title: "Generate AI Model",
      icon: Sparkles,
      path: "/dashboard/generate-model",
      active: isActive("/dashboard/generate-model")
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      active: isActive("/dashboard/settings")
    },
    {
      title: "Log out",
      icon: LogOut,
      path: null,
      active: null
    },
  ];
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <Sidebar
      variant="sidebar"
      className="border-r bg-background"
      collapsible="icon"
    >
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {state !== "collapsed" ? <img onClick={() => navigate("/")} src="/full_logo.png" className=" px-3 py-2 w-[9rem] cursor-pointer mr-2 flex-shrink-0" /> : <img src="/full_logo.png" className=" px-3 py-2 w-[9rem] cursor-pointer mr-2 flex-shrink-0" />}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.path ? (
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className="w-full justify-start"
                    >
                       <Link
                        to={item.path}
                        className="flex items-center text-foreground mt-2 gap-2"
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate text-foreground">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      onClick={handleLogout}
                      className="w-full justify-start mt-2 text-black hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-black">{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}

              {/* {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className="w-full justify-start "
                  >
                    <Link to={item.path} className="flex items-center  text-black mt-2 gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-black">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {/* {
                state == 'collapsed' ? <LogOut className="h-4 w-4 flex-shrink-0 ml-[0.6rem] mt-4" /> :
                  <Button className="w-fit mt-5" size={"sm"} onClick={handleLogout}>
                    <LogOut /> Sign Out
                  </Button>
              } */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;

/////text-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground 