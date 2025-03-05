# English Academy

_Proyecto/Aplicación web para el aprendizaje del idioma ingles en línea_

## Comenzando 🚀

1. Clonar proyecto:

```bash
  git clone https://github.com/abranher/english-academy.git
```

### Pre-requisitos 📋

- Node.js v^20
- npm v^10
- PostgreSQL v^15

### Instalación Next.js 🔧

1. Instalar dependencias:

```bash
  npm install
```

2. Entorno de configuración:

+ Renombrar ".env.example" a ".env"

```.env
APP_NAME="Example"
APP_URL="http://localhost:3000" -> your host and port
BACKEND_URL="http://localhost:8000" -> your host and port
SESSION_SECRET="yoursecret"

NEXT_PUBLIC_APP_NAME="${APP_NAME}"
NEXT_PUBLIC_BACKEND_URL="${BACKEND_URL}"
```

* Entorno para authjs

```bash
npx auth secret
```

3. Ejecutar servidor local:

```bash
npm run dev
```

4. Ejecutar servidor local back-end:

```bash
npm run start:dev
```

## Despliegue 📦

_notas adicionales sobre como hacer deploy_

## Construido con 🛠️

- [Next.js](https://nextjs.org/) - Framework para el front-end
- [Nest.js](https://nestjs.com/) - Framework para el back-end
- [React](https://react.dev/) - La Librería de front-end
- [Tailwind CSS](https://tailwindcss.com/) - El Framework de CSS

## Autores ✒️

- **Abraham Hernández** - _Desarrollo del software_ - [abranher](https://github.com/abranher)

## Licencia 📄

Este proyecto está bajo la Licencia [MIT license](https://opensource.org/licenses/MIT) - mira el archivo [LICENSE](LICENSE) para más detalles.

# english-academy

## Generate keys

### openssl rand -base64 32
