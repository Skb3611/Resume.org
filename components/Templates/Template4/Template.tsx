import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  ProjectsData,
} from "@/app/editor/page";
import { forwardRef } from "react";

const Template=forwardRef(({
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  ProjectsData,
}: {
  PersonalData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  ProjectsData: ProjectsData[];
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-[90%] mx-auto bg-white text-black shadow-lg py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-wider mb-2">
          {PersonalData?.name || "OLIVIA WILSON"}
        </h1>
        <p className="text-sm font-semibold tracking-wide mb-1">
          {PersonalData?.role || "SOFTWARE ENGINEER"}
        </p>
        <p className="text-gray-600 mb-1 text-sm">
          {PersonalData?.address || "Address"} | {PersonalData?.email || "Mail"}{" "}
          {/* {PersonalData?.website || "Website"} */}
        </p>
      </div>

      {/* Technical Skills */}
      <section className="mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] pl-10 py-2 px-4 mb-3">
          TECHNICAL SKILLS
        </h2>
        <div className="grid grid-cols-2 gap-4 px-4">
          {SkillsData && SkillsData[0].data ? (
            SkillsData.map((item, index) => (
              <div key={index}>
                <li className="list-disc ml-4">{item.data}</li>
              </div>
            ))
          ) : (
            <>
              <div>
                <li className="list-disc ml-4">SwiftExxa</li>
                <li className="list-disc ml-4">A37++</li>
                <li className="list-disc ml-4">StoryBloop XA</li>
              </div>
              <div>
                <li className="list-disc ml-4">
                  Data Structures and Algorithm
                </li>
                <li className="list-disc ml-4">APLXV</li>
                <li className="list-disc ml-4">HTMMLL</li>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] pl-10 py-2 px-4 mb-3">
          PROJECTS
        </h2>
        <div className="px-8">
          {ProjectsData && ProjectsData[0].title ? (
            ProjectsData.map((item) => {
              return (
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{item.title|| "Title"}</h3>
                  </div>
                  <ul className="list-disc list-inside">
                    <p className="text-gray-600">
                      {item.description || "Description"}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Tech Stack : {item.technologies || "SwiftExxa, A37++, StoryBloop XA"}
                    </p>
                  </ul>
                </div>
              );
            })
          ) : (
            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">Instant Chat App | Lukrasto</h3>
                <span className="text-gray-600">Oct 2021</span>
              </div>
              <ul className="list-disc list-inside">
                <li className="text-gray-600">
                  Developed a Standard Messaging App Using StoryBloop XA
                </li>
                <li className="text-gray-600">
                  Improved User Experience During the Usage of the App by
                  Eliminating Bugs
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section className="mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] pl-10 py-2 px-4 mb-3">
          EDUCATION
        </h2>
        <div className="px-8 space-y-4">
          {EducationData && EducationData[0].degree ? (
            EducationData.map((item, index) => (
              <div key={index} className="">
                <div className="flex  justify-between items-start mb-1">
                  <h3 className="font-bold">Degree: {item.degree} </h3>
                  <span className="text-gray-600">
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
                  <h3 className="font-bold">
                    Computer Science AND Business | Dandilton (Online)
                  </h3>
                  <span className="text-gray-600">May 2021 - Nov 2021</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    Studied Business Software planning, coordination, and
                    efficiency
                  </li>
                  <li>
                    Worked with various industries on launching efficient IT
                    Systems
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">
                    BEng Chemical Engineering | Royal Clickton
                  </h3>
                  <span className="text-gray-600">Jan 2014 - Sept 2018</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Minor in Process Management</li>
                  <li>
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
      <section className="mb-4">
        <h2 className="text-black font-bold bg-[#DBE7E3] pl-10 py-2 px-4 mb-3">
          WORK EXPERIENCE
        </h2>
        <div className="px-8 space-y-4">
          {ExperienceData && ExperienceData[0].company ? (
            ExperienceData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">
                    {item.position} | {item.company}
                  </h3>
                  <span className="text-gray-600">
                    {item.startdate
                      ? new Date(item.startdate).toLocaleDateString()
                      : ""}{" "}
                    -{" "}
                    {item.enddate
                      ? new Date(item.enddate).toLocaleDateString()
                      : "present"}
                  </span>
                </div>
                <p className="text-gray-600">{item.summary}</p>
              </div>
            ))
          ) : (
            <>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">Policy Manager | Lexramax Inc</h3>
                  <span className="text-gray-600">Jan 2021 - present</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    Formulate and review policies as regards Industry
                    Improvement
                  </li>
                  <li>
                    Create a functional and technical application of set
                    policies
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">
                    Quality Control Engineer | KrystaPointe Water
                  </h3>
                  <span className="text-gray-600">Jan 2019 - Dec 2020</span>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    Collect and Analyse water samples from different stages of
                    Production
                  </li>
                  <li>
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
