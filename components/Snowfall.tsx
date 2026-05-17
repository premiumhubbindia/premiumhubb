"use client";

import Particles from "react-tsparticles";

import { loadSlim } from "tsparticles-slim";

import type { Engine } from "tsparticles-engine";

export default function Snowfall() {

  async function particlesInit(
    engine: Engine
  ) {

    await loadSlim(engine);
  }

  return (

    <Particles
      id="premium-particles"
      init={particlesInit}
      options={{

        fullScreen: {
          enable: false,
        },

        background: {
          color: "transparent",
        },

        fpsLimit: 60,

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },

            resize: true,
          },

          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },

        particles: {

          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },

          color: {
            value: [
              "#FFD700",
              "#ffffff",
              "#facc15",
              "#f59e0b",
            ],
          },

          shape: {
            type: "circle",
          },

          opacity: {
            value: {
              min: 0.2,
              max: 0.8,
            },
          },

          size: {
            value: {
              min: 4,
              max: 12,
            },
          },

          links: {
            enable: false,
          },

          move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            random: true,
            straight: false,

            outModes: {
              default: "out",
            },
          },

        },

        detectRetina: true,
      }}

      className="absolute inset-0 z-0 pointer-events-none"
    />

  );
}