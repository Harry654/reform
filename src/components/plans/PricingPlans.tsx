import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Slide } from "react-awesome-reveal";
import { FadeLoader } from "react-spinners";
import { TPlan } from "@/types/plans";

function PricingPlans() {
  const [plans, setPlans] = useState<TPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function isMostPopularPlan(name: string) {
    // Find the plan with the highest number of subscriptions
    const mostPopular = plans.reduce((mostPopular, currentPlan) => {
      return currentPlan.active_subscriptions > mostPopular.active_subscriptions
        ? currentPlan
        : mostPopular;
    });
    return mostPopular.name === name;
  }

  const fetchPicingPlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await fetch("/api/paystack/fetch-plans", {
        method: "GET",
      });

      const { data: plans } = await response.json();

      const filteredPlans = plans.filter(
        (plan: { [key: string]: string | boolean | number | null }) =>
          !plan.is_deleted && !plan.is_archived
      );

      const convertedPlans = filteredPlans as TPlan[];
      const sortedPlans = convertedPlans.sort((a, b) => a.amount - b.amount);
      setPlans(sortedPlans);

      setLoadingPlans(false);
    } catch (error) {
      setError("Error fetching plans");
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPicingPlans();
  }, []);

  return (
    <section className="py-20">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Choose a Plan
      </h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loadingPlans ? (
            plans.map((plan, index) => (
              <Slide
                key={index}
                direction="right"
                delay={index * 100}
                triggerOnce={true}
              >
                <PricingPlan
                  plan={plan}
                  isMostPopularPlan={isMostPopularPlan(plan.name)}
                />
              </Slide>
            ))
          ) : (
            <FadeLoader color="#000000" />
          )}
        </div>
      )}
    </section>
  );
}

export default PricingPlans;
