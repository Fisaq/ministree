import { Calendar as CalendarIcon, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Schedules() {
  // Mock data
  const schedules = [
    {
      id: '1',
      event: 'Culto de Domingo',
      date: '2025-11-02',
      volunteer: 'João Silva',
      status: 'accepted' as const,
    },
    {
      id: '2',
      event: 'Reunião de Oração',
      date: '2025-10-25',
      volunteer: 'Maria Santos',
      status: 'pending' as const,
    },
    {
      id: '3',
      event: 'Culto de Domingo',
      date: '2025-11-09',
      volunteer: 'Pedro Oliveira',
      status: 'declined' as const,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      accepted: { label: 'Aceito', icon: CheckCircle, className: 'bg-green-500' },
      pending: { label: 'Pendente', icon: Clock, className: 'bg-yellow-500' },
      declined: { label: 'Recusado', icon: XCircle, className: 'bg-red-500' },
      change_requested: { label: 'Alteração Solicitada', icon: Clock, className: 'bg-blue-500' },
    };
    const variant = variants[status as keyof typeof variants];
    const Icon = variant.icon;
    return (
      <Badge className={variant.className}>
        <Icon className="mr-1 h-3 w-3" />
        {variant.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Escalas</h1>
        <p className="text-muted-foreground">
          Gerencie as escalas de voluntários
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Escalas Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Aguardando resposta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Escalas Aceitas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Confirmadas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Escalas Recusadas
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Precisa realocação
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Escalas</CardTitle>
          <CardDescription>
            Lista completa de escalas e seus status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Voluntário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.event}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(schedule.date).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {schedule.volunteer}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
