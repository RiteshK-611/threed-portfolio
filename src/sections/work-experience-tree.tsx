"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// import { Briefcase, Code, GitBranch } from "lucide-react"

export default function WorkExperienceTree() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = {
    company: useRef<HTMLDivElement>(null),
    opensource: useRef<HTMLDivElement>(null),
    freelance: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(key);
            }
          });
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const companyData = [
    {
      name: "Tech Innovations Inc.",
      period: "2020 - Present",
      role: "Senior Frontend Developer",
      projects: [
        {
          title: "Customer Dashboard Redesign",
          description:
            "Led the redesign of the customer-facing dashboard, improving user engagement by 40%.",
          technologies: "React, TypeScript, Tailwind CSS",
          contributions:
            "Architecture design, component system development, performance optimization",
        },
        {
          title: "Mobile App Integration",
          description:
            "Integrated web services with the company's mobile application.",
          technologies: "React Native, GraphQL, Node.js",
          contributions:
            "API design, state management implementation, cross-platform testing",
        },
      ],
    },
    {
      name: "Digital Solutions Ltd.",
      period: "2017 - 2020",
      role: "Frontend Developer",
      projects: [
        {
          title: "E-commerce Platform",
          description:
            "Built a scalable e-commerce platform serving over 10,000 daily users.",
          technologies: "Vue.js, Vuex, SCSS",
          contributions:
            "Shopping cart implementation, checkout flow, payment gateway integration",
        },
      ],
    },
  ];

  const opensourceData = {
    statement:
      "Active contributor to open-source projects with a focus on frontend tooling and accessibility libraries.",
    contributions: [
      {
        githubUser: "reactdev",
        repo: "react-accessible-ui",
        repoUrl: "https://github.com/reactdev/react-accessible-ui",
      },
      {
        githubUser: "cssmaster",
        repo: "animate-lite",
        repoUrl: "https://github.com/cssmaster/animate-lite",
      },
      {
        githubUser: "webtools",
        repo: "dev-toolkit",
        repoUrl: "https://github.com/webtools/dev-toolkit",
      }
    ],
    // Your personal GitHub info
    personalGithub: {
      githubUser: "riteshk-611", // Replace with your actual GitHub username
      repoUrl: "https://github.com/riteshk-611",
    },
  };

  const freelanceData = {
    statement:
      "Specialized in creating custom web solutions for small to medium businesses across various industries.",
    projects: [
      {
        client: "Local Restaurant Chain",
        work: "Developed an online ordering system with real-time kitchen notifications.",
        skills: "Next.js, Tailwind CSS, Firebase",
      },
      {
        client: "Independent Photographer",
        work: "Created a portfolio website with custom image galleries and booking system.",
        skills: "React, Framer Motion, Stripe",
      },
    ],
  };
// className = "relative w-full py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800";
  return (
    <section className="c-space my-20" id="workexperience">
      <div className="container relative px-4 mx-auto">
        <h2 className="mb-16 text-4xl font-bold text-center text-slate-800 dark:text-slate-100">
          Work Experience
        </h2>

        {/* Tree Trunk */}
        <div className="absolute left-1/2 top-32 bottom-0 w-2 bg-gradient-to-b from-red-500 to-red-700 transform -translate-x-1/2 z-0"></div>

        {/* Company Work Section */}
        <motion.div
          ref={sectionRefs.company}
          initial={{ opacity: 0, x: -50 }}
          animate={activeSection === "company" ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-24"
        >
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mb-4 md:mb-0 md:mr-4 rounded-full bg-blue-500 shadow-lg">
              <img
                src="https://api.iconify.design/lucide:briefcase.svg"
                alt="briefcase"
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-2xl font-bold bg-black text-center md:text-left text-slate-800 dark:text-slate-100">
              Company Work
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {companyData.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  activeSection === "company" ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 border border-black-300 rounded-lg shadow-md bg-black-200"
              >
                <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">
                    {company.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {company.period}
                  </p>
                  <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
                    {company.role}
                  </p>
                </div>

                <div className="space-y-4">
                  {company.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-md border-blue-200 dark:border-blue-800 bg-blue-100/70 dark:bg-blue-800/30"
                    >
                      <h5 className="font-bold text-blue-700 dark:text-blue-300">
                        {project.title}
                      </h5>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Technologies:{" "}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {project.technologies}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Contributions:{" "}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {project.contributions}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Branch to Company - Hidden on mobile, visible on md and up */}
          <div className="absolute left-1/2 top-8 w-16 h-2 bg-blue-500 transform -translate-x-full hidden md:block"></div>
        </motion.div>

        {/* Open Source Section */}
        <motion.div
          ref={sectionRefs.opensource}
          initial={{ opacity: 0, x: 50 }}
          animate={activeSection === "opensource" ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-24 md:ml-auto"
        >
          <div className="flex flex-col md:flex-row items-center mb-8 md:justify-end">
            <div className="order-first md:order-last flex items-center justify-center w-16 h-16 mb-4 md:mb-0 md:ml-4 rounded-full bg-emerald-500 shadow-lg">
              <img
                src="https://api.iconify.design/lucide:git-branch.svg"
                alt="git-branch"
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-2xl font-bold bg-black text-center md:text-right text-slate-800 dark:text-slate-100">
              Open-Source Contributions
            </h3>
          </div>

          <div className="max-w-2xl mx-auto md:ml-auto md:mr-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                activeSection === "opensource" ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5 }}
              className="p-6 border border-black-300 rounded-lg shadow-md bg-black-200"
            >
              <p className="mb-6 italic text-slate-700 dark:text-slate-300">
                {opensourceData.statement}
              </p>

              {/* Display capsules side by side */}
              <div className="flex flex-wrap gap-3 mb-6">
                {opensourceData.contributions.map((contribution, idx) => (
                  <motion.a
                    key={idx}
                    href={contribution.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      activeSection === "opensource" ? { opacity: 1, y: 0 } : {}
                    }
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center bg-emerald-100 dark:bg-emerald-900/40 rounded-full pl-1 pr-4 py-1 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-emerald-500">
                      <img
                        src={`https://github.com/${contribution.githubUser}.png`}
                        alt={`${contribution.githubUser}'s profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://api.iconify.design/lucide:github.svg";
                        }}
                      />
                    </div>
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">
                      {contribution.repo}
                    </span>
                  </motion.a>
                ))}

                {/* Your personal GitHub capsule with arrow pointing to it */}
                <div className="flex items-center">
                  <motion.a
                    href={opensourceData.personalGithub.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      activeSection === "opensource" ? { opacity: 1, y: 0 } : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: opensourceData.contributions.length * 0.1,
                    }}
                    className="flex items-center bg-black rounded-full pl-1 pr-4 py-1 shadow-sm hover:shadow-md transition-shadow ml-1 border-2 border-white"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-white">
                      <img
                        src={`https://github.com/${opensourceData.personalGithub.githubUser}.png`}
                        alt="My GitHub profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://api.iconify.design/lucide:github.svg";
                        }}
                      />
                    </div>
                    <span className="font-medium text-white pr-2">
                      {opensourceData.personalGithub.githubUser}
                    </span>
                    <img src="assets/right-arrow.png" width={15} height={15} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Branch to Open Source - Hidden on mobile, visible on md and up */}
          <div className="absolute left-1/2 top-8 w-16 h-2 bg-emerald-500 transform hidden md:block"></div>
        </motion.div>

        {/* Freelance Section */}
        <motion.div
          ref={sectionRefs.freelance}
          initial={{ opacity: 0, x: -50 }}
          animate={activeSection === "freelance" ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mb-4 md:mb-0 md:mr-4 rounded-full bg-amber-500 shadow-lg">
              <img
                src="https://api.iconify.design/lucide:code.svg"
                alt="code"
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-2xl font-bold bg-black text-center md:text-left text-slate-800 dark:text-slate-100">
              Freelancing Work
            </h3>
          </div>

          <div className="max-w-2xl mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                activeSection === "freelance" ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5 }}
              className="p-6 border border-black-300 rounded-lg shadow-md bg-black-200"
            >
              <p className="mb-6 italic text-slate-700 dark:text-slate-300">
                {freelanceData.statement}
              </p>

              <div className="space-y-4">
                {freelanceData.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      activeSection === "freelance" ? { opacity: 1, y: 0 } : {}
                    }
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    className="p-4 bg-amber-50 rounded-md dark:bg-amber-900/20"
                  >
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      Client: {project.client}
                    </h5>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {project.work}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Skills: {project.skills}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Branch to Freelance - Hidden on mobile, visible on md and up */}
          <div className="absolute left-1/2 top-8 w-16 h-2 bg-amber-500 transform -translate-x-full hidden md:block"></div>
        </motion.div>
      </div>
    </section>
  );
}
