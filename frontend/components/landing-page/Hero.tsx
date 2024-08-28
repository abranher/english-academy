"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import BoxBase from "../common/BoxBase";

export default function Hero() {
  return (
    <>
      <BoxBase>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Abre las puertas a un mundo de oportunidades con Academy
              </h1>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Empieza hoy mismo tu viaje hacia el dominio del inglés. Academy
                es la mejor manera de aprender inglés en línea.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/auth/signin">
                  <Button color="primary" variant="shadow" size="lg">
                    Comienza hoy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BoxBase>
    </>
  );
}
