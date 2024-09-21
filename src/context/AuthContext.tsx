"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Suspense,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { TFirestoreUser } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import FullPageLoader from "@/components/FullPageLoader";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { isRouteProtected } from "@/constants/protectedRoutes";

// Define the shape of your context
interface AuthContextType {
  user: TFirestoreUser | null;
  setUser: React.Dispatch<React.SetStateAction<TFirestoreUser | null>>;
  loading: boolean;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TFirestoreUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"
  const searchParams = useSearchParams(); // Get the current query parameters

  // Construct query parameters string
  const params = new URLSearchParams(searchParams);

  // Build the redirect URL: path + query params
  const redirect_url = `${pathname}?${params.toString()}`;

  // Construct the login URL with the redirect_url
  const loginUrl = `/auth/login?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (firebaseUser) {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(userDoc.data() as TFirestoreUser); // Cast to FirestoreUser type
          } else {
            setUser(null);
            if (isRouteProtected(pathname)) router.push(loginUrl);
          }
        } else {
          setUser(null);
          if (isRouteProtected(pathname)) router.push(loginUrl);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <AuthContext.Provider value={{ user, setUser, loading, logout }}>
        {!loading ? children : <FullPageLoader />}
      </AuthContext.Provider>
    </Suspense>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
