import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Award,
  ShoppingCart,
  UserPlus,
  Calendar,
  Clock,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data
const salesData = {
  currentMonth: 125000,
  lastMonth: 98000,
  avgLastThreeMonths: 110000,
  monthlyTarget: 150000,
  orders: 47,
  avgTicket: 2659,
  newClients: 8,
  clientsWithGoalMet: 12,
  totalClients: 28,
  points: 1250
};

const mockClients = [
  { id: 1, name: "Empresa ABC Ltda", sales: 15000, target: 12000, progress: 125, lastOrder: "2 dias", status: "meta_batida" },
  { id: 2, name: "Comercial XYZ", sales: 8500, target: 10000, progress: 85, lastOrder: "1 semana", status: "em_andamento" },
  { id: 3, name: "Indústria Beta", sales: 22000, target: 20000, progress: 110, lastOrder: "1 dia", status: "meta_batida" },
  { id: 4, name: "Distribuidora Gama", sales: 6800, target: 8000, progress: 85, lastOrder: "3 dias", status: "em_andamento" },
  { id: 5, name: "Atacado Delta", sales: 18500, target: 15000, progress: 123, lastOrder: "4 dias", status: "meta_batida" },
];

export default function Dashboard() {
  const [monthlyTarget, setMonthlyTarget] = useState(salesData.monthlyTarget);
  const progressToTarget = (salesData.currentMonth / monthlyTarget) * 100;
  const salesGrowth = ((salesData.currentMonth - salesData.lastMonth) / salesData.lastMonth * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel de Vendas</h1>
          <p className="text-muted-foreground">
            Visão geral do desempenho • {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-lg">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">Próxima atualização: 14:30</span>
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Vendas do Mês"
          value={`R$ ${salesData.currentMonth.toLocaleString()}`}
          subtitle="Meta atual"
          icon={DollarSign}
          variant="primary"
          trend={{
            value: Math.round(salesGrowth),
            isPositive: salesGrowth > 0
          }}
        />

        <MetricCard
          title="Meta Mensal"
          value={`R$ ${monthlyTarget.toLocaleString()}`}
          icon={Target}
          progress={progressToTarget}
          subtitle={`${progressToTarget.toFixed(1)}% concluído`}
          variant={progressToTarget >= 100 ? "success" : "default"}
        />

        <DashboardCard
          title="Pedidos no Mês"
          value={salesData.orders}
          subtitle={`Ticket médio: R$ ${salesData.avgTicket.toLocaleString()}`}
          icon={ShoppingCart}
          variant="default"
        />

        <DashboardCard
          title="Pontos Acumulados"
          value={salesData.points}
          subtitle="Ranking: 3º lugar"
          icon={Star}
          variant="success"
        />
      </div>

      {/* Meta Configuration */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Configuração de Meta
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="monthly-target">Meta Mensal (R$)</Label>
            <Input
              id="monthly-target"
              type="number"
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(Number(e.target.value))}
              className="text-lg font-semibold"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Média Últimos 3 Meses</Label>
            <div className="text-lg font-semibold bg-muted px-3 py-2 rounded-md">
              R$ {salesData.avgLastThreeMonths.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Crescimento Necessário</Label>
            <div className="text-lg font-semibold text-primary bg-primary/10 px-3 py-2 rounded-md">
              {((monthlyTarget / salesData.avgLastThreeMonths - 1) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Clientes Novos"
          value={salesData.newClients}
          target="10"
          icon={UserPlus}
          progress={(salesData.newClients / 10) * 100}
          subtitle="com vendas no mês"
        />

        <MetricCard
          title="Metas Batidas"
          value={salesData.clientsWithGoalMet}
          target={salesData.totalClients}
          icon={Award}
          progress={(salesData.clientsWithGoalMet / salesData.totalClients) * 100}
          subtitle={`de ${salesData.totalClients} clientes`}
          variant="success"
        />

        <MetricCard
          title="Próximas Interações"
          value="5"
          icon={Calendar}
          subtitle="agendadas para hoje"
          variant="warning"
        />
      </div>

      {/* Próximas Interações Card */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Próximas Interações Agendadas
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Empresa ABC Ltda</p>
                <p className="text-sm text-muted-foreground">Apresentar novos produtos da linha industrial</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Hoje, 14:30</p>
                <Badge variant="secondary">15min</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Indústria Beta</p>
                <p className="text-sm text-muted-foreground">Follow-up de proposta comercial</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Amanhã, 10:00</p>
                <Badge variant="secondary">20min</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Comercial XYZ</p>
                <p className="text-sm text-muted-foreground">Demonstração de produtos eletrônicos</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Quinta, 16:00</p>
                <Badge variant="secondary">10min</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Carteira de Clientes
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhamento de metas individuais • {mockClients.length} clientes ativos
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {mockClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-hover transition-all duration-200 bg-gradient-card">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    client.status === 'meta_batida' ? 'bg-success animate-pulse-success' : 'bg-warning'
                  }`} />
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Último pedido: {client.lastOrder}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Vendas / Meta</p>
                    <p className="font-semibold">
                      R$ {client.sales.toLocaleString()} / R$ {client.target.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="text-sm text-muted-foreground">Progresso</p>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            client.progress >= 100 ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(client.progress, 100)}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        client.progress >= 100 ? 'text-success' : 'text-foreground'
                      }`}>
                        {client.progress}%
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}