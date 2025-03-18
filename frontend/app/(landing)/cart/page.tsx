"use client";

import Link from "next/link";

import { assetImg } from "@/libs/asset";
import { formatPrice } from "@/libs/format";
import { useCartStore } from "@/services/store/cart";
import { Chip, Image } from "@heroui/react";

import { Button } from "@/components/shadcn/ui/button";
import { ArrowUpLeft, ShoppingCart, Trash } from "lucide-react";
import { PurchaseSummary } from "./_components/PurchaseSummary";
import { Separator } from "@/components/shadcn/ui/separator";

export default function ShoppingCartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-50 text-center">
          Carrito de compra
        </h1>

        {cart.length === 0 ? (
          <section className="text-xl font-semibold flex flex-col items-center w-full my-36 gap-4 dark:text-zinc-300">
            <ShoppingCart className="w-28 h-28" />
            <p>Tu carro esta vacio</p>
            <Link href="/">
              <Button className="flex gap-3 items-center">
                <ArrowUpLeft className="w-5 h-5" />
                Seguir explorando
              </Button>
            </Link>
          </section>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 my-16 mx-5">
            <div className="lg:col-span-2 space-y-4">
              {cart &&
                cart.map((course) => (
                  <>
                    <div
                      className="grid grid-cols-8 items-start gap-4"
                      key={course.id}
                    >
                      <Link
                        href={`/courses/${course.id}`}
                        className="col-span-7 flex items-start gap-4"
                      >
                        <div className="aspect-video w-52 shrink-0">
                          <Image
                            src={assetImg(course.image)}
                            alt={course.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <h3 className="text-sm font-bold text-gray-800">
                            {`${course.title} - ${course.subtitle}`}
                          </h3>

                          <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                            {formatPrice(course.price?.amount ?? 0)}
                          </h4>

                          <div className="flex gap-2">
                            <Chip color="danger" size="lg">
                              {course.category?.title}
                            </Chip>
                            <Chip color="primary" size="lg">
                              {course.subcategory?.title}
                            </Chip>
                          </div>
                        </div>
                      </Link>
                      <div className="flex flex-col gap-4 items-end">
                        <Button
                          variant="outline"
                          className="flex gap-3"
                          onClick={() => {
                            removeFromCart(course);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />
                  </>
                ))}
            </div>

            <PurchaseSummary />
          </div>
        )}
      </div>
    </>
  );
}
