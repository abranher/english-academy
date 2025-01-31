"use client";

import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Button } from "@/components/shadcn/ui/button";
import BoxBase from "../../../components/common/BoxBase";
import { ArrowRight } from "lucide-react";
import { assetPublicImg } from "@/libs/asset";

export default function TutorSection() {
  return (
    <>
      <BoxBase size="sm">
        <div className="mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="hidden md:flex md:justify-center md:w-1/2">
              <Image
                isBlurred
                width={240}
                src={assetPublicImg("tutor.jpg")}
                alt="Estudiante"
                className="m-5"
              />
            </div>

            <div className="md:w-1/2 text-center">
              <h1 className="mb-5 text-5xl md:text-4xl lg:text-5xl font-bold leading-tight text-black dark:text-white sm:leading-tight md:leading-tight">
                ¿Te gustaría ser parte del equipo de formadores de Academy?
              </h1>
              <p className="mb-5 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Registrate y empieza hoy mismo.
              </p>
              <div className="flex items-center justify-center flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/tutors/signup">
                  <Button color="primary" size="lg" className="flex gap-3">
                    Solicitar
                    <ArrowRight className="w-5" />
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
