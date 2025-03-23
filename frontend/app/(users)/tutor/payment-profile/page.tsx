import { validateTutorSession } from "@/libs/middleware/authValidation";

import { TutorPaymentProfile } from "./_components/TutorPaymentProfile";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function TutorPaymentProfilePage() {
  const session = await validateTutorSession();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil de Pago</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TutorPaymentProfile userId={session.user.id} />
    </>
  );
}
