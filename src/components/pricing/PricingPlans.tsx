import React from "react";
import PricingPlan from "./PricingPlan";
import { pricingPlans } from "@/constants/pricingPlans";
import { Slide } from "react-awesome-reveal";

function PricingPlans() {
  return (
    <section className="py-20">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Pricing Plans
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Slide
            key={index}
            direction="right"
            delay={index * 100}
            triggerOnce={true}
          >
            <PricingPlan plan={plan} />
          </Slide>
        ))}
      </div>
    </section>
  );
}

export default PricingPlans;
