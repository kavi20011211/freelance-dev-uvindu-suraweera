import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aiagent from "../assets/aiagent.jpg";
import digitaltwin from "../assets/digital.jpg";
import game from "../assets/game.jpg";
import physics from "../assets/physics.jpg";

gsap.registerPlugin(ScrollTrigger);

function ProjectShowCase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col p-4 px-4 bg-black"
    >
      <div className="mb-12">
        <h2 className="text-4xl  md:text-7xl font-bold text-white mb-2">
          Selected Work
        </h2>
        <p className="font-medium text-gray-500 md:text-2xl">
          A curation of projects where I've pushed the boundaries of
          <br />
          visual storytelling and code.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {/* BIG FEATURE CARD */}
        <div className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group">
          <img
            src={digitaltwin}
            srcSet={`${digitaltwin} 1x`}
            alt="Cyberseeds Digital Twin"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" /> */}

          <div className="absolute bottom-6 left-6 z-10">
            <p className="text-sm text-purple-400 tracking-widest">
              Agri Tech Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Cyberseeds Digital Twin
            </h2>
            <a href="https://ieeexplore.ieee.org/document/11361455">
              <p className="mt-2 text-gray-300">View Case Study →</p>
            </a>
          </div>
        </div>

        {/* RIGHT TALL CARD */}
        <div className="relative md:row-span-2 rounded-2xl overflow-hidden group">
          <img
            src={aiagent}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 left-6 z-10">
            <a href="https://github.com/kavi20011211/Optimus.git">
              <h3 className="text-2xl font-semibold">Optimus AI Agent</h3>
            </a>
            <p className="text-gray-400">Experimental AI Engineering</p>
          </div>
        </div>

        {/* BOTTOM LEFT CARD */}
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={physics}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 left-6 z-10">
            <a href="https://github.com/kavi20011211/physics-engine-from-scratch.git">
              <h3 className="text-xl font-semibold">Phy6s</h3>
            </a>

            <p className="text-gray-400 text-sm">Physics Engine From Scratch</p>
          </div>
        </div>

        {/* WIDE CARD */}
        <div className="relative md:col-span-2 rounded-2xl overflow-hidden group flex items-center">
          <img
            src={game}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 p-8 max-w-lg">
            <a href="https://github.com/kavi20011211/hello_fighter_game.git">
              <h3 className="text-3xl font-bold">Hello Fighter</h3>
            </a>

            <p className="text-gray-300 mt-3">
              2-D action game from scratch for education purpose
            </p>

            <div className="flex gap-3 mt-4 text-xs">
              <span className="px-3 py-1 bg-purple-600/30 rounded-full">
                GAME PHYSICS
              </span>
              <span className="px-3 py-1 bg-purple-600/30 rounded-full">
                C++
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectShowCase;
