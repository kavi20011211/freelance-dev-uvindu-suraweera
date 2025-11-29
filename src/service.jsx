import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

function Service() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const sectionsRef = useRef(null);
  const section1Ref = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const sections = sectionsRef.current;
    const section1 = section1Ref.current;

    if (!wrapper || !content || !sections || !section1) return;

    let winWidth = window.innerWidth;
    let smoother, observer, direction;

    // Disable ScrollSmoother when used as a child component
    // ScrollSmoother interferes with parent scrolling
    smoother = null;

    // Update Direction (and perspective-origin) - Simplified without smoother
    function updateDirection(theObserver, immediate = false) {
      const perspectiveOriginX = Math.floor(
        100 - (theObserver.startX / winWidth) * 100
      );
      const perspectiveOriginY = 50; // Fixed value since no smoother

      if (immediate) {
        gsap.set(sections, {
          perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
        });
      } else {
        gsap.to(sections, {
          perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
          duration: 0.5,
        });
      }

      direction = theObserver.deltaY < 0 ? "up" : "down";

      // Direction for drag is inversed
      if (direction === "up") {
        gsap.to(section1, {
          rotateX: "3deg",
          duration: 0.5,
        });
      } else if (direction === "down") {
        gsap.to(section1, {
          rotateX: "-3deg",
          duration: 0.5,
        });
      }
    }

    // Observer
    function initObserver() {
      observer = Observer.create({
        target: document.body,
        ignore: "[data-ignore]",
        type: "pointer",
        onToggleY: (self) => {
          updateDirection(self);
        },
        onPress: (self) => {
          gsap.set(content, {
            cursor: "grabbing",
          });

          updateDirection(self, true);

          gsap.to("body", {
            backgroundColor: "#111",
            duration: 0.5,
          });
          gsap.to(section1, {
            scale: 0.97,
            duration: 0.5,
          });
        },
        onRelease: (self) => {
          gsap.set(content, {
            cursor: "grab",
          });

          gsap.to(section1, {
            rotateX: "0deg",
          });
          gsap.to("body", {
            backgroundColor: "#222",
            duration: 0.5,
          });
          gsap.to(section1, {
            scale: 1,
            duration: 0.5,
          });
        },
        tolerance: 10,
      });
    }

    // Section 1 Animations
    const introTl = gsap.timeline();

    introTl
      .fromTo(
        section1,
        {
          transformOrigin: "center bottom",
          autoAlpha: 0,
          yPercent: 50,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          delay: 1,
          ease: "expo",
        }
      )
      .from(
        ".title-1 .title-text",
        {
          yPercent: 100,
          duration: 1,
          ease: "power3",
        },
        1.5
      )
      .from(
        ".title-2 .title-text",
        {
          autoAlpha: 0,
          duration: 1.5,
        },
        2
      )
      .from(
        ".sub-title-1",
        {
          autoAlpha: 0,
          x: 30,
          duration: 0.5,
          ease: "power3",
        },
        "-=1"
      )
      .from(
        ".sub-title-2",
        {
          autoAlpha: 0,
          x: -30,
          duration: 0.5,
          ease: "power3",
        },
        "-=1"
      )
      .from(
        ".credit",
        {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            initPage();
          },
        },
        "-=1"
      );

    // Section 2 Animations
    gsap.fromTo(
      ".section-2 .info",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 2,
        scrollTrigger: {
          scrub: true,
          trigger: ".section-2 .info",
          start: "center 80%",
          end: "center center",
        },
      }
    );

    // Init Page - Simplified without smoother
    function initPage() {
      initObserver();

      gsap.set(content, {
        cursor: "grab",
      });

      gsap.to(".indicator", {
        autoAlpha: 1,
        duration: 1,
        onComplete: () => {
          gsap.fromTo(
            ".indicator",
            {
              autoAlpha: 1,
            },
            {
              autoAlpha: 0,
              duration: 1,
              scrollTrigger: {
                scrub: true,
                trigger: ".indicator",
                start: "center 80%",
                end: "center 70%",
              },
            }
          );
        },
      });
    }

    // Resize
    function onResize() {
      winWidth = window.innerWidth;
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (observer) observer.kill();
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
      `}</style>

      <div id="wrapper" ref={wrapperRef} className="min-h-screen">
        <div
          id="content"
          ref={contentRef}
          className="flex justify-center bg-[#222]"
          style={{ height: "197vh" }}
        >
          <div className="sections" ref={sectionsRef}>
            {/* Section 1 */}
            <section
              className="section-1 relative z-10 w-[90vw] mt-[5vw] bg-[#88CE02] rounded-xl"
              ref={section1Ref}
              style={{ minHeight: "calc(100vh + 5vw)" }}
            >
              <div
                className="c-title absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-[#121212]"
                style={{ letterSpacing: "-0.03em" }}
              >
                <div className="info relative flex flex-wrap content-center justify-center -translate-y-full">
                  <div className="sub-title sub-title-1 font-book font-slant relative mt-[3.6vw] text-[2vw]">
                    <em>GSAP</em>
                  </div>

                  <div
                    className="title title-1 font-bold font-slant overflow-hidden leading-[1.4] px-[0.5ch]"
                    style={{
                      fontSize: "clamp(36px, 6.6vw, 154px)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    <div className="title-text">Drag Demo</div>
                  </div>

                  <div className="sub-title sub-title-2 font-book font-slant relative mt-[3.6vw] text-[2vw]">
                    <em>v3.10</em>
                  </div>

                  <div
                    className="title title-2 font-medium font-slant overflow-hidden leading-[1.4] w-full -mt-[1.5vw]"
                    style={{
                      fontSize: "clamp(30px, 5.5vw, 129px)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <div className="title-text">
                      <span className="font-book">with</span> ScrollSmoother
                    </div>
                  </div>
                </div>

                <div
                  className="indicator absolute opacity-0 invisible"
                  style={{
                    top: "80vh",
                    transform: "translateY(-100%)",
                    fontSize: "clamp(48px, 5.5vw, 129px)",
                  }}
                >
                  <div className="pointer">☟</div>
                </div>

                <div
                  className="credit font-medium absolute bottom-[5vw] z-10"
                  style={{ letterSpacing: "0.01em" }}
                >
                  By:{" "}
                  <a
                    href="https://vanholtz.co"
                    target="_blank"
                    rel="noopener"
                    data-ignore
                    className="text-[#121212]"
                  >
                    Eric Van Holtz
                  </a>
                </div>
              </div>
            </section>

            {/* Section 2 */}
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
                  className="font-medium text-[#88CE02]"
                  href="https://greensock.com/docs/v3/Plugins/ScrollSmoother"
                  target="_blank"
                  rel="noopener"
                  data-ignore
                >
                  The Greensock Docs
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
