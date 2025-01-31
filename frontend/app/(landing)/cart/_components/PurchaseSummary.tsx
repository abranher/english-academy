"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "@/config/axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/shadcn/ui/card";
import {
  ArrowRight,
  CreditCard,
  IdCard,
  Landmark,
  Phone,
  Smartphone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { Label } from "@/components/shadcn/ui/label";
import { toast } from "sonner";
import { Input } from "@/components/shadcn/ui/input";
import { formatPrice } from "@/libs/format";
import { Button } from "@/components/shadcn/ui/button";
import { useCartStore } from "@/services/store/cart";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  payment_reference: z
    .string()
    .regex(/^\d{6}$/, { message: "Debe ser un número de 6 dígitos." }),
});

export default function PurchaseSummary() {
  const [open, setOpen] = useState(false);
  const [lessonType, setLessonType] = useState("CLASS");

  const { data: session } = useSession();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((acc, item) => acc + item.price?.amount, 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const courses = cart.map((course) => ({ courseId: course.id }));

    console.log({
      ...values,
      courses,
      total,
    });

    try {
      await axios.post(
        `/api/purchase-orders/student/${session?.user.student?.id}`,
        {
          ...values,
          courses,
          total,
        }
      );

      toast.success(
        "Envio exitoso, recibirás una notificación cuando el pago haya sido verificado!"
      );
      setOpen(false);
      form.reset();
      clearCart();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <Card className="p-4">
        <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
          Resumen de la compra
        </h3>

        <ul className="text-gray-800 mt-6 space-y-3">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal{" "}
            <span className="ml-auto font-bold">{formatPrice(total)}</span>
          </li>
          <hr className="border-gray-300" />
          <li className="flex flex-wrap gap-4 text-sm font-bold">
            Total <span className="ml-auto">{formatPrice(total)}</span>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex gap-3 w-full">
                Pagar
                <ArrowRight />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Formulario de pago</DialogTitle>
                <DialogDescription>
                  Haz clic en Pagar cuando hayas terminado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    {/** Lesson type */}
                    <RadioGroup
                      value={lessonType}
                      onValueChange={setLessonType}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="CLASS"
                          id="CLASS"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="CLASS"
                          className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Smartphone className="mb-3 h-6 w-6" />
                          Pago móvil
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="QUIZ"
                          id="QUIZ"
                          className="peer sr-only"
                          disabled
                        />
                        <Label
                          htmlFor="QUIZ"
                          className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="mb-3 h-6 w-6"
                          >
                            <path
                              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          PayPal
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="TEST"
                          id="TEST"
                          className="peer sr-only"
                          disabled
                        />
                        <Label
                          htmlFor="TEST"
                          className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          Tarjeta
                        </Label>
                      </div>
                    </RadioGroup>

                    <section className="py-5">
                      <h2 className="font-semibold dark:text-zinc-100 pb-3">
                        Datos del beneficiario
                      </h2>

                      <section className="flex flex-col gap-4">
                        <article className="flex items-center gap-4">
                          <Phone className="h-6 w-6" />
                          0412-2356456
                        </article>

                        <article className="flex items-center gap-4">
                          <IdCard className="h-6 w-6" />
                          V-12.123.123
                        </article>

                        <article className="flex items-center gap-4">
                          <Landmark className="h-6 w-6" />
                          0102 - Banco de Venezuela, S.A. Banco Universal
                        </article>
                      </section>
                    </section>

                    <ul className="text-gray-800 py-5 space-y-3">
                      <li className="flex flex-wrap gap-4 text-sm">
                        Subtotal{" "}
                        <span className="ml-auto font-bold">
                          {formatPrice(total)}
                        </span>
                      </li>
                      <hr className="border-gray-300" />
                      <li className="flex flex-wrap gap-4 text-sm font-bold">
                        Total{" "}
                        <span className="ml-auto">{formatPrice(total)}</span>
                      </li>
                    </ul>

                    {/** Lesson title */}
                    <FormField
                      control={form.control}
                      name="payment_reference"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Número de referencia</FormLabel>

                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="p.ej. '012345'"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Deben ser los 6 últimos digitos del número de
                            referencia
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button disabled={!isValid || isSubmitting} type="submit">
                        Pagar
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/">
            <Button className="w-full" variant="outline">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
