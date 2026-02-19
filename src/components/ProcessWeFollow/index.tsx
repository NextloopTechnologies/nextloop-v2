import { Code2, PenTool, Rocket, Search } from "lucide-react";
import React from "react";

import palette from "../../styles/pallette";

const steps = [
  {
    title: "DISCOVER",
    desc: "We start by understanding your business, goals, users, and challenges. Through research and discussions, we identify the right opportunities and define a clear problem statement.",
    icon: Search,
  },
  {
    title: "DESIGN",
    desc: "We translate insights into intuitive system architecture and user-centric designs. Our focus is on simplicity, usability, and scalability, built to perform in real-world scenarios.",
    icon: PenTool,
  },
  {
    title: "BUILD",
    desc: "Using modern technologies and AI where it adds value, we develop secure, high-performance solutions that are robust, scalable, and aligned with your business objectives.",
    icon: Code2,
  },
  {
    title: "DELIVER",
    desc: "We test, refine, and deploy with precision. Post-launch, we continuously optimize and improve to ensure long-term performance and growth.",
    icon: Rocket,
  },
];

const ProcessWeFollow = () => {
  return (
    <section className="w-full bg-white py-24 px-20 flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4">
        <h2
          className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl uppercase font-bold text-center`}
        >
          Process <span className="text-orange-500">We Follow</span>
        </h2>
        <h3
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} lg:px-20 text-center`}
        >
          A structured, agile approach that ensures clarity, efficiency, and
          measurable outcomes at every stage of your project.
        </h3>
      </div>

      {/* ================= ICONS SECTION ================= */}
      <div className="relative mt-20 max-w-7xl mx-auto">
        {/* Timeline */}
        <div className="hidden md:block absolute top-[160px] left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300" />

        {/* Arrow */}
        <div className="hidden md:block absolute top-[152px] right-0">
          <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px]
            border-t-transparent border-b-transparent border-l-yellow-300" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon; // ✅ FIX

            return (
              <div key={i} className="flex flex-col items-center text-center ">
                {/* Icon */}
                <div className="relative flex items-center justify-center w-28 h-28">
                  {/* Outer rotating border */}
                  <div className="absolute inset-0 animate-spin [animation-duration:8s]">
                    <div className="w-full h-full rotate-12 border-2 border-orange-500 rounded-xl" />
                  </div>

                  {/* Inner rotating border */}
                  <div className="absolute inset-1 animate-spin [animation-duration:12s]">
                    <div className="w-full h-full rotate-12 border-2 border-yellow-400 rounded-xl" />
                  </div>

                  {/* Static icon */}
                  <Icon
                    className="z-10 text-orange-500"
                    size={44}
                    strokeWidth={1.8}
                  />
                </div>



                <h3 className="mt-20 text-sm font-semibold tracking-widest text-black">
                  {step.title}
                </h3>

                <p className="mt-4 text-md text-gray-600 leading-7 max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessWeFollow;
