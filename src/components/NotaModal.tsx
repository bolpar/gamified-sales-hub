import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";

interface NotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (nota: {
    texto: string;
    data: Date;
    vendedor: string;
  }) => void;
}

export function NotaModal({ isOpen, onClose, onConfirm }: NotaModalProps) {
  const [texto, setTexto] = useState("");

  const handleConfirm = () => {
    if (texto.trim()) {
      onConfirm({
        texto: texto.trim(),
        data: new Date(),
        vendedor: "João Silva" // Mock - seria obtido do contexto do usuário logado
      });
      
      setTexto("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Adicionar Nota de Interação
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Descrição da Interação</Label>
            <Textarea
              placeholder="Descreva os detalhes da interação com o cliente..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            <p><strong>Será registrado automaticamente:</strong></p>
            <p>• Data: {new Date().toLocaleDateString('pt-BR')}</p>
            <p>• Horário: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            <p>• Vendedor: João Silva</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1 bg-gradient-primary hover:bg-primary-dark"
              disabled={!texto.trim()}
            >
              Salvar Nota
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}