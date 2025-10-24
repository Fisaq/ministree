import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Notifications() {
  // Mock data
  const notifications = [
    {
      id: '1',
      title: 'Nova escala disponível',
      message: 'Você foi escalado para o Culto de Domingo',
      type: 'info' as const,
      read: false,
      createdAt: '2025-10-22T10:00:00',
    },
    {
      id: '2',
      title: 'Escala confirmada',
      message: 'Sua escala para o evento Reunião de Oração foi confirmada',
      type: 'success' as const,
      read: false,
      createdAt: '2025-10-21T15:30:00',
    },
    {
      id: '3',
      title: 'Lembrete de evento',
      message: 'Seu evento é amanhã às 10:00',
      type: 'warning' as const,
      read: true,
      createdAt: '2025-10-20T09:00:00',
    },
  ];

  const getNotificationIcon = (type: string) => {
    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertTriangle,
    };
    return icons[type as keyof typeof icons] || Info;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    return 'Agora mesmo';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
          <p className="text-muted-foreground">
            Acompanhe suas notificações e atualizações
          </p>
        </div>
        <Button variant="outline">
          Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colorClass = getNotificationColor(notification.type);

          return (
            <Card key={notification.id} className={!notification.read ? 'border-l-4 border-l-primary' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="default" className="h-2 w-2 p-0 rounded-full">
                            <span className="sr-only">Não lida</span>
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {notification.message}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
              </CardHeader>
              {!notification.read && (
                <CardContent className="pt-0">
                  <Button variant="ghost" size="sm" className="h-8">
                    Marcar como lida
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Você não tem notificações no momento
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
