"use client";

import Navbar from "@/components/layout/NavBar";
import PricingPlans from "@/components/pricing/PricingPlans";
import React from "react";

function page() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-4 container mx-auto">
        <PricingPlans />
      </div>
    </div>
  );
}

export default page;
