import type { PersonalData, EducationData, SkillsData, ExperienceData } from "@/app/editor/page"

export default function Template({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
}:  {
  PersonalInformationData: PersonalData
  EducationData: EducationData[]
  SkillsData: SkillsData[]
  ExperienceData: ExperienceData[]
}) {
  return (
    <div className="w-[90%] mx-auto bg-white shadow-lg p-8 text-black">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-1">{PersonalInformationData?.name || "ESTELLE DARCY"}</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">{PersonalInformationData?.role || "UX DESIGNER"}</h2>
        <p className="text-sm text-gray-600">
          {PersonalInformationData?.address || "123 Anywhere St., Any City"} | {PersonalInformationData?.email || "hello@reallygreatsite.com"}  
        </p>
      </header>


      {/* Summary */}
      <section className="mb-6">
      <div className="w-full h-px bg-blue-400"></div>
        <h2 className="text-lg font-semibold text-blue-600 my-1 mx-3">SUMMARY</h2>
      <div className="w-full h-px bg-blue-400 mb-4"></div>

        <p className="text-sm text-gray-700">
          {PersonalInformationData?.aboutme || "UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction."}
        </p>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
      <div className="w-full h-px bg-blue-400"></div>

        <h2 className="text-lg font-semibold text-blue-600 mx-3 my-1">TECHNICAL SKILLS</h2>
      <div className="w-full h-px bg-blue-400 mb-4"></div>

        <div className="grid grid-cols-3 gap-2 w-full">
          {SkillsData && SkillsData[0].data ? (
            SkillsData.map((skill, index) => (
              <p key={index} className="text-sm text-gray-700">{skill.data}</p>
            ))
          ) : (
            <>
              <div>
                <p className="text-sm">Prototyping Tools</p>
                <p className="text-sm">User Research</p>
                <p className="text-sm">Information Architecture</p>
              </div>
              <div>
                <p className="text-sm">Interaction Design</p>
                <p className="text-sm">Visual Design</p>
                <p className="text-sm">Usability Heuristics</p>
              </div>
              <div>
                <p className="text-sm">Accessibility</p>
                <p className="text-sm">Responsive Design</p>
                <p className="text-sm">User Testing Tools</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
      <div className="w-full h-px bg-blue-400"></div>
        <h2 className="text-lg font-semibold text-blue-600 mx-3 my-1">PROFESSIONAL EXPERIENCE</h2>
        <div className="w-full h-px bg-blue-400 mb-4"></div>
        {ExperienceData && ExperienceData[0].company? (
          ExperienceData.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{job.position}, {job.company}</h3>
                <span className="text-sm text-gray-600">
                  {job.startdate && new Date(job.startdate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                  {job.enddate ? new Date(job.enddate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
                </span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                {job.summary.split('\n').map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Instant Chartz App, Morcelle Program</h3>
                <span className="text-sm text-gray-600">Jan 2023 - Present</span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                <li>Led development of an advanced automation system, achieving a 15% increase in operational efficiency.</li>
                <li>Streamlined manufacturing processes, reducing production costs by 10%.</li>
                <li>Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.</li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">System UX Engineer, XarrowAI Industries</h3>
                <span className="text-sm text-gray-600">Feb 2021 - Dec 2022</span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                <li>Designed and optimised a robotic control system, realizing a 12% performance improvement.</li>
                <li>Coordinated testing and validation, ensuring compliance with industry standards.</li>
                <li>Provided technical expertise, contributing to a 15% reduction in system failures.</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section className="mb-6">
      <div className="w-full h-px bg-blue-400"></div>
        <h2 className="text-lg font-semibold text-blue-600 mx-3 my-1">EDUCATION</h2>
        <div className="w-full h-px bg-blue-400 mb-4"></div>
        
        <div className="flex flex-wrap">{EducationData && EducationData[0].degree  ? (
          EducationData.map((edu, index) => (
            <div key={index} className="mb-2 w-1/2">
              <h3 className="font-semibold">Degree: {edu.degree}</h3>
              <p className="text-sm">University: {edu.university}</p>
              <p className="text-sm text-gray-600"> Year of Completion: 
                {edu.date && new Date(edu.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              {edu.location && <p className="text-sm text-gray-600">Location: {edu.location}</p>}
            </div>
          ))
        ) : (
          <>
            <div className="mb-2">
              <h3 className="font-semibold">UX Industrial Basics and General Application</h3>
              <p className="text-sm">University of Engineering UX Cohort</p>
              <p className="text-sm text-gray-600">Aug 2016 - Oct 2019</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                <li>Major in Automotive Technology.</li>
                <li>Thesis on "Technological Advancements within the current Mechatronics Industry".</li>
              </ul>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">Bachelor of Design in Process Engineering</h3>
              <p className="text-sm">Engineering University</p>
              <p className="text-sm text-gray-600">May 2014 - May 2016</p>
              <p className="text-sm">Relevant coursework in Structural Design and Project Management.</p>
            </div>
          </>
        )}
        </div>
      </section>

      
    </div>
  )
}