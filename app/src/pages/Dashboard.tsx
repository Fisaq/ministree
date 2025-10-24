import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Church, Users, Calendar, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Ministérios',
      value: '5',
      icon: Church,
      description: 'Ativos na igreja',
    },
    {
      title: 'Voluntários',
      value: '42',
      icon: Users,
      description: 'Total cadastrados',
    },
    {
      title: 'Eventos',
      value: '8',
      icon: Calendar,
      description: 'Próximos eventos',
    },
    {
      title: 'Escalas',
      value: '15',
      icon: ClipboardList,
      description: 'Ativas este mês',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}! Aqui está um resumo do sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
          <CardDescription>Detalhes do seu perfil no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nome:</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Função:</span>
            <span className="font-medium capitalize">
              {user?.role === 'temporary' ? 'Novo usuário' : user?.role}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
