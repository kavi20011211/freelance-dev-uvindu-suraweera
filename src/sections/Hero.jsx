import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const containerRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".tagline",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          ".title-line",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1.2 },
          "-=0.6",
        )
        .fromTo(
          ".description",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8",
        )
        .fromTo(
          ".cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
          "-=0.6",
        );

      // background subtle movement
      gsap.to(".bg1", {
        x: 50,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg2", {
        x: -40,
        y: -20,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="bg1 absolute inset-0 z-0 scale-100"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(88, 80, 236, 0.4), transparent 30%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="bg2 absolute inset-0 z-0 scale-50"
        style={{
          background:
            "radial-gradient(circle at 70% 90%, rgba(188, 135, 255, 0.4), transparent 50%)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div className="text-center z-10">
        <p className="tagline text-purple-300">
          ENGINEER | VISUAL ARCHITECT | DEVELOPER
        </p>

        <h1 className="title-line font-bold text-5xl sm:text-6xl md:text-8xl lg:text-9xl bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
          <div>Crafting Digital</div>
          <div>Nocturnes</div>
        </h1>

        <p className="description font-light mt-4 text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto">
          Where atmospheric design meets technical precision. Build high
          performance digital experiences that breathe in the dark space of the
          modern tech.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex space-x-6 z-10">
        <button
          className="cta p-3 bg-white text-black font-extrabold rounded-md transition-all duration-300 hover:bg-transparent hover:text-white"
          onClick={() => {
            window.scrollTo({
              top: isMobile ? 654 : 703,
              behavior: "smooth",
            });
          }}
        >
          Explore Works
        </button>

        <button
          className="cta p-3 text-white font-light border-b border-white transition-all duration-300 hover:border-none"
          onClick={() => {
            window.scrollTo({
              top: isMobile ? 1841 : 1620,
              behavior: "smooth",
            });
          }}
        >
          Read Story →
        </button>
      </div>
    </section>
  );
}

export default Hero;
