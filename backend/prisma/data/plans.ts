import { BillingCycle } from '@prisma/client';

export const plans = [
  {
    name: 'Básico',
    description:
      'Ideal para tutores que están comenzando. Con este plan, puedes crear **hasta 1 curso** y comenzar a compartir tu conocimiento con el mundo. ¡Perfecto para dar tus primeros pasos como tutor!',
    price: 3,
    billingCycle: BillingCycle.MONTHLY,

    // features
    maxCourses: 1,
  },
  {
    name: 'Pro',
    description:
      'Para tutores que quieren expandir su impacto. Con este plan, puedes crear **hasta 25 cursos** y llegar a más estudiantes. ¡Ideal para tutores que buscan crecer y diversificar su oferta!',
    price: 15,
    billingCycle: BillingCycle.MONTHLY,

    // features
    maxCourses: 25,
  },

  {
    name: 'Premium',
    description:
      'El plan definitivo para tutores profesionales. Con **acceso ilimitado para crear cursos**, podrás publicar todo el contenido que desees sin restricciones. ¡Ideal para expertos que quieren maximizar su alcance!',
    price: 30,
    billingCycle: BillingCycle.MONTHLY,

    // features
  },

  // ANUAL
  {
    name: 'Pro',
    description:
      'Ahorra mientras creces como tutor. Con este plan, puedes crear **hasta 25 cursos al año** y disfrutar de un **descuento especial por pago anual**. Perfecto para tutores comprometidos que buscan ahorrar a largo plazo.',
    price: 150,
    billingCycle: BillingCycle.ANNUAL,

    // features
    maxCourses: 25,
  },

  {
    name: 'Premium',
    description:
      'El máximo ahorro para el máximo impacto. Con **acceso ilimitado para crear cursos** durante todo el año y un **descuento exclusivo por pago anual**, este plan es ideal para tutores que quieren liderar en su campo.',
    price: 300,
    billingCycle: BillingCycle.ANNUAL,

    // features
  },
];
