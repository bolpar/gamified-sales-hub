import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AgendamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (agendamento: {
    data: Date;
    horario: string;
    duracao: string;
    objetivo: string;
  }) => void;
  agendamentosExistentes: Array<{ data: Date; horario: string; }>;
}

export function AgendamentoModal({ isOpen, onClose, onConfirm, agendamentosExistentes }: AgendamentoModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [duracao, setDuracao] = useState("");
  const [objetivo, setObjetivo] = useState("");

  // Gerar horários de 08:00 às 18:00 com intervalos de 15 minutos
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate) return true;
    
    return !agendamentosExistentes.some(agendamento => {
      const agendamentoDate = new Date(agendamento.data);
      const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
      const agendamentoDateString = format(agendamentoDate, 'yyyy-MM-dd');
      
      return agendamentoDateString === selectedDateString && agendamento.horario === time;
    });
  };

  const availableTimeSlots = generateTimeSlots().filter(isTimeSlotAvailable);

  const handleConfirm = () => {
    if (selectedDate && selectedTime && duracao && objetivo) {
      onConfirm({
        data: selectedDate,
        horario: selectedTime,
        duracao,
        objetivo
      });
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
      setDuracao("");
      setObjetivo("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Agendar Interação
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Data */}
          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Horário */}
          <div className="space-y-2">
            <Label>Horário</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar horário" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {availableTimeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDate && availableTimeSlots.length === 0 && (
              <p className="text-sm text-warning">Nenhum horário disponível nesta data</p>
            )}
          </div>

          {/* Duração */}
          <div className="space-y-2">
            <Label>Duração da Interação</Label>
            <Select value={duracao} onValueChange={setDuracao}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar duração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutos</SelectItem>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="20">20 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Objetivo */}
          <div className="space-y-2">
            <Label>Objetivo da Interação</Label>
            <Textarea
              placeholder="Descreva o objetivo desta interação..."
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1 bg-gradient-primary hover:bg-primary-dark"
              disabled={!selectedDate || !selectedTime || !duracao || !objetivo}
            >
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}