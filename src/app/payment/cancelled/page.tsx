import React, { Suspense } from "react";
import PaymentCancelled from "@/components/PaymentCancelled";
import FullPageLoader from "@/components/FullPageLoader";

function page() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <PaymentCancelled />;
    </Suspense>
  );
}

export default page;
