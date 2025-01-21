export interface ActivityLogMessage {
  [key: string]: string;
}

export const activityLogMessages: ActivityLogMessage = {
  index: 'Ver Página Principal',
  'privacy.policy': 'Ver Página de Políticas de Privacidad',
  home: 'Ver Página Principal dentro de la app',
  course_create: 'Ha creado un nuevo curso',
  'secret_token.create': 'Sin definir',
  'secret_token.store': 'Sin definir',
};
