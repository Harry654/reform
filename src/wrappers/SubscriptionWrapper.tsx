"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Assuming you're using an auth context
import { isRouteProtected } from "@/constants/protectedRoutes";
import FullPageLoader from "@/components/FullPageLoader";

interface SubscriptionWrapperProps {
  children: React.ReactNode;
}

const SubscriptionWrapper: React.FC<SubscriptionWrapperProps> = ({
  children,
}) => {
  const { user } = useAuth(); // Get the current user from the auth context
  const router = useRouter();
  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"

  useEffect(() => {
    // if it's not a protected route
    if (!isRouteProtected(pathname)) return;

    if (!user) return; // Wait until user is loaded
    if (user.subscriptionStatus === "not-started") {
      router.push("/pricing"); // Redirect to pricing if no subscription plan
    }
  }, [user, router, pathname]);

  //   if (!user || !user.subscriptionPlan) {
  //     return null; // Optionally render nothing while redirecting
  //   }

  return <Suspense fallback={<FullPageLoader />}>{children}</Suspense>; // Render wrapped content if user has a subscription plan
};

export default SubscriptionWrapper;
