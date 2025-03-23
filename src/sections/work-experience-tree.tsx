"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { companyData, opensourceData, freelanceData } from "../constants";

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

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 items-start">
            {companyData.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  activeSection === "company" ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 border border-black-300 rounded-lg shadow-md bg-black-200 h-auto"
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

                {/* Project capsules row */}
                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {company.projects.map((project, pidx) => (
                    <div
                      key={`capsule-${pidx}`}
                      className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-1 shadow-sm text-blue-700 dark:text-blue-300 text-sm font-medium"
                    >
                      {project.shortTitle || project.title}
                    </div>
                  ))}
                </div> */}

                <div className="space-y-4">
                  {company.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-md border-blue-200 dark:border-blue-800 bg-blue-100/70 dark:bg-blue-800/30"
                    >
                      {/* <h5 className="font-bold text-blue-700 dark:text-blue-300">
                        {project.title}
                      </h5> */}
                      <div className="flex items-center mb-3 bg-blue-100 dark:bg-blue-900/40 rounded-full px-4 py-1 shadow-sm max-w-fit">
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {project.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>
                      {/* <div className="mt-2">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Tech:{" "}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {project.technologies}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Highlights:{" "}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {project.highlights}
                        </span>
                      </div> */}
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
                    className="flex items-center bg-black rounded-full pl-1 pr-4 py-1 shadow-sm hover:shadow-md transition-shadow ml-1 border border-white-700"
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
                    {/* <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      Client: {project.client}
                    </h5> */}
                    <div className="flex items-center mb-3 bg-amber-100 dark:bg-amber-900/40 rounded-full px-4 py-1 shadow-sm max-w-fit">
                      <span className="font-medium text-amber-700 dark:text-amber-300">
                        {project.client}
                      </span>
                    </div>
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
