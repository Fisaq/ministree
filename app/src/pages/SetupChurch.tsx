import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Church } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export default function SetupChurch() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.createChurch({ name });
      await refreshUser();
      toast({
        title: 'Igreja cadastrada com sucesso!',
        description: 'Você agora é o administrador desta igreja.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar igreja',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Church className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Cadastrar Igreja</CardTitle>
          <CardDescription>
            Configure os dados da sua igreja para começar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Igreja</Label>
              <Input
                id="name"
                type="text"
                placeholder="Igreja Exemplo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardContent>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar Igreja'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
