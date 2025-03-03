import type { PersonalData, EducationData, SkillsData, ExperienceData } from "@/app/editor/page"
import { forwardRef } from "react"

const Template=forwardRef(({
  PersonalInformationData ,
  EducationData ,
  SkillsData ,
  ExperienceData ,
}: {
  PersonalInformationData: PersonalData
  EducationData: EducationData[]
  SkillsData: SkillsData[]
  ExperienceData: ExperienceData[]
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-full min-[425px]:w-[80%] min-[500px]:w-[65%] sm:w-[55%] md:w-full mx-auto bg-white shadow-lg p-4 xl:p-8">
      {/* Header */}
      <header className=" mb-4 xl:mb-6">
        <h1 className="text-lg xl:text-4xl font-bold text-blue-800 xl:mb-2">{PersonalInformationData?.name || "OLIVIA WILSON"}</h1>
        <p className="text-xxs xl:text-sm text-gray-600">
          {PersonalInformationData?.email || "hello@reallygreatsite.com"} | {PersonalInformationData?.phone || "123-456-7890"} | {PersonalInformationData?.address || "123 Anywhere St., Any City"}
        </p>
        {/* <p className="text-xxs xl:text-sm text-gray-600">{PersonalInformationData?.website || "www.reallygreatsite.com"}</p> */}
      </header>

      <div className="w-full h-0.5 bg-blue-800 mb-6"></div>

      {/* Summary */}
      <section className="mb-6 flex w-full gap-2 xl:gap-5">
        <h2 className="text-xs xl:text-xl font-semibold text-blue-800 mb-2 w-1/3">SUMMARY</h2>
        <p className="text-xxs xl:text-sm w-2/3 text-gray-700">
          {PersonalInformationData?.aboutme || "Detail-oriented administrative professional with over three years of experience providing comprehensive support to executive teams and office operations. Proven track record of managing administrative tasks efficiently and maintaining strict confidentiality. Strong organizational skills coupled with excellent communication abilities to coordinate office activities and facilitate smooth workflow."}
        </p>
      </section>
      <div className="w-full h-px bg-blue-600 mb-6"></div>

      {/* Work Experience */}
      <section className="mb-6 text-gray-800 flex w-full gap-2 xl:gap-5">
        <h2 className="text-xs xl:text-xl w-1/3 font-semibold text-blue-800 mb-2">WORK EXPERIENCE</h2>
        <div className="w-2/3">

        {ExperienceData && ExperienceData[0].company  ? (
          ExperienceData.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xxs xl:text-base font-semibold w-2/3">{job.position}</h3>
                <span className="text-[6px] xl:text-sm text-gray-600 w-1/3">
                  {job.startdate && new Date(job.startdate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                  {job.enddate ? new Date(job.enddate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
                </span>
              </div>
              <p className="text-xxs xl:text-sm font-medium">{job.company}</p>
              <ul className="list-disc list-inside text-xxs xl:text-sm text-gray-700 mt-2">
                {job.summary.split('\n').map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <div className="mb-4 text-black">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xxs xl:text-base font-semibold w-2/3">Administrative Assistant, Arowwai Industries</h3>
                <span className="text-[6px] xl:text-sm text-gray-600">Oct 2023 - Present</span>
              </div>
              <ul className="list-disc list-inside text-xxs xl:text-sm text-gray-700 mt-2">
                <li>Managed executive calendars, schedule meetings, and coordinate travel arrangements.</li>
                <li>Maintained office supplies inventory and order supplies as needed, optimizing cost efficiency.</li>
                <li>Assisted in organizing company events, ensuring seamless execution.</li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xxs xl:text-base font-semibold">Office Coordinator, Borcelle</h3>
                <span className="text-[6px] xl:text-sm text-gray-600">Jan 2022 - Sept 2023</span>
              </div>
              <ul className="list-disc list-inside text-xxs xl:text-sm text-gray-700 mt-2">
                <li>Provided administrative support to a team of 20+ employees, including calendar management, expense reporting, and meeting coordination.</li>
                <li>Acted as a liaison between departments, fostering effective communication and collaboration.</li>
                <li>Assisted in onboarding new employees, facilitating orientation sessions and ensuring compliance with company policies.</li>
              </ul>
            </div>
    
          </>
        )}
        </div>
      </section>
      <div className="w-full h-px bg-blue-600 mb-6"></div>

      {/* Education */}
      <section className="mb-6 text-gray-800 flex gap-2 xl:gap-5 w-full">
        <h2 className="text-xs xl:text-xl w-1/3 font-semibold text-blue-800 mb-2">EDUCATION</h2>
        <div className="w-2/3 flex gap-2 ">
        {EducationData && EducationData[0].degree ? (
            EducationData.map((edu, index) => (
                <div key={index} className="mb-2 w-1/2">
              <h3 className="text-xxs xl:text-base font-semibold"> {edu.degree}</h3>
              <p className="text-xxs xl:text-sm">University: {edu.university}</p>
              <p className="text-xxs xl:text-sm text-gray-600">
                {edu.date && new Date(edu.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              {edu.location && <p className="text-xxs xl:text-sm text-gray-600">Location: {edu.location}</p>}
            </div>
          ))
        ) : (
            <>
            <div className="mb-2">
              <h3 className="text-xxs xl:text-base font-semibold">Bachelor of Business Administration</h3>
              <p className="text-xxs xl:text-sm">University of Business Excellence</p>
              <p className="text-xxs xl:text-sm text-gray-600">Jan 2019 - Feb 2021</p>
              <p className="text-xxs xl:text-sm text-gray-600">Location : Lonavala</p>
            </div>
          </>
        )}
        </div>
      </section>

      {/* Key Skills */}
      <section className="mb-6 text-gray-800 flex w-full gap-2 xl:gap-5">
        <h2 className="text-xs xl:text-xl font-semibold text-blue-800 mb-2 w-1/3">KEY SKILLS</h2>
        <ul className="grid grid-cols-2 gap-2 xl:gap-4 w-2/3 list-disc">
          {SkillsData&& SkillsData[0].data ? (
            SkillsData.map((skill, index) => (
              <li key={index} className="text-xxs xl:text-sm text-gray-700">{skill.data}</li>
            ))
          ) : (
            <>
              <li className="text-xxs xl:text-sm text-gray-700">Office Suite software</li>
              <li className="text-xxs xl:text-sm text-gray-700">Problem solving</li>
              <li className="text-xxs xl:text-sm text-gray-700">Data entry</li>
              <li className="text-xxs xl:text-sm text-gray-700">Customer service</li>
              <li className="text-xxs xl:text-sm text-gray-700">Organizational and time management skills</li>
              <li className="text-xxs xl:text-sm text-gray-700">Attention to details</li>
              <li className="text-xxs xl:text-sm text-gray-700">Corporate communications</li>
              <li className="text-xxs xl:text-sm text-gray-700">Fluent in English and Mandarin</li>
            </>
          )}
        </ul>
      </section>
    </div>
  )
})
export default Template