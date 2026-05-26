"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceDimensions {
  width: number;
  height: number;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [dimensions, setDimensions] = useState<DeviceDimensions>({
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({ width, height });

      // Mobile: < 768px (Tailwind md breakpoint)
      // Tablet: 768px - 1024px (Tailwind md to lg breakpoint)
      // Desktop: >= 1024px (Tailwind lg breakpoint and above)

      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Deteksi saat pertama kali load
    detectDevice();

    // Deteksi saat window di-resize
    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
    width: dimensions.width,
    height: dimensions.height,
    isMounted,
  };
}
