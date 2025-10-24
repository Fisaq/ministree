import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/stores/authStore';

export default function Events() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  // Mock data para demonstração
  const events = [
    {
      id: '1',
      title: 'Culto de Domingo',
      description: 'Culto de celebração dominical',
      date: '2025-11-02',
      time: '10:00',
      location: 'Templo Principal',
    },
    {
      id: '2',
      title: 'Reunião de Oração',
      description: 'Reunião semanal de intercessão',
      date: '2025-10-25',
      time: '19:00',
      location: 'Sala de Oração',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eventos</h1>
          <p className="text-muted-foreground">
            Gerencie os eventos do seu ministério
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Evento</DialogTitle>
              <DialogDescription>
                Crie um novo evento para o ministério
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Nome do evento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição do evento"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input id="location" placeholder="Local do evento" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Criar Evento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(event.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Gerenciar Escalas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
