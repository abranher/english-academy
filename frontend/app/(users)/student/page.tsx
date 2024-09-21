import UserCard from "./_components/UserCard";
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
// Datos de ejemplo para el usuario
const userData: User = {
  name: "Juan Pérez",
  email: "juan.perez@example.com",
  avatarUrl: "https://via.placeholder.com/150",
  progress: 75, // Porcentaje de progreso
  level: "B2", // Nivel del curso
  hoursStudied: 120, // Horas de estudio completadas
  isOnline: true, // Estado en línea
  country: "España", // País del usuario
  countryFlag: "https://flagcdn.com/es.svg", // URL de la bandera
};

export default function StudentHomePage() {
  return (
    <>
      <UserCard user={userData} />
    </>
  );
}
