"use client";

import FullPageLoader from "@/components/FullPageLoader";
import Navbar from "@/components/layout/NavBar";
import PricingPlans from "@/components/plans/PricingPlans";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="min-h-screen">
        <Navbar />

        <div className="px-4 container mx-auto">
          <PricingPlans />
        </div>
      </div>
    </Suspense>
  );
}

export default page;
