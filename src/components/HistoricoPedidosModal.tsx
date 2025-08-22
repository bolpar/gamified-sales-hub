import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Filter, Package, Calendar, DollarSign } from "lucide-react";

interface Pedido {
  id: string;
  numero: string;
  cliente: string;
  valor: number;
  data: Date;
  status: 'concluido' | 'pendente' | 'cancelado';
}

interface HistoricoPedidosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data para demonstração
const mockPedidos: Pedido[] = [
  { id: '1', numero: 'PED-2024-001', cliente: 'Empresa ABC Ltda', valor: 15000, data: new Date(2024, 0, 15), status: 'concluido' },
  { id: '2', numero: 'PED-2024-002', cliente: 'Comercial XYZ', valor: 8500, data: new Date(2024, 0, 18), status: 'concluido' },
  { id: '3', numero: 'PED-2024-003', cliente: 'Indústria Beta', valor: 22000, data: new Date(2024, 0, 22), status: 'pendente' },
  { id: '4', numero: 'PED-2024-004', cliente: 'Distribuidora Gama', valor: 6800, data: new Date(2024, 0, 25), status: 'concluido' },
  { id: '5', numero: 'PED-2024-005', cliente: 'Atacado Delta', valor: 18500, data: new Date(2024, 0, 28), status: 'concluido' },
  { id: '6', numero: 'PED-2024-006', cliente: 'Empresa ABC Ltda', valor: 12300, data: new Date(2024, 1, 5), status: 'pendente' },
  { id: '7', numero: 'PED-2024-007', cliente: 'Comercial XYZ', valor: 9800, data: new Date(2024, 1, 8), status: 'cancelado' },
  { id: '8', numero: 'PED-2024-008', cliente: 'Indústria Beta', valor: 25000, data: new Date(2024, 1, 12), status: 'concluido' },
];

export function HistoricoPedidosModal({ isOpen, onClose }: HistoricoPedidosModalProps) {
  const [filtro, setFiltro] = useState('mes-atual');
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'concluido': return 'default';
      case 'pendente': return 'secondary';
      case 'cancelado': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const pedidosFiltrados = mockPedidos.filter(pedido => {
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const inicioAno = new Date(agora.getFullYear(), 0, 1);
    
    switch (filtro) {
      case 'mes-atual':
        return pedido.data >= inicioMes;
      case 'trimestre':
        const inicioTrimestre = new Date(agora.getFullYear(), Math.floor(agora.getMonth() / 3) * 3, 1);
        return pedido.data >= inicioTrimestre;
      case 'ano':
        return pedido.data >= inicioAno;
      case 'historico':
        return true;
      default:
        return true;
    }
  });

  const valorTotal = pedidosFiltrados
    .filter(p => p.status === 'concluido')
    .reduce((total, pedido) => total + pedido.valor, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Histórico de Pedidos
          </DialogTitle>
          <DialogDescription>
            Visualize todos os seus pedidos com filtros por período
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Período:</span>
            </div>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes-atual">Mês Atual</SelectItem>
                <SelectItem value="trimestre">Último Trimestre</SelectItem>
                <SelectItem value="ano">Ano Atual</SelectItem>
                <SelectItem value="historico">Histórico Completo</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="ml-auto flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">Total de pedidos:</span>
              <Badge variant="outline">{pedidosFiltrados.length}</Badge>
              <span className="text-muted-foreground">Valor total:</span>
              <Badge variant="default" className="bg-success text-success-foreground">
                R$ {valorTotal.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4 space-y-3">
              {pedidosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum pedido encontrado para o período selecionado</p>
                </div>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-hover transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {pedido.numero}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {pedido.cliente}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(pedido.data, 'dd/MM/yyyy')}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          R$ {pedido.valor.toLocaleString()}
                        </span>
                      </div>

                      <Badge variant={getStatusVariant(pedido.status)}>
                        {getStatusLabel(pedido.status)}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}