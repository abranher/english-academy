export default function Footer() {
  return (
    <>
      <footer className="py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              &copy; 2024{" "}
              <a
                href="http://uideck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Academy
              </a>{" "}
              and{" "}
              <a
                href="https://nextjstemplates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                UPT Aragua
              </a>
            </p>
          </div>
          <ul className="flex justify-center mt-2 space-x-4">
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Términos de servicio
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
