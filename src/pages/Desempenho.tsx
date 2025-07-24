import { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  Award,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Clock,
  Star,
  Zap
} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data
const performanceData = {
  weekly: {
    sales: 32000,
    target: 37500,
    orders: 12,
    avgTicket: 2667,
    clientsSold: 8,
    progress: 85.3
  },
  monthly: {
    sales: 125000,
    target: 150000,
    orders: 47,
    avgTicket: 2659,
    clientsSold: 24,
    progress: 83.3
  },
  brands: [
    { name: "Marca A", sales: 45000, target: 50000, progress: 90, weekly: 12000 },
    { name: "Marca B", sales: 38000, target: 40000, progress: 95, weekly: 9500 },
    { name: "Marca C", sales: 28000, target: 35000, progress: 80, weekly: 7200 },
    { name: "Marca D", sales: 14000, target: 25000, progress: 56, weekly: 3300 }
  ],
  segments: [
    { name: "Industrial", sales: 52000, target: 60000, progress: 87, weekly: 13500 },
    { name: "Comercial", sales: 43000, target: 45000, progress: 96, weekly: 11200 },
    { name: "Eletrônicos", sales: 30000, target: 45000, progress: 67, weekly: 7300 }
  ],
  achievements: [
    { title: "Meta Semanal Batida", achieved: 3, total: 4, points: 150 },
    { title: "Top 3 do Mês", achieved: 1, total: 1, points: 500 },
    { title: "Cliente Novo", achieved: 8, total: 10, points: 80 },
    { title: "Vendas Consecutivas", achieved: 12, total: 15, points: 240 }
  ],
  ranking: {
    position: 3,
    total: 25,
    points: 1250,
    monthlyPoints: 970
  }
};

export default function Desempenho() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [newTargets, setNewTargets] = useState<{[key: string]: number}>({});

  const handleTargetChange = (brandName: string, value: number) => {
    setNewTargets(prev => ({ ...prev, [brandName]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Desempenho</h1>
          <p className="text-muted-foreground">
            Acompanhe suas métricas e conquistas • Atualizado em tempo real
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-lg">
            <Star className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">
              #{performanceData.ranking.position} de {performanceData.ranking.total}
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-success/10 px-4 py-2 rounded-lg">
            <Zap className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">
              {performanceData.ranking.points} pontos
            </span>
          </div>
        </div>
      </div>

      {/* Main Performance Metrics */}
      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Visão Semanal</TabsTrigger>
          <TabsTrigger value="monthly">Visão Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Vendas da Semana"
              value={`R$ ${performanceData.weekly.sales.toLocaleString()}`}
              subtitle={`Meta: R$ ${performanceData.weekly.target.toLocaleString()}`}
              icon={DollarSign}
              variant="primary"
              trend={{
                value: Math.round(performanceData.weekly.progress - 100),
                isPositive: performanceData.weekly.progress >= 100
              }}
            />

            <MetricCard
              title="Meta Semanal"
              value={`${performanceData.weekly.progress.toFixed(1)}%`}
              target="100%"
              icon={Target}
              progress={performanceData.weekly.progress}
              variant={performanceData.weekly.progress >= 100 ? "success" : "default"}
            />

            <DashboardCard
              title="Pedidos"
              value={performanceData.weekly.orders}
              subtitle={`Ticket: R$ ${performanceData.weekly.avgTicket.toLocaleString()}`}
              icon={ShoppingCart}
            />

            <DashboardCard
              title="Clientes Vendidos"
              value={performanceData.weekly.clientsSold}
              subtitle="Esta semana"
              icon={Users}
              variant="success"
            />
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Vendas do Mês"
              value={`R$ ${performanceData.monthly.sales.toLocaleString()}`}
              subtitle={`Meta: R$ ${performanceData.monthly.target.toLocaleString()}`}
              icon={DollarSign}
              variant="primary"
              trend={{
                value: Math.round(performanceData.monthly.progress - 100),
                isPositive: performanceData.monthly.progress >= 100
              }}
            />

            <MetricCard
              title="Meta Mensal"
              value={`${performanceData.monthly.progress.toFixed(1)}%`}
              target="100%"
              icon={Target}
              progress={performanceData.monthly.progress}
              variant={performanceData.monthly.progress >= 100 ? "success" : "default"}
            />

            <DashboardCard
              title="Pedidos"
              value={performanceData.monthly.orders}
              subtitle={`Ticket: R$ ${performanceData.monthly.avgTicket.toLocaleString()}`}
              icon={ShoppingCart}
            />

            <DashboardCard
              title="Clientes Vendidos"
              value={performanceData.monthly.clientsSold}
              subtitle="Este mês"
              icon={Users}
              variant="success"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Brand Performance */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Desempenho por Marca
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure metas e acompanhe o progresso por marca
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceData.brands.map((brand) => (
              <div 
                key={brand.name}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer bg-gradient-card hover:shadow-hover ${
                  selectedBrand === brand.name ? 'border-primary shadow-focus' : 'border-border'
                }`}
                onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{brand.name}</h3>
                  <Badge variant={brand.progress >= 100 ? "default" : "secondary"} className={
                    brand.progress >= 100 ? "bg-success text-success-foreground" : ""
                  }>
                    {brand.progress}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mensal</span>
                    <span className="font-medium">
                      R$ {brand.sales.toLocaleString()} / R$ {brand.target.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        brand.progress >= 100 ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(brand.progress, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Semanal: R$ {brand.weekly.toLocaleString()}</span>
                    <span>Meta semanal: R$ {(brand.target / 4).toLocaleString()}</span>
                  </div>
                </div>

                {selectedBrand === brand.name && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`target-${brand.name}`} className="text-xs">
                          Nova Meta Mensal
                        </Label>
                        <Input
                          id={`target-${brand.name}`}
                          type="number"
                          placeholder={brand.target.toString()}
                          value={newTargets[brand.name] || ''}
                          onChange={(e) => handleTargetChange(brand.name, Number(e.target.value))}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button size="sm" className="h-8 text-xs">
                          Atualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Segment Performance */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Desempenho por Segmento
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceData.segments.map((segment) => (
              <MetricCard
                key={segment.name}
                title={segment.name}
                value={`R$ ${(segment.sales / 1000).toFixed(0)}k`}
                target={`R$ ${(segment.target / 1000).toFixed(0)}k`}
                icon={TrendingUp}
                progress={segment.progress}
                subtitle={`Semanal: R$ ${(segment.weekly / 1000).toFixed(1)}k`}
                variant={segment.progress >= 100 ? "success" : "default"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements & Gamification */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Conquistas e Pontuação
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sistema de gamificação • {performanceData.ranking.monthlyPoints} pontos este mês
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceData.achievements.map((achievement) => (
              <div key={achievement.title} className="bg-gradient-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.achieved >= achievement.total 
                      ? 'bg-success text-success-foreground animate-pulse-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-success">
                    +{achievement.points * (achievement.achieved / achievement.total)} pts
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {achievement.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Progresso</span>
                  <span>{achievement.achieved}/{achievement.total}</span>
                </div>

                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      achievement.achieved >= achievement.total ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min((achievement.achieved / achievement.total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}