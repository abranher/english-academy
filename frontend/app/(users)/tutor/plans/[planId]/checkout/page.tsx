import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { CheckoutContent } from "./CheckoutContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function PlanSubscriptionCheckoutPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CheckoutContent />
    </>
  );
}
