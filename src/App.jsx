import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { AsteriskIcon, StarIcon } from "./component";
import backgroundImg from "./assets/background.png";
import Service from "./service";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      // === Set initial state for content ===
      gsap.set(".intro-content", {
        opacity: 0,
        y: 60,
      });

      // === IMAGE SPLIT REVEAL ANIMATION ===
      const introSection = document.querySelector(".intro-section");

      if (!introSection) return; // Safety check

      const swipeContainer = document.createElement("div");
      swipeContainer.className = "swipe-container";
      swipeContainer.style.cssText =
        "position: absolute; inset: 0; pointer-events: none; z-index: 10;";

      // Create 8 swipe panels
      for (let i = 0; i < 8; i++) {
        const swipe = document.createElement("div");
        swipe.className = "anim-swipe";
        swipe.style.cssText = `
        position: absolute;
        top: 0;
        left: ${i * 12.5}%;
        width: 12.5%;
        height: 100%;
        background: #111827;
      `;
        swipeContainer.appendChild(swipe);
      }

      introSection.insertBefore(swipeContainer, introSection.firstChild);

      // Create master timeline
      const masterTl = gsap.timeline();

      // 1. Animate swipe panels
      masterTl.to(".anim-swipe", {
        yPercent: 300,
        duration: 1.5,
        stagger: {
          from: "random",
          each: 0.1,
        },
        ease: "sine.out",
      });

      // 2. Reveal content (happens during swipe)
      masterTl.to(
        ".intro-content",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1" // Start 1 second before swipe ends
      );
    }, 100);

    // Parallax zoom on scroll
    gsap.to(".intro-section", {
      backgroundSize: "150%",
      ease: "none",
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // === Asterisk rotation ===
    gsap.to(".asterisk-icon", {
      rotation: 360,
      duration: 2.5,
      repeat: -1,
      repeatDelay: 0,
    });

    // === Your existing horizontal scroll code ===
    if (textRef.current && containerRef.current && scrollContainerRef.current) {
      const text = textRef.current.textContent;
      textRef.current.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="char inline-block">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");

      const chars = gsap.utils.toArray(".char");
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set(chars, { opacity: 0.3 });
      gsap.set(".star-icon", { opacity: 0.3, rotation: 0 });

      gsap.to(chars, {
        opacity: 1,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth * 1.25}`,
          scrub: true,
        },
      });

      gsap.to(".star-icon", {
        rotation: 360,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth * 0.3}`,
          scrub: true,
        },
      });
    }

    // === Header color change ===
    if (headerRef.current && wrapperRef.current) {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 10%",
        end: "bottom 10%",
        onEnter: () => {
          gsap.to(headerRef.current.querySelectorAll("h1, a"), {
            color: "#ffffff",
            duration: 0.3,
          });
        },
        onLeave: () => {
          gsap.to(headerRef.current.querySelectorAll("h1, a"), {
            color: "#111827",
            duration: 0.3,
          });
        },
        onEnterBack: () => {
          gsap.to(headerRef.current.querySelectorAll("h1, a"), {
            color: "#ffffff",
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current.querySelectorAll("h1, a"), {
            color: "#111827",
            duration: 0.3,
          });
        },
      });
    }

    // === Mobile popup ===
    if (window.innerWidth < 768) {
      const popup = document.createElement("div");
      popup.className = "mobile-popup";
      popup.innerHTML = `
    <div class="mobile-popup-box">
      <p>✨ Use the desktop version for a better experience</p>
      <button class="close-popup">Got it</button>
    </div>
  `;

      document.body.appendChild(popup);

      // Animate popup
      gsap.fromTo(
        ".mobile-popup-box",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // Close popup
      popup.querySelector(".close-popup").addEventListener("click", () => {
        gsap.to(".mobile-popup", {
          opacity: 0,
          duration: 0.4,
          onComplete: () => popup.remove(),
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(".star-icon");
      gsap.killTweensOf(".asterisk-icon");
      gsap.killTweensOf(".intro-section");
      gsap.killTweensOf(".intro-content");
      gsap.killTweensOf(".anim-swipe");

      // Cleanup swipe container
      const swipeContainer = document.querySelector(".swipe-container");
      if (swipeContainer) swipeContainer.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap');
        
        .font-bold {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
        }
        .font-medium {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
        }
        .font-book {
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
        }
        .font-slant {
          font-feature-settings: "salt";
        }
        
        #content {
          background-image:
            linear-gradient(rgba(255,255,255,.07) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 2px),
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
        }
        
        .sections {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        @keyframes pointDown {
          0%, 40%, 100% {
            transform: translateY(0);
          }
          10%, 30% {
            transform: translateY(20px);
          }
          20% {
            transform: translateY(0);
          }
        }
        
        .pointer {
          animation: pointDown 2.5s infinite;
        }
        
        /* Mobile popup */
.mobile-popup {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.mobile-popup-box {
  background: white;
  padding: 22px 32px;
  border-radius: 16px;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  max-width: 300px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

.mobile-popup-box p {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 15px;
}

.mobile-popup-box .close-popup {
  background: #111827;
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.mobile-popup-box .close-popup:hover {
  background: #333;
}

      `}</style>
      <div className="bg-white">
        {/* Header */}
        <header
          ref={headerRef}
          className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex items-center justify-between backdrop-blur-md bg-white/70 shadow-sm"
        >
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            dev_kavi
          </h1>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a
              href="https://wa.me/+94783158893"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              WhatsApp
            </a>

            <a
              href="https://www.upwork.com/freelancers/~0134fad8b892aed033"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Upwork
            </a>

            <a
              href="https://www.fiverr.com/s/ljGKgDR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Fiverr
            </a>
          </nav>
        </header>

        {/* Intro section */}
        <div
          className="intro-section relative h-screen flex items-center justify-center bg-white px-6 md:px-10 bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "110%",
          }}
        >
          {/* Left section — Text + Icon */}
          <div className="intro-content w-[200px] md:w-[800px] flex flex-col gap-4 md:gap-8 p-8 md:p-16 relative z-20">
            <AsteriskIcon size={100} className="asterisk-icon" />

            <h1 className="text-[25px] md:text-[80px] leading-[0.9] font-black bg-linear-to-b from-gray-400 to-gray-200 md:bg-linear-to-br md:from-black md:to-gray-200 bg-clip-text text-transparent">
              I design <span className="text-gray-400">first class</span>{" "}
              Websites
            </h1>
          </div>

          {/* Right section — Description */}
          <div className="intro-content flex-1 flex justify-end pr-7 md:pr-14 relative z-20">
            <p className="max-w-[200px] md:max-w-[420px] text-[10px] md:text-[18px] bg-linear-to-br from-gray-800 to-gray-400 bg-clip-text text-transparent md:text-gray-800 leading-relaxed">
              <span className="font-black text-gray-50 md:text-gray-400">
                Uvindu Suraweera
              </span>{" "}
              is a{" "}
              <span className="font-semibold text-gray-700 md:text-gray-700">
                developer
              </span>{" "}
              specializing in{" "}
              <span className="font-semibold text-gray-700 md:text-gray-700">
                website development
              </span>
              . I help businesses achieve their goals through thoughtful{" "}
              <span className="font-semibold text-gray-700 md:text-gray-700">
                design
              </span>{" "}
              and{" "}
              <span className="font-semibold text-white md:text-gray-700">
                implementation
              </span>
              . I build{" "}
              <span className="underline decoration-white md:decoration-gray-300 underline-offset-4">
                responsive
              </span>
              ,{" "}
              <span className="underline decoration-white md:decoration-gray-300 underline-offset-4">
                animated
              </span>{" "}
              websites using the latest technologies.
              <br />
              <br />
              <span className="font-semibold  bg-linear-to-r from-gray-300 to-gray-100 md:from-gray-800 md:to-gray-200 bg-clip-text text-transparent">
                Let's connect.
              </span>
            </p>
          </div>
        </div>

        {/* Horizontal scroll section */}
        <div ref={containerRef} className="h-screen overflow-hidden bg-gray-50">
          <div
            ref={scrollContainerRef}
            className="h-full flex items-center whitespace-nowrap"
          >
            <div className="flex items-center justify-start min-w-screen p-20 gap-8">
              <StarIcon className="star-icon" size={180} bgColor="#c5d5c0" />
              <p
                ref={textRef}
                className="text-[200px] font-black text-gray-900 leading-none"
              >
                Looking for a better custom web design; here I am:
              </p>
            </div>
          </div>
        </div>

        <Service />

        {/* Dark section wrapper */}
        <div id="wrapper" ref={wrapperRef} className="min-h-screen">
          <div id="content" className="flex justify-center bg-[#222]">
            <div className="sections">
              {/* Section */}
              <section
                className="section-2 font-book relative flex flex-wrap content-center justify-center w-[90vw] min-h-screen text-center text-white"
                data-speed="0.75"
                style={{
                  fontSize: "clamp(24px, 4.4vw, 103px)",
                  letterSpacing: "-0.04em",
                }}
              >
                <div className="info -translate-y-1/2">
                  <div className="text w-full mb-[5px]">
                    For more information visit:
                  </div>

                  <a
                    className="font-medium text-gray-400"
                    href="https://www.fiverr.com/s/e6ewKPP"
                    target="_blank"
                    rel="noopener"
                    data-ignore
                  >
                    Uvindu Suraweera
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
