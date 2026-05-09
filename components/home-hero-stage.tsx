"use client";

import {
  startTransition,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

type HeroTheme = "light" | "dark";

function subscribeTheme(onStoreChange: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(() => onStoreChange());
  obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

function getThemeSnapshot(): HeroTheme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerThemeSnapshot(): HeroTheme {
  return "dark";
}

export function HomeHeroStage() {
  const theme = useSyncExternalStore<HeroTheme>(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [renderTheme, setRenderTheme] = useState<HeroTheme>(theme);

  useEffect(() => {
    if (renderTheme === theme) return;

    const frame = requestAnimationFrame(() => {
      startTransition(() => {
        setRenderTheme(theme);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [renderTheme, theme]);

  const isLight = renderTheme === "light";

  return (
    <div aria-hidden className="home-hero-stage absolute inset-0 overflow-hidden">
      <ShaderGradientCanvas
        className="absolute inset-0 h-full w-full"
        style={{ width: "100%", height: "100%" }}
        fov={45}
        lazyLoad={false}
        pixelDensity={1}
        pointerEvents="none"
        powerPreference="high-performance"
      >
        {isLight ? (
          <ShaderGradient
            key="halo"
            animate="on"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff5005"
            color2="#dbba95"
            color3="#d0bce1"
            envPreset="city"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="plane"
            uAmplitude={1}
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.4}
            uStrength={4}
            wireframe={false}
          />
        ) : (
          <ShaderGradient
            key="interstella"
            animate="on"
            brightness={0.8}
            cAzimuthAngle={270}
            cDistance={0.5}
            cPolarAngle={180}
            cameraZoom={15.1}
            color1="#73bfc4"
            color2="#ff810a"
            color3="#8da0ce"
            envPreset="city"
            grain="on"
            lightType="env"
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            reflection={0.4}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            shader="defaults"
            type="sphere"
            uAmplitude={3.2}
            uDensity={0.8}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={0.3}
            wireframe={false}
          />
        )}
      </ShaderGradientCanvas>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--frame-soft)_1px,transparent_1px),linear-gradient(to_bottom,var(--frame-soft)_1px,transparent_1px)] bg-[size:calc(100%/8)_100%,100%_calc(100%/5)] opacity-18" />
    </div>
  );
}
