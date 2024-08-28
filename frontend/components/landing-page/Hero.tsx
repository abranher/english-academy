"use client";

import BoxBase from "../common/BoxBase";
import { Image } from "@nextui-org/react";
import { MyButton } from "../common/MyButton";

export default function Hero() {
  return (
    <>
      <BoxBase size="sm">
        <div className="mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h1 className="mb-5 text-5xl md:text-4xl lg:text-5xl font-bold leading-tight text-black dark:text-white sm:leading-tight md:leading-tight">
                Abre las puertas a un mundo de oportunidades con Academy
              </h1>
              <p className="mb-5 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Empieza hoy mismo tu viaje hacia el dominio del inglés. Academy
                es la mejor manera de aprender inglés en línea.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <MyButton color="primary" radius="sm" variant="solid" size="lg">
                  Comienza hoy
                </MyButton>
              </div>
            </div>

            <div className="hidden md:flex md:justify-center md:w-1/2">
              <Image
                isBlurred
                width={240}
                src="/hero-student.jpg"
                alt="Estudiante"
                className="m-5"
              />
            </div>
          </div>
        </div>
      </BoxBase>
    </>
  );
}
