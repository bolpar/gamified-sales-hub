import { Phone, MessageCircle, Monitor, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getWorkingHoursLeft } from "@/utils/businessDays";
import { cn } from "@/lib/utils";

interface CanalAtendimento {
  nome: string;
  icon: React.ComponentType<{ className?: string }>;
  metaDiaria: number;
  realizados: number;
  cor: string;
}

interface MetasAtendimentoCardProps {
  className?: string;
}

export function MetasAtendimentoCard({ className }: MetasAtendimentoCardProps) {
  const horasRestantes = getWorkingHoursLeft();
  
  const canais: CanalAtendimento[] = [
    {
      nome: "WhatsApp",
      icon: MessageCircle,
      metaDiaria: 25,
      realizados: 18,
      cor: "text-green-600"
    },
    {
      nome: "Telefone", 
      icon: Phone,
      metaDiaria: 15,
      realizados: 12,
      cor: "text-blue-600"
    },
    {
      nome: "Digisac",
      icon: Monitor,
      metaDiaria: 10,
      realizados: 6,
      cor: "text-purple-600"
    }
  ];

  const calcularRitmoNecessario = (canal: CanalAtendimento) => {
    const faltam = canal.metaDiaria - canal.realizados;
    if (faltam <= 0 || horasRestantes <= 0) return 0;
    return Math.ceil(faltam / horasRestantes);
  };

  const getRitmoStatus = (canal: CanalAtendimento) => {
    const progress = (canal.realizados / canal.metaDiaria) * 100;
    if (progress >= 100) return "success";
    
    const ritmoNecessario = calcularRitmoNecessario(canal);
    const ritmoAtual = horasRestantes > 0 ? canal.realizados / (8 - horasRestantes) : 0;
    
    if (ritmoAtual < ritmoNecessario && horasRestantes > 2) return "danger";
    if (ritmoAtual < ritmoNecessario && horasRestantes > 1) return "warning";
    return "normal";
  };

  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-card hover:shadow-hover transition-all duration-200 p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Metas de Atendimento</h3>
            <p className="text-sm text-muted-foreground">
              Restam {horasRestantes.toFixed(1)}h do expediente
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {canais.map((canal) => {
          const Icon = canal.icon;
          const progress = (canal.realizados / canal.metaDiaria) * 100;
          const faltam = Math.max(0, canal.metaDiaria - canal.realizados);
          const ritmoNecessario = calcularRitmoNecessario(canal);
          const status = getRitmoStatus(canal);
          
          return (
            <div key={canal.nome} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", canal.cor)} />
                  <span className="text-sm font-medium">{canal.nome}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {canal.realizados}/{canal.metaDiaria}
                  </span>
                  {status === "danger" && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  {status === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                </div>
              </div>
              
              <Progress 
                value={Math.min(progress, 100)} 
                className="h-2"
              />
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {progress >= 100 ? (
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Meta batida! 🎉
                    </Badge>
                  ) : (
                    `Faltam ${faltam} atendimentos`
                  )}
                </span>
                
                {faltam > 0 && horasRestantes > 0 && (
                  <Badge 
                    variant={status === "danger" ? "destructive" : status === "warning" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {ritmoNecessario}/hora necessário
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo geral */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total realizado:</span>
          <span className="font-medium">
            {canais.reduce((acc, canal) => acc + canal.realizados, 0)} / {canais.reduce((acc, canal) => acc + canal.metaDiaria, 0)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Taxa geral:</span>
          <Badge variant="outline">
            {((canais.reduce((acc, canal) => acc + canal.realizados, 0) / canais.reduce((acc, canal) => acc + canal.metaDiaria, 0)) * 100).toFixed(1)}%
          </Badge>
        </div>
      </div>
    </div>
  );
}