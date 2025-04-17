"use client";

import { InfoCards } from "./InfoCards";
import { MonthlyRegistrationsChart } from "./MonthlyRegistrationsChart";

export function Overview() {
  return (
    <>
      <InfoCards />

      <MonthlyRegistrationsChart />
    </>
  );
}
