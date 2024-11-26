"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import { assetImg } from "@/libs/asset";
import { formatPrice } from "@/libs/format";
import { useCartStore } from "@/store/cart";
import { Chip, Image } from "@nextui-org/react";
import { ShoppingCart, Trash } from "lucide-react";

export default function ShoppingCartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-50 text-center">
          Carrito de compra
        </h1>

        {cart.length === 0 ? (
          <>
            <section className="dark:text-zinc-300 text-xl font-semibold flex flex-col items-center w-full my-36 gap-4">
              <ShoppingCart className="w-28 h-28" />
              <p>Tu carro esta vacio</p>
            </section>
          </>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8 my-16 mx-5">
              <div className="lg:col-span-2 space-y-4">
                {cart &&
                  cart.map((course) => (
                    <>
                      <div
                        className="grid grid-cols-8 items-start gap-4"
                        key={course.id}
                      >
                        <div className="col-span-7 flex items-start gap-4">
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
                              <Chip>{course.category?.title}</Chip>
                              <Chip>{course.subcategory?.title}</Chip>
                            </div>
                          </div>
                        </div>

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

                      <hr className="border-gray-300" />
                    </>
                  ))}
              </div>

              <Card className="p-4">
                <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
                  Resumen de la compra
                </h3>

                <form className="mt-6">
                  <div>
                    <h3 className="text-base text-gray-800  font-semibold mb-4">
                      Enter Details
                    </h3>
                    <div className="space-y-3">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="10"
                            cy="7"
                            r="6"
                            data-original="#000000"
                          ></circle>
                          <path
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>

                      <div className="relative flex items-center">
                        <input
                          type="email"
                          placeholder="Email"
                          className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 682.667 682.667"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              ></path>
                            </clipPath>
                          </defs>
                          <g
                            clip-path="url(#a)"
                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                          >
                            <path
                              fill="none"
                              stroke-miterlimit="10"
                              stroke-width="40"
                              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                              data-original="#000000"
                            ></path>
                          </g>
                        </svg>
                      </div>

                      <div className="relative flex items-center">
                        <input
                          type="number"
                          placeholder="Phone No."
                          className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                        />
                        <svg
                          fill="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>

                <ul className="text-gray-800 mt-6 space-y-3">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal <span className="ml-auto font-bold">$200.00</span>
                  </li>
                  <hr className="border-gray-300" />
                  <li className="flex flex-wrap gap-4 text-sm font-bold">
                    Total <span className="ml-auto">$206.00</span>
                  </li>
                </ul>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                  >
                    Continue Shopping{" "}
                  </button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
}
