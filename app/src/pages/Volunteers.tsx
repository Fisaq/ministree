import { useState } from 'react';
import { Plus, Mail, Phone } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Volunteers() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock data
  const volunteers = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 98765-4321',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 98765-4322',
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      phone: '(11) 98765-4323',
      status: 'pending' as const,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { label: 'Ativo', className: 'bg-green-500' },
      pending: { label: 'Pendente', className: 'bg-yellow-500' },
      inactive: { label: 'Inativo', className: 'bg-gray-500' },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Voluntários</h1>
          <p className="text-muted-foreground">
            Gerencie os voluntários do ministério
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Convidar Voluntário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convidar Voluntário</DialogTitle>
              <DialogDescription>
                O voluntário receberá um email com as credenciais de acesso
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Nome do voluntário" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input id="phone" type="tel" placeholder="(11) 98765-4321" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enviar Convite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Voluntários</CardTitle>
          <CardDescription>
            {volunteers.length} voluntário{volunteers.length !== 1 ? 's' : ''} cadastrado{volunteers.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {volunteer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {volunteer.phone}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
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
