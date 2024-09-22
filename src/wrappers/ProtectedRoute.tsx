"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { isRouteProtected } from "@/constants/protectedRoutes";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, loginUrl } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"

  useEffect(() => {
    setLoading(true);

    // if the user is not logged in and the page requires authentication
    if (isRouteProtected(pathname) && !user) {
      // redirect to login
      router.push(loginUrl);

      // wait for redirect to finish before displaying page content
      setTimeout(() => setLoading(false), 3000);
    } else {
      // display page content
      setLoading(false);
    }
  }, [user, pathname]);

  return !loading ? children : <FullPageLoader />;
};

export default ProtectedRoute;
