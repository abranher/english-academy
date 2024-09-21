import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { Progress } from "@/components/shadcn/ui/progress";
import FlagIcon from "@/components/common/FlagIcon";

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
  const {
    name,
    email,
    avatarUrl,
    progress,
    level,
    hoursStudied,
    isOnline,
    country,
    countryFlag,
  } = user;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar con estado en línea */}
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>

        {/* Datos principales del usuario */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>

          {/* País y bandera */}
          <div className="flex items-center mt-2 space-x-2">
            <Image
              src={countryFlag}
              alt={country}
              width={24}
              height={16}
              className="w-6 h-4 rounded-md"
            />
            <p className="text-sm text-gray-600">{country}</p>
          </div>
        </div>
      </div>

      <FlagIcon />

      {/* Progreso en el curso */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-800 mb-2">
          Progreso en el Curso
        </h4>
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nivel:</p>
            <Badge level={level} />
          </div>
          <p className="text-sm text-gray-600">
            Horas Estudiadas: {hoursStudied}
          </p>
        </div>

        <Progress
          value={progress}
          className="w-full h-2 bg-gray-200 rounded-full"
        >
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </Progress>
        <p className="text-xs text-gray-500 mt-2">{progress}% completado</p>
      </div>
    </div>
  );
}

// Tipo para las propiedades del componente Badge
interface BadgeProps {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

// Componente Badge para el nivel CEFR
const Badge: React.FC<BadgeProps> = ({ level }) => {
  const levelColors: Record<string, string> = {
    A1: "bg-blue-100 text-blue-800",
    A2: "bg-green-100 text-green-800",
    B1: "bg-yellow-100 text-yellow-800",
    B2: "bg-purple-100 text-purple-800",
    C1: "bg-red-100 text-red-800",
    C2: "bg-teal-100 text-teal-800",
  };

  return (
    <span
      className={`px-2 py-1 text-sm font-semibold rounded-full ${levelColors[level]}`}
    >
      {level}
    </span>
  );
};
