import NextLink from "next/link";
import { AcmeLogo } from "@/components/icons/AcmeLogo";
import { NavbarBrand } from "@nextui-org/react";

export default function Logo() {
  return (
    <>
      <NavbarBrand>
        <AcmeLogo />
        <NextLink href="/" className="font-bold text-inherit">
          ACADEMY
        </NextLink>
      </NavbarBrand>
    </>
  );
}
