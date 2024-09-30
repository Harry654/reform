export const protectedRoutes: string[] = [
  "/dashboard",
  "/create",
  "/templates",
  "/audience",
  "/analytics",
  "/settings",
  "/plans",
  "/survey/[id]", // Dynamic route pattern
  "/profile",
  "/billing",
];

// Helper function to check if the route matches a protected route with dynamic segments
const matchDynamicRoute = (route: string, pattern: string) => {
  const routeParts = route.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);

  // Ensure both routes have the same length
  if (routeParts.length !== patternParts.length) return false;

  // Match each part, allowing for dynamic segments
  return patternParts.every((part, index) => {
    return part.startsWith("[") || part === routeParts[index];
  });
};

export const isRouteProtected = (route: string): boolean => {
  return protectedRoutes.some((protectedRoute) =>
    matchDynamicRoute(route, protectedRoute)
  );
};
