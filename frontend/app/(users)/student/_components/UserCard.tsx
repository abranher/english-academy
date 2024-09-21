import React from "react";
import { Progress } from "@/components/shadcn/ui/progress";
import FlagIcon from "@/components/common/FlagIcon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import BadgeLevel from "./BadgeLevel";
import { Button } from "@/components/shadcn/ui/button";

// Tipo para las propiedades del usuario
interface User {
  name: string;
  email: string;
  avatarUrl: string;
  progress: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; // Solo niveles CEFR permitidos
  hoursStudied: number;
  isOnline: boolean;
  country: string;
  countryFlag: string;
}

// Props del componente UserCard
interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const { name, email, progress, level, hoursStudied, isOnline, country } =
    user;

  return (
    <Card className="bg-white text-gray-900 dark:text-gray-100 dark:bg-transparent w-full rounded-lg">
      <CardHeader>
        {/* Avatar con estado en línea y badge */}
        <div className="relative flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/user.jpg" className="object-cover" alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isOnline && (
            <Badge className="absolute top-0 left-0 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md" />
          )}
        </div>

        {/* Datos principales del usuario */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>

          {/* País y bandera */}
          <div className="flex items-center mt-2 space-x-2">
            <FlagIcon />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {country}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Contenido de la tarjeta */}
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Nivel actual:
            </h4>
            <BadgeLevel level={level} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Horas Estudiadas: {hoursStudied}
          </p>
        </div>

        {/* Barra de progreso */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Progreso en el Curso
          </h4>
          <Progress
            value={progress}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {progress}% completado
          </p>
        </div>

        {/* Rango de nivel CEFR y última actividad */}
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Rango de Nivel CEFR:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {level === "A1" || level === "A2"
                ? "Básico"
                : level === "B1" || level === "B2"
                ? "Intermedio"
                : "Avanzado"}
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Última Actividad:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hace 2 días
            </p>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex justify-end">
          <Button>Ver Más Detalles</Button>
        </div>
      </CardContent>
    </Card>
  );
}
