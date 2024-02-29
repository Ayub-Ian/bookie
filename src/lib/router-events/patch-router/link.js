import NextLink from "next/link";
import { forwardRef } from "react";

import { onStart } from "../events";
import { shouldTriggerStartEvent } from "./trigger";

export const NavLink = forwardRef(function Link(
  { href, onClick, ...rest },
  ref,
) {
  const useLink = href && href.startsWith("/");
  if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

  return (
    <NextLink
      href={href}
      onClick={(event) => {
        if (shouldTriggerStartEvent(href, event)) onStart();
        if (onClick) onClick(event);
      }}
      {...rest}
      ref={ref}
    />
  );
});