import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Target, 
  Award,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CRMLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Painel de Vendas",
    url: "/",
    icon: BarChart3,
    description: "Visão geral e metas"
  },
  {
    title: "Clientes",
    url: "/clientes", 
    icon: Users,
    description: "Carteira de clientes"
  },
  {
    title: "Desempenho",
    url: "/desempenho",
    icon: Target,
    description: "Métricas e progresso"
  }
];

export function CRMLayout({ children }: CRMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <header className="h-16 bg-gradient-primary border-b border-border/20 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary-foreground hover:bg-primary-light/20"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-primary-foreground">CRM Vendas</h1>
              <p className="text-xs text-primary-foreground/70">Sistema Interno</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full">
            <Star className="h-4 w-4 text-success-foreground" />
            <span className="text-sm font-medium text-success-foreground">1,250 pts</span>
          </div>
          
          <div className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-success-foreground">JS</span>
            </div>
            <span className="text-sm font-medium text-primary-foreground">João Silva</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-card border-r border-border transition-all duration-300 shadow-card",
            sidebarOpen ? "w-64" : "w-16"
          )}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const active = isActive(item.url);
              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-accent group",
                    active && "bg-primary text-primary-foreground shadow-sm"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                  )} />
                  
                  {sidebarOpen && (
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-medium",
                        active ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {item.title}
                      </span>
                      <span className={cn(
                        "text-xs",
                        active ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {sidebarOpen && (
            <div className="p-4 mt-8">
              <div className="bg-gradient-success rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-success-foreground mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-success-foreground mb-1">
                  Meta do Mês
                </h3>
                <p className="text-xs text-success-foreground/80 mb-2">
                  85% concluída
                </p>
                <div className="w-full bg-success-foreground/20 rounded-full h-2">
                  <div className="bg-success-foreground h-2 rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-gradient-card min-h-[calc(100vh-4rem)]">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}