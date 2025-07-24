import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquare, Phone, Mail, MapPin, Video, Calendar as CalendarIcon, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (interacao: {
    canal: string;
    motivo: string;
    resumo: string;
    tags: string[];
    relacionamento: number;
    data: Date;
    vendedor: string;
    followUp?: {
      data: Date;
      duracao: string;
      canal: string;
      objetivo: string;
    };
  }) => void;
}

const canaisInteracao = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "ligacao", label: "Ligação", icon: Phone },
  { value: "email", label: "E-mail", icon: Mail },
  { value: "visita", label: "Visita", icon: MapPin },
  { value: "videochamada", label: "Vídeo chamada", icon: Video },
  { value: "outros", label: "Outros", icon: MessageSquare }
];

const motivosInteracao = [
  "Orçamento enviado",
  "Pedido em andamento", 
  "Pós-venda",
  "Cobrança/financeiro",
  "Cliente com dúvida técnica",
  "Apresentação de novidade",
  "Apenas relacionamento"
];

const tagsRapidas = [
  "Objeção de preço",
  "Cliente interessado", 
  "Problema em pedido anterior",
  "Reposição",
  "Cliente novo",
  "Sem resposta",
  "Venda concluída",
  "Follow-up agendado"
];

const duracoes = ["10 minutos", "15 minutos", "20 minutos"];

export function NotaModal({ isOpen, onClose, onConfirm }: NotaModalProps) {
  const [canal, setCanal] = useState("");
  const [motivo, setMotivo] = useState("");
  const [resumo, setResumo] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [relacionamento, setRelacionamento] = useState(0);
  const [agendarFollowUp, setAgendarFollowUp] = useState(false);
  const [followUpData, setFollowUpData] = useState<Date>();
  const [followUpDuracao, setFollowUpDuracao] = useState("");
  const [followUpCanal, setFollowUpCanal] = useState("");
  const [followUpObjetivo, setFollowUpObjetivo] = useState("");

  const handleTagClick = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleConfirm = () => {
    if (canal && motivo && resumo.trim()) {
      const interacao = {
        canal,
        motivo,
        resumo: resumo.trim(),
        tags,
        relacionamento,
        data: new Date(),
        vendedor: "João Silva",
        ...(agendarFollowUp && followUpData && {
          followUp: {
            data: followUpData,
            duracao: followUpDuracao,
            canal: followUpCanal,
            objetivo: followUpObjetivo
          }
        })
      };
      
      onConfirm(interacao);
      
      // Reset form
      setCanal("");
      setMotivo("");
      setResumo("");
      setTags([]);
      setRelacionamento(0);
      setAgendarFollowUp(false);
      setFollowUpData(undefined);
      setFollowUpDuracao("");
      setFollowUpCanal("");
      setFollowUpObjetivo("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Registrar Interação com Cliente
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Data e Hora */}
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            <p><strong>Registrado automaticamente:</strong></p>
            <p>• Data: {new Date().toLocaleDateString('pt-BR')}</p>
            <p>• Horário: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            <p>• Vendedor: João Silva</p>
          </div>

          {/* Canal da Interação */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Canal da Interação *
            </Label>
            <Select value={canal} onValueChange={setCanal}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o canal utilizado" />
              </SelectTrigger>
              <SelectContent>
                {canaisInteracao.map((c) => {
                  const Icon = c.icon;
                  return (
                    <SelectItem key={c.value} value={c.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {c.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Motivo da Interação */}
          <div className="space-y-2">
            <Label>Motivo da Interação *</Label>
            <Select value={motivo} onValueChange={setMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                {motivosInteracao.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resumo da Conversa */}
          <div className="space-y-2">
            <Label>Resumo da Conversa *</Label>
            <Textarea
              placeholder="Cliente comentou que [...]. Mostrou interesse em [...]. Pretende fechar até [...]. Reclamação: [...]. Ação pendente: [...]."
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Tags Rápidas */}
          <div className="space-y-2">
            <Label>Tags Rápidas</Label>
            <div className="flex flex-wrap gap-2">
              {tagsRapidas.map((tag) => (
                <Badge
                  key={tag}
                  variant={tags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Nota de Relacionamento */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Nota de Relacionamento (0-5 estrelas)
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-6 w-6 cursor-pointer transition-colors",
                    star <= relacionamento
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground hover:text-yellow-400"
                  )}
                  onClick={() => setRelacionamento(star)}
                />
              ))}
            </div>
          </div>

          {/* Follow-up */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUp"
                checked={agendarFollowUp}
                onCheckedChange={(checked) => setAgendarFollowUp(!!checked)}
              />
              <Label htmlFor="followUp" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Agendar follow-up com esse cliente
              </Label>
            </div>

            {agendarFollowUp && (
              <div className="space-y-4 ml-6 border-l-2 border-primary/20 pl-4">
                {/* Data do Follow-up */}
                <div className="space-y-2">
                  <Label>Data do Follow-up</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !followUpData && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {followUpData ? format(followUpData, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={followUpData}
                        onSelect={setFollowUpData}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Duração */}
                <div className="space-y-2">
                  <Label>Duração</Label>
                  <Select value={followUpDuracao} onValueChange={setFollowUpDuracao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      {duracoes.map((duracao) => (
                        <SelectItem key={duracao} value={duracao}>{duracao}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Canal Previsto */}
                <div className="space-y-2">
                  <Label>Canal Previsto</Label>
                  <Select value={followUpCanal} onValueChange={setFollowUpCanal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o canal" />
                    </SelectTrigger>
                    <SelectContent>
                      {canaisInteracao.map((c) => {
                        const Icon = c.icon;
                        return (
                          <SelectItem key={c.value} value={c.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {c.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Objetivo */}
                <div className="space-y-2">
                  <Label>Objetivo do Próximo Contato</Label>
                  <Textarea
                    placeholder="Objetivo específico para o follow-up..."
                    value={followUpObjetivo}
                    onChange={(e) => setFollowUpObjetivo(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1"
              disabled={!canal || !motivo || !resumo.trim()}
            >
              Salvar Interação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}