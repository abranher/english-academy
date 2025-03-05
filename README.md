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
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=laravel
  DB_USERNAME=root
  DB_PASSWORD=
```

## Entorno para authjs

```bash
npx auth secret
```

2. Compilar para producción:

```bash
  npm run build
```

3. Renombrar ".env.example" a ".env" y configurar conexión a la base de datos

```.env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=laravel
  DB_USERNAME=root
  DB_PASSWORD=
```

4. Ejecutar servidor local back-end:

```bash
  npm run start:dev
```

5. Ejecutar servidor local front-end:

```bash
  npm run dev
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
