import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaReact, FaNodeJs, FaGithub, FaFigma, FaAws } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiTypescript,
  SiExpress,
  SiSpringboot,
  SiMui,
  SiJavascript,
  SiMysql,
  SiApachekafka,
  SiRabbitmq,
  SiRedux,
  SiRedis,
  SiLangchain,
  SiNginx,
  SiDocker,
  SiJenkins,
  SiPytorch,
  SiTensorflow,
} from "react-icons/si";

const stacks = [
  {
    category: "Frontend",
    tools: [
      { icon: <FaReact />, name: "React" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiJavascript />, name: "JavaScript" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
      { icon: <SiMui />, name: "Mui" },
    ],
  },
  {
    category: "Backend",
    tools: [
      { icon: <SiSpringboot />, name: "Springboot" },
      { icon: <FaNodeJs />, name: "Node.js" },
      { icon: <SiExpress />, name: "Express" },
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <SiFirebase />, name: "Firebase" },
      { icon: <SiMysql />, name: "MySQL" },
    ],
  },
  {
    category: "Tools",
    tools: [
      { icon: <FaGithub />, name: "GitHub" },
      { icon: <FaFigma />, name: "Figma" },
      { icon: <SiApachekafka />, name: "Apache Kafka" },
      { icon: <SiRabbitmq />, name: "Rabbit MQ" },
      { icon: <SiRedux />, name: "Redux" },
      { icon: <SiRedis />, name: "Redis" },
      { icon: <SiLangchain />, name: "Langchain" },
      { icon: <SiNginx />, name: "Nginx" },
      { icon: <SiDocker />, name: "Docker" },
      { icon: <SiJenkins />, name: "Jenkins" },
      { icon: <FaAws />, name: "AWS" },
      { icon: <SiPytorch />, name: "Pytorch" },
      { icon: <SiTensorflow />, name: "Tensorflow" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stack-panel", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // gsap.from(".tool-chip", {
      //   opacity: 0,
      //   scale: 0.8,
      //   stagger: 0.03,
      //   duration: 0.6,
      //   ease: "back.out(1.7)",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top 70%",
      //   },
      // });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        px-6
        md:px-20
        py-32
      "
    >
      {/* BACKGROUND LIGHTING */}
      <div
        className="
        absolute
        top-[-200px]
        right-[-100px]
        w-[500px]
        h-[500px]
        rounded-full
        bg-indigo-500/10
        blur-[140px]
      "
      />

      <div
        className="
        absolute
        bottom-[-200px]
        left-[-100px]
        w-[400px]
        h-[400px]
        rounded-full
        bg-cyan-500/10
        blur-[140px]
      "
      />

      {/* HEADER */}
      <div className="relative z-10 max-w-4xl mb-24">
        <h2
          className="
          text-5xl
          md:text-7xl
          font-black
          leading-[0.95]
          text-white
        "
        >
          Technologies
          <br />
          <span
            className="
            text-transparent
            bg-clip-text
            bg-linear-to-r
            from-white
            to-zinc-500
          "
          >
            I Work With
          </span>
        </h2>

        <p
          className="
          mt-8
          text-zinc-400
          text-lg
          md:text-xl
          max-w-2xl
          leading-relaxed
        "
        >
          A curated stack of technologies, frameworks, and infrastructure tools
          used to build scalable digital products.
        </p>
      </div>

      {/* STACK PANELS */}
      <div
        className="
        relative
        z-10
        flex
        flex-col
        gap-10
      "
      >
        {stacks.map((group, index) => (
          <div
            key={index}
            className="
              stack-panel
              relative
              overflow-hidden
              rounded-4xl
              border
              border-white/10
              bg-white/3
              backdrop-blur-2xl
              p-8
              md:p-10
            "
          >
            {/* PANEL GLOW */}
            <div
              className="
              absolute
              inset-0
              bg-linear-to-br
              from-indigo-500/5
              via-transparent
              to-cyan-500/5
            "
            />

            {/* PANEL HEADER */}
            <div
              className="
              relative
              z-10
              flex
              items-center
              justify-between
              mb-10
            "
            >
              <h3
                className="
                text-2xl
                md:text-3xl
                font-bold
                text-white
              "
              >
                {group.category}
              </h3>

              <div
                className="
                h-px
                flex-1
                mx-6
                bg-linear-to-r
                from-white/20
                to-transparent
              "
              />

              <span
                className="
                text-sm
                text-zinc-500
              "
              >
                {group.tools.length} Tools
              </span>
            </div>

            {/* TOOLS */}
            <div
              className="
              relative
              z-10
              flex
              flex-wrap
              gap-4
            "
            >
              {group.tools.map((tool, i) => (
                <div
                  key={i}
                  className="
                    tool-chip
                    group
                    relative
                    overflow-hidden
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/4
                    px-5
                    py-4
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-indigo-400/30
                    hover:bg-white/8
                  "
                >
                  {/* HOVER GLOW */}
                  <div
                    className="
                    absolute
                    inset-0
                    opacity-0
                    transition
                    duration-300
                    group-hover:opacity-100
                    bg-linear-to-br
                    from-indigo-500/10
                    to-cyan-500/10
                  "
                  />

                  {/* ICON */}
                  <div
                    className="
                    relative
                    z-10
                    text-2xl
                    text-white
                  "
                  >
                    {tool.icon}
                  </div>

                  {/* TEXT */}
                  <span
                    className="
                    relative
                    z-10
                    text-zinc-200
                    font-medium
                  "
                  >
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStackSection;
