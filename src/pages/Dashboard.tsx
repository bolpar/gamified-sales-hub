import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { HistoricoPedidosModal } from "@/components/HistoricoPedidosModal";
import { MetasAtendimentoCard } from "@/components/MetasAtendimentoCard";
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
  Star,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  getBusinessDaysInMonth, 
  getCurrentBusinessDay, 
  calculateDailyTarget, 
  calculateExpectedProgress 
} from "@/utils/businessDays";

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
  { id: 6, name: "Varejo Epsilon", sales: 12300, target: 14000, progress: 88, lastOrder: "5 dias", status: "em_andamento" },
  { id: 7, name: "Construtora Zeta", sales: 25500, target: 22000, progress: 116, lastOrder: "1 dia", status: "meta_batida" },
  { id: 8, name: "Farmácia Eta", sales: 9200, target: 11000, progress: 84, lastOrder: "6 dias", status: "em_andamento" },
  { id: 9, name: "Supermercado Theta", sales: 31000, target: 25000, progress: 124, lastOrder: "2 dias", status: "meta_batida" },
  { id: 10, name: "Oficina Iota", sales: 7400, target: 9000, progress: 82, lastOrder: "1 semana", status: "em_andamento" }
];

const mockInteracoes = [
  { id: 1, cliente: "Empresa ABC Ltda", assunto: "Apresentar novos produtos da linha industrial", data: "Hoje, 14:30", duracao: "15min" },
  { id: 2, cliente: "Indústria Beta", assunto: "Follow-up de proposta comercial", data: "Amanhã, 10:00", duracao: "20min" },
  { id: 3, cliente: "Comercial XYZ", assunto: "Demonstração de produtos eletrônicos", data: "Quinta, 16:00", duracao: "10min" },
  { id: 4, cliente: "Supermercado Theta", assunto: "Negociar condições de pagamento", data: "Sexta, 09:30", duracao: "25min" },
  { id: 5, cliente: "Construtora Zeta", assunto: "Apresentar linha de ferramentas", data: "Segunda, 11:00", duracao: "30min" },
  { id: 6, cliente: "Varejo Epsilon", assunto: "Revisão de pedido mensal", data: "Segunda, 15:00", duracao: "15min" },
  { id: 7, cliente: "Farmácia Eta", assunto: "Discussão sobre novos medicamentos", data: "Terça, 08:45", duracao: "20min" },
  { id: 8, cliente: "Oficina Iota", assunto: "Orçamento para peças automotivas", data: "Terça, 13:30", duracao: "18min" },
  { id: 9, cliente: "Distribuidora Gama", assunto: "Planejamento trimestral", data: "Quarta, 14:15", duracao: "40min" },
  { id: 10, cliente: "Atacado Delta", assunto: "Conferência sobre logística", data: "Quinta, 10:30", duracao: "35min" }
];

export default function Dashboard() {
  const [monthlyTarget, setMonthlyTarget] = useState(salesData.monthlyTarget);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  
  const progressToTarget = (salesData.currentMonth / monthlyTarget) * 100;
  const salesGrowth = ((salesData.currentMonth - salesData.lastMonth) / salesData.lastMonth * 100);
  
  // Cálculos de dias úteis
  const totalBusinessDays = getBusinessDaysInMonth();
  const currentBusinessDay = getCurrentBusinessDay();
  const dailyTarget = calculateDailyTarget(monthlyTarget);
  const expectedProgress = calculateExpectedProgress(monthlyTarget);
  const progressDifference = salesData.currentMonth - expectedProgress;

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

        <DashboardCard
          title="Previsão por Dias Úteis"
          value={`${currentBusinessDay}/${totalBusinessDays}`}
          subtitle={`Meta diária: R$ ${dailyTarget.toLocaleString()}`}
          icon={BarChart3}
          variant={progressDifference >= 0 ? "success" : "warning"}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground/70">Progresso esperado:</span>
              <span className="font-medium text-card-foreground">R$ {expectedProgress.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground/70">Vendas reais:</span>
              <span className="font-medium text-card-foreground">R$ {salesData.currentMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground/70">Diferença:</span>
              <span className={`font-medium ${progressDifference >= 0 ? 'text-card-foreground' : 'text-destructive'}`}>
                {progressDifference >= 0 ? '+' : ''}R$ {progressDifference.toLocaleString()}
              </span>
            </div>
          </div>
        </DashboardCard>

        <div 
          className="cursor-pointer"
          onClick={() => setShowOrderHistory(true)}
        >
          <DashboardCard
            title="Pedidos no Mês"
            value={salesData.orders}
            subtitle={`Ticket médio: R$ ${salesData.avgTicket.toLocaleString()}`}
            icon={ShoppingCart}
            variant="default"
            className="hover:scale-105 transition-transform"
          />
        </div>

        <DashboardCard
          title="Pontos Acumulados"
          value={salesData.points}
          subtitle="Ranking: 3º lugar"
          icon={Star}
          variant="success"
        />
      </div>

      {/* Meta Configuration - Hidden for sales rep */}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          value="10"
          icon={Calendar}
          subtitle="agendadas esta semana"
          variant="warning"
        />

        <MetasAtendimentoCard />
      </div>

      {/* Próximas Interações Card */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Próximas Interações Agendadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
            {mockInteracoes.slice(0, 10).map((interacao) => (
              <div key={interacao.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{interacao.cliente}</p>
                  <p className="text-sm text-muted-foreground truncate">{interacao.assunto}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-medium text-foreground">{interacao.data}</p>
                  <Badge variant="secondary" className="text-xs">{interacao.duracao}</Badge>
                </div>
              </div>
            ))}
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

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
            {mockClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:shadow-hover transition-all duration-200 bg-gradient-card">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${
                    client.status === 'meta_batida' ? 'bg-success animate-pulse-success' : 'bg-warning'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate">{client.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Último: {client.lastOrder}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="text-xs text-muted-foreground">Vendas/Meta</p>
                    <p className="font-medium text-sm">
                      {client.sales.toLocaleString()}k / {client.target.toLocaleString()}k
                    </p>
                  </div>

                  <div className="min-w-[60px]">
                    <p className="text-xs text-muted-foreground">Progresso</p>
                    <div className="flex items-center gap-1">
                      <div className="w-12 bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            client.progress >= 100 ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(client.progress, 100)}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        client.progress >= 100 ? 'text-success' : 'text-foreground'
                      }`}>
                        {client.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Histórico de Pedidos */}
      <HistoricoPedidosModal 
        isOpen={showOrderHistory}
        onClose={() => setShowOrderHistory(false)}
      />
    </div>
  );
}