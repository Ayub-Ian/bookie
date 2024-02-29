import { useRouter as useRouterOriginal } from "next/navigation";

import { onStart } from "../events";
import { shouldTriggerStartEvent } from "./trigger";

export function useRouter() {
  const router = useRouterOriginal();
  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.replace(href, options);
    },
  };
}