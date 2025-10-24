import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
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
import { useChurchStore } from '@/stores/churchStore';
import { toast } from '@/hooks/use-toast';
import { Ministry } from '@/lib/types';

export default function Ministries() {
  const { user } = useAuthStore();
  const { ministries, fetchMinistries, createMinistry, updateMinistry, deleteMinistry } = useChurchStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.churchId) {
      fetchMinistries(user.churchId);
    }
  }, [user?.churchId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.churchId) return;

    setIsLoading(true);
    try {
      if (editingMinistry) {
        await updateMinistry(editingMinistry.id, { name, description });
        toast({ title: 'Ministério atualizado com sucesso!' });
      } else {
        await createMinistry({ name, description, churchId: user.churchId });
        toast({ title: 'Ministério criado com sucesso!' });
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setName(ministry.name);
    setDescription(ministry.description);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este ministério?')) return;

    try {
      await deleteMinistry(id);
      toast({ title: 'Ministério excluído com sucesso!' });
    } catch (error) {
      toast({
        title: 'Erro ao excluir',
        description: error instanceof Error ? error.message : 'Ocorreu um erro.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setEditingMinistry(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ministérios</h1>
          <p className="text-muted-foreground">
            Gerencie os ministérios da sua igreja
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Ministério
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingMinistry ? 'Editar Ministério' : 'Novo Ministério'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados do ministério
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Louvor, Intercessão, Mídia"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o propósito e atividades do ministério"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <Card key={ministry.id}>
            <CardHeader>
              <CardTitle>{ministry.name}</CardTitle>
              <CardDescription>{ministry.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(ministry)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(ministry.id)}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))}

        {ministries.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                Nenhum ministério cadastrado ainda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
