import { Separator } from "@/components/shadcn/ui/separator";
import UserCard from "./_components/UserCard";
import Image from "next/image";
import { Card } from "@/components/shadcn/ui/card";
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
      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1350px]">
          <div className="space-y-6 p-10 pb-16 block">
            {/* Encabezado */}
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                ¡Bienvenido Abraham!
              </h2>
              <p className="text-muted-foreground">
                Aquí puedes gestionar toda tu información, ver tu progreso y
                acceder rápidamente a tus cursos.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Contenedor con grilla ajustada */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="h-32 rounded-lg lg:col-span-2 flex flex-col gap-5">
                <UserCard
                  user={{
                    name: "Jane Doe",
                    email: "janedoe@example.com",
                    avatarUrl: "/user.jpg",
                    progress: 85,
                    level: "C1",
                    hoursStudied: 200,
                    isOnline: false,
                    country: "Canada",
                    countryFlag: "ca",
                  }}
                />

                <h2 className="text-2xl font-bold tracking-tight">
                  Tu actual curso
                </h2>

                <Separator className="my-4" />
                <Card>
                  <a href="#" className="block rounded-lg p-4">
                    <Image
                      alt=""
                      width={1000}
                      height={224}
                      src="/conversation.jpg"
                      className="h-56 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Price</dt>

                          <dd className="text-sm text-gray-500">$240,000</dd>
                        </div>

                        <div>
                          <dt className="sr-only">Address</dt>

                          <dd className="font-medium">
                            123 Wallaby Avenue, Park Road
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                          <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                          </svg>

                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Parking</p>

                            <p className="font-medium">2 spaces</p>
                          </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                          <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>

                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Bathroom</p>

                            <p className="font-medium">2 rooms</p>
                          </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                          <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          </svg>

                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Bedroom</p>

                            <p className="font-medium">4 rooms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Card>
              </div>

              <div className="h-32 rounded-lg">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Estadísticas del Curso
                  </h3>
                  {/* Contenido adicional: estadísticas */}
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Cursos Recientes
                  </h3>
                  {/* Contenido adicional: lista de cursos recientes */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
