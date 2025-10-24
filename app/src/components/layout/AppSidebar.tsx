import { Home, Church, Users, Calendar, ClipboardList, Bell, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const collapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/dashboard', icon: Home },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { title: 'Igrejas', url: '/churches', icon: Church },
        { title: 'Ministérios', url: '/ministries', icon: Users },
        { title: 'Ministros', url: '/ministers', icon: Users },
        { title: 'Voluntários', url: '/volunteers', icon: Users },
        { title: 'Eventos', url: '/events', icon: Calendar },
        { title: 'Escalas', url: '/schedules', icon: ClipboardList },
        { title: 'Notificações', url: '/notifications', icon: Bell },
      ];
    }

    if (user?.role === 'minister') {
      return [
        ...baseItems,
        { title: 'Meu Ministério', url: '/my-ministry', icon: Users },
        { title: 'Voluntários', url: '/volunteers', icon: Users },
        { title: 'Eventos', url: '/events', icon: Calendar },
        { title: 'Escalas', url: '/schedules', icon: ClipboardList },
        { title: 'Notificações', url: '/notifications', icon: Bell },
      ];
    }

    if (user?.role === 'volunteer') {
      return [
        ...baseItems,
        { title: 'Minhas Escalas', url: '/my-schedules', icon: ClipboardList },
        { title: 'Notificações', url: '/notifications', icon: Bell },
      ];
    }

    return baseItems;
  };

  const items = getNavItems();

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Church className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Voluntários
              </span>
              <span className="text-xs text-muted-foreground">
                Sistema de Gestão
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent/50'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user?.name?.substring(0, 2).toUpperCase() || 'US'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role === 'temporary' ? 'Novo usuário' : user?.role}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
