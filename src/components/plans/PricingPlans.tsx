import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import DowngradeModal from "../modals/DowngradeModal";
import { Slide } from "react-awesome-reveal";
import { FadeLoader } from "react-spinners";
import { TPlan } from "@/types/plans";
import { useAuth } from "@/context/AuthContext";
import { cancelSubscription } from "@/helpers/paystack/cancelSubscription";
import CannotChangePlanModal from "../modals/CannotChangePlanModal";
import { createSubscription } from "@/helpers/paystack/createSubscription";
import { createCustomer } from "@/helpers/paystack/createCustomer";
import { initiateAuthorizationCharge } from "@/helpers/paystack/initiateAuthorizationCharge";
import AuthorizationChargeModal from "../modals/AuthorizationChargeModal";
import { getDateISO } from "@/helpers/getDateISO";
import { freePlan } from "@/constants/plan_types";
import { useRouter } from "next/navigation";
import UpgradeModal from "../modals/UpgradeModal";
import { fetchSubscription } from "@/helpers/paystack/fetchSubscription";

function PricingPlans() {
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<TPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [showCannotChangePlanModal, setShowCannotChangePlanModal] =
    useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [newPlan, setNewPlan] = useState<TPlan | null>(null);

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

  const isDowngrade = (plan: TPlan): boolean => {
    const plansInOrder: string[] = ["free", ...plans.map((plan) => plan.name)];

    const indexOfCurrentPlan = plansInOrder.indexOf(
      user?.subscription.plan.name || "free"
    );
    const indexOfNewPlan = plansInOrder.indexOf(plan.name);

    return indexOfNewPlan < indexOfCurrentPlan;
  };

  const handleAuthorizeUserCard = async () => {
    if (!user || !newPlan) return;
    setSubscribing(true);
    setShowAuthorizationModal(false);

    try {
      const data = await initiateAuthorizationCharge(
        user.email,
        10000, //temporary charge for authorization (N100.00)
        newPlan.plan_code,
        getDateISO(14)
      );
      router.push(data.authorization_url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDowngrade = async () => {
    setShowDowngradeModal(false);
    if (!user || !newPlan) return;

    if (user.subscription.code === "free") return;
    setSubscribing(true);
    try {
      await cancelSubscription(
        user.subscription.code || "",
        user.subscription.token || ""
      );

      const response = await fetchSubscription(user.subscription.code || "");
      const data = response?.data;
      if (!data) return;

      await createSubscription(
        user.uid,
        user.paystack_id || "",
        newPlan.plan_code,
        user.paystack_authorization || "",
        data.next_payment_date
      );

      setSubscribing(false);
      router.push("/billing");
    } catch (error) {
      setSubscribing(false);
      console.log(error);
    }
  };

  const handleUpgrade = async () => {
    console.log(user, newPlan);
    if (!user || !newPlan) return;

    setShowUpgradeModal(false);
    setSubscribing(true);
    try {
      if (!user.paystack_authorization) {
        return setShowAuthorizationModal(true);
      }

      await createSubscription(
        user.uid,
        user.paystack_id || "",
        newPlan.plan_code,
        user.paystack_authorization,
        user.subscription.status ? getDateISO(0) : getDateISO(14)
      );
      router.push("/billing");
      setSubscribing(false);
    } catch (error) {
      setSubscribing(false);
      console.log(error);
    }
  };

  const handleSelectPlan = async (plan: TPlan) => {
    if (!user) return;
    if (["non-renewing", "attention"].includes(user.subscription.status || ""))
      return setShowCannotChangePlanModal(true);

    setNewPlan(plan);

    if (!user.paystack_id)
      await createCustomer(user.uid, user.email, user.firstName, user.lastName);

    // return setShowAuthorizationModal(true);
    if (isDowngrade(plan)) {
      return setShowDowngradeModal(true);
    }

    // upgrade logic here
    return setShowUpgradeModal(true);
  };

  const handleCloseUpgradeModal = () => setShowUpgradeModal(false);
  const handleCloseDowngradeModal = () => setShowDowngradeModal(false);

  const handleCloseAuthorizationModal = () => setShowAuthorizationModal(false);

  const handleCloseCannotChangePlanModal = () =>
    setShowCannotChangePlanModal(false);

  useEffect(() => {
    fetchPicingPlans();
  }, []);

  return (
    <>
      <section className="py-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Choose a Plan
        </h3>
        {error ? (
          <p>{error}</p>
        ) : (
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  justify-center">
          <div className="container flex justify-center gap-3 flex-wrap">
            {!loadingPlans ? (
              <>
                {/* free plan */}
                <Slide direction="right" triggerOnce={true}>
                  <PricingPlan
                    plan={freePlan}
                    isMostPopularPlan={false}
                    handleSelectPlan={handleSelectPlan}
                    subscribing={subscribing}
                    newPlan={newPlan}
                  />
                </Slide>

                {/* other plans */}
                {plans.map((plan, index) => (
                  <Slide
                    key={index}
                    direction="right"
                    delay={(index + 1) * 100}
                    triggerOnce={true}
                  >
                    <PricingPlan
                      plan={plan}
                      isMostPopularPlan={isMostPopularPlan(plan.name)}
                      handleSelectPlan={handleSelectPlan}
                      subscribing={subscribing}
                      newPlan={newPlan}
                    />
                  </Slide>
                ))}
              </>
            ) : (
              <FadeLoader color="#000000" />
            )}
          </div>
        )}
      </section>

      <UpgradeModal
        isOpen={showUpgradeModal}
        handleUpgrade={handleUpgrade}
        handleCloseModal={handleCloseUpgradeModal}
      />

      <DowngradeModal
        isOpen={showDowngradeModal}
        handleDowngrade={handleDowngrade}
        handleCloseModal={handleCloseDowngradeModal}
      />

      <AuthorizationChargeModal
        isOpen={showAuthorizationModal}
        handleProceed={handleAuthorizeUserCard}
        handleCloseModal={handleCloseAuthorizationModal}
      />

      {showCannotChangePlanModal && (
        <CannotChangePlanModal
          handleCloseModal={handleCloseCannotChangePlanModal}
        />
      )}
    </>
  );
}

export default PricingPlans;
