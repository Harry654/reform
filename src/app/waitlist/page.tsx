import Countdown from "@/components/Countdown";
import FullPageLoader from "@/components/FullPageLoader";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Countdown />
    </Suspense>
  );
}
