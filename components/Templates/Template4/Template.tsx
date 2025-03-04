import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  ProjectsData,
} from "@/app/editor/page";
import { forwardRef } from "react";

const Template=forwardRef(({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  ProjectsData,
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  ProjectsData: ProjectsData[];
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-[90%] min-[500px]:w-[70%] sm:w-[55%] md:w-full lg:w-[90%] mx-auto bg-white text-black shadow-lg py-2 xl:py-4">
      {/* Header */}
      <div className="text-center mb-2 xl:mb-4">
        <h1 className="xl:text-2xl font-bold tracking-wider xl:mb-2">
          {PersonalInformationData?.name || "OLIVIA WILSON"}
        </h1>
        <p className="text-xxs xl:text-sm font-semibold tracking-wide mb-1">
          {PersonalInformationData?.role || "SOFTWARE ENGINEER"}
        </p>
        <p className="text-gray-600 mb-1 text-xxs xl:text-sm">
          {PersonalInformationData?.address || "Address"} | {PersonalInformationData?.email || "Mail"}{" "}
          {/* {PersonalInformationData?.website || "Website"} */}
        </p>
      </div>

      {/* Technical Skills */}
      <section className="mb-2 xl:mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] text-sm xl:text-base lg:pl-10 py-2 px-4 mb-3">
          TECHNICAL SKILLS
        </h2>
        <div className="grid grid-cols-2 gap-2 xl:gap-4 px-4">
          {SkillsData && SkillsData[0].data ? (
            SkillsData.map((item, index) => (
              <ul className="list-outside" key={index}>
                <li className="list-disc ml-4 text-xs xl:text-base">{item.data}</li>
              </ul>
            ))
          ) : (
            <>
              <div>
                <li className="list-disc ml-4 text-xs xl:text-base">SwiftExxa</li>
                <li className="list-disc ml-4 text-xs xl:text-base">A37++</li>
                <li className="list-disc ml-4 text-xs xl:text-base">StoryBloop XA</li>
              </div>
              <div>
                <li className="list-disc ml-4 text-xs xl:text-base">
                  Data Structures and Algorithm
                </li>
                <li className="list-disc ml-4 text-xs xl:text-base">APLXV</li>
                <li className="list-disc ml-4 text-xs xl:text-base">HTMMLL</li>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-2 xl:mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] text-sm xl:text-base lg:pl-10 py-2 px-4 mb-3">
          PROJECTS
        </h2>
        <div className="px-4 lg:px-8">
          {ProjectsData && ProjectsData[0].title ? (
            ProjectsData.map((item) => {
              return (
                <div className="mb-2 xl:mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-xs xl:text-base">{item.title|| "Title"}</h3>
                <span className="text-gray-600 text-xs xl:text-sm">Oct 2021</span>
                  </div>
                  <ul className="list-disc list-inside">
                    <li className="text-gray-600">
                      {item.description || "Description"}
                    </li>
                    <li className="text-gray-800 font-semibold">
                      Tech Stack : {item.technologies || "SwiftExxa, A37++, StoryBloop XA"}
                    </li>
                  </ul>
                </div>
              );
            })
          ) : (
            <div className="mb-2 xl:mb-4">
              <div className="flex w-full justify-between items-start mb-1">
                <h3 className="font-bold text-xs xl:text-base">Instant Chat App | Lukrasto</h3>
                <span className="text-gray-600 text-xs xl:text-sm">Oct 2021</span>
              </div>
              <ul className="list-disc list-inside">
                <li className="text-gray-600 text-xs xl:text-sm">
                  Developed a Standard Messaging App Using StoryBloop XA
                </li>
                <li className="text-gray-600 text-xs xl:text-sm">
                  Improved User Experience During the Usage of the App by
                  Eliminating Bugs
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section className="mb-2 xl:mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] text-sm xl:text-base lg:pl-10 py-2 px-4 mb-3">
          EDUCATION
        </h2>
        <div className="px-4 lg:px-8 space-y-4">
          {EducationData && EducationData[0].degree ? (
            EducationData.map((item, index) => (
              <div key={index} className="">
                <div className="flex   justify-between items-start mb-1">
                  <span className="text-gray-600 text-xxs xl:text-sm">
                    {item.date ? new Date(item.date).toLocaleDateString("fr-FR"): ""}
                  </span>
                </div>
                <p className="font-semibold">University : {item.university}</p>
                <p className="text-gray-600">Location : {item.location}</p>
              </div>
            ))
          ) : (
            <>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-xs xl:text-base">
                    Computer Science AND Business | Dandilton (Online)
                  </h3>
                  <span className="text-gray-600 text-xxs xl:text-sm">May 2021 - Nov 2021</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="text-xs xl:text-sm ">
                    Studied Business Software planning, coordination, and
                    efficiency
                  </li>
                  <li className="text-xs xl:text-sm ">
                    Worked with various industries on launching efficient IT
                    Systems
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-xs xl:text-base">
                    BEng Chemical Engineering | Royal Clickton
                  </h3>
                  <span className="text-gray-600 text-xxs xl:text-sm">Jan 2014 - Sept 2018</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="text-xs xl:text-sm">Minor in Process Management</li>
                  <li className="text-xs xl:text-sm">
                    Thesis in Modelling and Analysis of Process Efficiency in a
                    Cement Plant
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-2 xl:mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] text-sm xl:text-base lg:pl-10 py-2 px-4 mb-3">
          WORK EXPERIENCE
        </h2>
        <div className="px-4 lg:px-8 space-y-4">
          {ExperienceData && ExperienceData[0].company ? (
            ExperienceData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-xs xl:text-base">
                    {item.position} | {item.company}
                  </h3>
                  <span className="text-gray-600 text-xxs xl:text-sm">
                    {item.startdate
                      ? new Date(item.startdate).toLocaleDateString()
                      : ""}{" "}
                    -{" "}
                    {item.enddate
                      ? new Date(item.enddate).toLocaleDateString()
                      : "present"}
                  </span>
                </div>
                <p className="text-gray-600 text-xs xl:text-base">{item.summary}</p>
              </div>
            ))
          ) : (
            <>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-xs xl:text-base">Policy Manager | Lexramax Inc</h3>
                  <span className="text-gray-600 text-xxs xl:text-sm">Jan 2021 - present</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="text-xs xl:text-sm">
                    Formulate and review policies as regards Industry
                    Improvement
                  </li>
                  <li className="text-xs xl:text-sm">
                    Create a functional and technical application of set
                    policies
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-xs xl:text-base">
                    Quality Control Engineer | KrystaPointe Water
                  </h3>
                  <span className="text-gray-600 text-xxs xl:text-sm">Jan 2019 - Dec 2020</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="text-xs xl:text-sm">
                    Collect and Analyse water samples from different stages of
                    Production
                  </li>
                  <li className="text-xs xl:text-sm">
                    Make Recommendations on Improvement based on my analysis
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
})

export default Template;
