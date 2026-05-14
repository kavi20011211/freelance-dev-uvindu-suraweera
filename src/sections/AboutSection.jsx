import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import me from "../assets/me.png";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        ".about-content",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Image animation
      gsap.fromTo(
        ".about-image",
        {
          scale: 0.8,
          opacity: 0,
          rotate: -4,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Floating animation
      gsap.to(".floating-image", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        min-h-screen
        bg-black
        px-6
        md:px-16
        py-20
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-16
        overflow-hidden
      "
    >
      {/* LEFT SIDE */}
      <div className="about-content max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          About The
          <br />
          <span className=" bg-linear-to-b from-indigo-900 to-white bg-clip-text text-transparent leading-tight">
            Alchemist
          </span>
        </h2>

        <p className="font-medium text-gray-400 text-lg md:text-2xl leading-relaxed">
          Turn base metals into gold using the
          <span className="text-white font-semibold">
            {" "}
            “Philosopher&apos;s Stone”
          </span>
          .
          <br />
          <br />I design and engineer modern digital experiences with clean
          architecture, scalable systems, and cinematic interfaces.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="about-image floating-image relative flex justify-center items-center">
        {/* Glow */}
        {/* Glow Behind Card */}
        <div
          className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[320px]
    h-80
    md:w-[500px]
    md:h-[500px]
    rounded-full
    blur-[100px]
    opacity-70
    z-0
    pointer-events-none
  "
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(88,80,236,0.5), rgba(168,85,247,0.25), transparent 70%)",
          }}
        />

        {/* Image Card */}
        <div
          className="
    relative
    z-10
    group
    w-[280px]
    h-[380px]
    sm:w-[340px]
    sm:h-[460px]
    md:w-[400px]
    md:h-[540px]
    lg:w-[430px]
    lg:h-[580px]
    rounded-4xl
    overflow-hidden
    border
    border-white/10
    bg-zinc-900
    shadow-[0_20px_80px_rgba(0,0,0,0.7)]
    backdrop-blur-xl
  "
        >
          <img
            src={me}
            alt="Me"
            className="
              w-full
              h-full
              object-cover
              object-top
              transition-all
              duration-700
              group-hover:scale-105
            "
          />

          {/* Gradient Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-linear-to-t
              from-black/70
              via-black/10
              to-transparent
            "
          />

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 p-6 z-10">
            <h3 className="text-2xl font-bold text-white">
              Full Stack Software Engineer
            </h3>

            <p className="text-gray-300 mt-1">
              Building scalable products & cinematic web experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
