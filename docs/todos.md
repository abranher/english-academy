# TODOS:

- Backups para windows
- Luego mostrar cards de planes mensuales o anuales
- Generar subscripcion dependiendo del plan

que necesitamos:

- necesitamos que el admin le llegue una notification donde le diga lo que sucedio

- Mostrar cursos publicados y aprobados
- Mostrar cursos por categoria,
- mostrar cursos por nivel

- Mostrar clase
- Mostrar quiz

# PARA DESPUES:

- Al verificar tutor necesita iniciar sesion nuevamente para poder pedir la data nueva
- Creamos un vista para mostrar todas las notificaciones -> 30 min
- La fecha de nacimiento del perfil, se guarda de una manera en la bd y luego se muestra como de otra
- rejected_at (fecha/hora del rechazo para eliminar en 24h)
- IMPORTANT: -> hacer el componente que crea las certificaciones del tutor igual al createAttachment


import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Asegúrate de importar tu hook

interface Item {
  id: string;
  title: string;
  description: string;
}

function filterArrayByText(items: Item[], searchText: string): Item[] {
  const lowerCaseSearchText = searchText.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerCaseSearchText) ||
      item.description.toLowerCase().includes(lowerCaseSearchText)
  );
}

const SearchComponent: React.FC<{ items: Item[] }> = ({ items }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500); // Usa el debounce con un retraso de 500ms

  const filteredItems = filterArrayByText(items, debouncedSearchText);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;