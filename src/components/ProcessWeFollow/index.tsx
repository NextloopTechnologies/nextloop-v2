import { Code2, PenTool, Rocket, Search } from "lucide-react";
import React from "react";

import palette from "../../styles/pallette";

const steps = [
  {
    title: "DISCOVER",
    desc: "We start by finding out about your company, its goals, its users and the problems it faces. We do in-depth research and have strategic conversations to give you a clear plan, whether you need full-scale corporate architecture or focused MVP software development services.",
    icon: Search,
  },
  {
    title: "DESIGN",
    desc: "As a company that specializes in UI/UX design services, we take these ideas and make them into system architecture and user interfaces that are easy to use. Our main goal is still to make wireframing simple, easy to use and interactive, which makes sure it works perfectly.",
    icon: PenTool,
  },
  {
    title: "BUILD",
    desc: "We build safe, high-performance apps using modern tech stacks and agile sprints. We build strong, scalable backend systems that are perfectly in line with your long-term business goals by using the best cloud service providers in India.",
    icon: Code2,
  },
  {
    title: "DELIVER",
    desc: "We deliver your product with perfect accuracy. We promise a safe, perfect launch by combining our full range of software testing and QA services. After deployment, we keep an eye on things and make improvements to make sure growth is long-term.",
    icon: Rocket,
  },
];

const ProcessWeFollow = () => {
  return (
    <section className="w-full bg-white py-24 px-20 flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4">
        <h2
          className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl  font-bold text-center`}
        >
          Our <span className="text-orange-500">Delivery Pipeline</span>
        </h2>
        <h3
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} lg:px-20 text-center`}
        >
          A clear, structured method that makes sure that every stage of the product lifecycle is clear, quick to implement and has demonstrable results. 
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
