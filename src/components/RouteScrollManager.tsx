import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let frameId = 0;
    let attempts = 0;

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ block: "start", inline: "nearest" });
        return;
      }

      attempts += 1;

      if (attempts < 10) {
        frameId = window.requestAnimationFrame(scrollToTarget);
      }
    };

    frameId = window.requestAnimationFrame(scrollToTarget);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [hash, pathname]);

  return null;
}