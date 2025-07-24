import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  TrendingUp, 
  ShoppingCart, 
  Calendar,
  MessageSquare,
  Plus,
  Eye,
  DollarSign,
  Package,
  Clock,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockClients = [
  {
    id: 1,
    name: "Empresa ABC Ltda",
    contact: "Carlos Silva",
    phone: "(11) 99999-1234",
    email: "carlos@abc.com.br",
    totalSales12m: 180000,
    salesThisMonth: 15000,
    monthlyTarget: 12000,
    progress: 125,
    lastOrder: "2024-01-15",
    lastContact: "2024-01-10",
    nextScheduled: "2024-01-20 14:30",
    status: "meta_batida",
    segments: ["Industrial", "Ferragens"],
    brands: ["Marca A", "Marca B"],
    orders12m: 24,
    avgTicket: 7500,
    notes: 3
  },
  {
    id: 2,
    name: "Comercial XYZ",
    contact: "Maria Santos",
    phone: "(11) 99999-5678",
    email: "maria@xyz.com.br",
    totalSales12m: 96000,
    salesThisMonth: 8500,
    monthlyTarget: 10000,
    progress: 85,
    lastOrder: "2024-01-08",
    lastContact: "2024-01-12",
    nextScheduled: null,
    status: "em_andamento",
    segments: ["Comercial", "Eletrônicos"],
    brands: ["Marca C"],
    orders12m: 18,
    avgTicket: 5333,
    notes: 5
  },
  {
    id: 3,
    name: "Indústria Beta",
    contact: "João Oliveira",
    phone: "(11) 99999-9012",
    email: "joao@beta.com.br",
    totalSales12m: 280000,
    salesThisMonth: 22000,
    monthlyTarget: 20000,
    progress: 110,
    lastOrder: "2024-01-14",
    lastContact: "2024-01-13",
    nextScheduled: "2024-01-18 10:00",
    status: "meta_batida",
    segments: ["Industrial", "Automação"],
    brands: ["Marca A", "Marca D"],
    orders12m: 32,
    avgTicket: 8750,
    notes: 2
  }
];

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalesThisMonth = mockClients.reduce((sum, client) => sum + client.salesThisMonth, 0);
  const clientsWithTarget = mockClients.filter(client => client.progress >= 100).length;
  const avgProgress = mockClients.reduce((sum, client) => sum + client.progress, 0) / mockClients.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carteira de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie suas interações e acompanhe o desempenho • {mockClients.length} clientes ativos
          </p>
        </div>
        
        <Button className="bg-gradient-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Vendas Totais do Mês"
          value={`R$ ${totalSalesThisMonth.toLocaleString()}`}
          subtitle="Carteira completa"
          icon={DollarSign}
          variant="primary"
        />

        <DashboardCard
          title="Clientes na Meta"
          value={`${clientsWithTarget}/${mockClients.length}`}
          subtitle={`${((clientsWithTarget / mockClients.length) * 100).toFixed(1)}% da carteira`}
          icon={Target}
          variant="success"
        />

        <DashboardCard
          title="Progresso Médio"
          value={`${avgProgress.toFixed(1)}%`}
          subtitle="Média da carteira"
          icon={TrendingUp}
          variant="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border shadow-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Lista de Clientes
              </h2>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente ou contato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div 
                  key={client.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 bg-gradient-card hover:shadow-hover ${
                    selectedClient?.id === client.id ? 'border-primary shadow-focus' : 'border-border'
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        client.status === 'meta_batida' ? 'bg-success animate-pulse-success' : 'bg-warning'
                      }`} />
                      
                      <div>
                        <h3 className="font-semibold text-foreground">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.contact}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <ShoppingCart className="h-3 w-3" />
                            Último: {new Date(client.lastOrder).toLocaleDateString('pt-BR')}
                          </span>
                          {client.notes > 0 && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {client.notes} notas
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">
                          R$ {client.salesThisMonth.toLocaleString()}
                        </span>
                        <Badge variant={client.progress >= 100 ? "default" : "secondary"} className={
                          client.progress >= 100 ? "bg-success text-success-foreground" : ""
                        }>
                          {client.progress}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Meta: R$ {client.monthlyTarget.toLocaleString()}
                      </p>
                      {client.nextScheduled && (
                        <p className="text-xs text-warning flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(client.nextScheduled).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(client.nextScheduled).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-card rounded-lg border border-border shadow-card">
          {selectedClient ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Detalhes do Cliente</h3>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Completo
                </Button>
              </div>

              <div className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">{selectedClient.name}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Contato: {selectedClient.contact}</p>
                    <p>Telefone: {selectedClient.phone}</p>
                    <p>Email: {selectedClient.email}</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {selectedClient.orders12m}
                    </p>
                    <p className="text-xs text-muted-foreground">Pedidos 12m</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      R$ {(selectedClient.avgTicket / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-muted-foreground">Ticket Médio</p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Meta do Mês</span>
                    <span className="font-medium text-foreground">
                      {selectedClient.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        selectedClient.progress >= 100 ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(selectedClient.progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    R$ {selectedClient.salesThisMonth.toLocaleString()} de R$ {selectedClient.monthlyTarget.toLocaleString()}
                  </p>
                </div>

                {/* Segments & Brands */}
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Segmentos</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.segments.map((segment) => (
                      <Badge key={segment} variant="secondary" className="text-xs">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Marcas</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.brands.map((brand) => (
                      <Badge key={brand} variant="outline" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Interação
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Adicionar Nota
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Selecione um cliente para ver os detalhes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}