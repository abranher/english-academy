"use client";

import { Image } from "@heroui/react";
import { assetPublicImg } from "@/libs/asset";

import BoxBase from "@/components/common/BoxBase";
import SectionTitle from "../common/SectionTitle";

import { Check } from "lucide-react";

const ListItem = ({ text }: { text: string }) => (
  <p className="mb-5 flex items-center text-lg font-medium text-body-color">
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
      <Check size={20} />
    </span>
    {text}
  </p>
);

const SKILLS = [
  ["Reading", "Writing", "Listening"],
  ["Speaking", "Grammar", "Vocabulary"],
  ["Culture"],
];

export function AboutSection() {
  return (
    <BoxBase size="sm">
      <div className="mx-auto px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-32.5">
          <div className="md:w-1/2">
            <SectionTitle
              title="Domina el Inglés a Tu Propio Ritmo con Academy."
              paragraph="Diferentes Categorías para Mejorar tus Habilidades Clave."
              mb="44px"
            />

            <div className="mb-12 max-w-[570px] lg:mb-0">
              <div className="mx-[-12px] flex flex-wrap">
                {SKILLS.map((column, colIndex) => (
                  <div
                    key={`col-${colIndex}`}
                    className="w-full px-3 sm:w-1/3 lg:w-full xl:w-1/3"
                  >
                    {column.map((skill) => (
                      <ListItem key={skill} text={skill} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 md:justify-center">
            <Image
              isBlurred
              width={240}
              height={240}
              src={assetPublicImg("mini-logo.jpeg")}
              alt="Estudiante"
              className="m-5"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </BoxBase>
  );
}
