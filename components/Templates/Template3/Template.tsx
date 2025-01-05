import { Phone, Mail, MapPin } from "lucide-react"
import type { PersonalData, EducationData, SkillsData, ExperienceData,LanguagesData,ReferencesData } from "@/app/editor/page"
import { forwardRef } from "react"

const Template=forwardRef(({
  PersonalInformationData ,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
  ReferencesData
}: {
  PersonalInformationData: PersonalData,
  EducationData: EducationData[],
  SkillsData: SkillsData[],
  ExperienceData: ExperienceData[],
  LanguagesData: LanguagesData[],
  ReferencesData: ReferencesData
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-[85%] mx-auto bg-white text-black shadow-lg">
      {/* Header */}
      <div className="bg-zinc-800 text-white  p-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {PersonalInformationData?.name || "MORGAN MAXWELL"}
          </h1>
          <p className="text-lg tracking-wide">
            {PersonalInformationData?.role || "MARKETING MANAGER"}
          </p>
        </div>
        <div className="space-y-2 text-right text-sm">
          <div className="flex items-center justify-end gap-2">
            <span >{PersonalInformationData?.phone || "+123-456-7890"}</span>
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>{PersonalInformationData?.email || "hello@reallygreatsite.com"}</span>
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>{PersonalInformationData?.address || "123 Anywhere St., Any City"}</span>
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-8 py-4 space-y-3">
        {/* About Me */}
        <section className="flex w-full justify-between">
          <h2 className="text-xl font-bold mb-2 w-1/3">About Me</h2>
          <p className="text-zinc-600 text-sm w-2/3">
            {PersonalInformationData?.aboutme ||
              "Lorem ipsum dolor sit amet, bonorum pertinax patrioque et pri, ea pri audire molestie ponderum, ei eripit habemus delicatissimi eum. Ius te feugait theophrastus, nec quaestio intellegat at. Pro inermis quaestio splendide id, meliore ancillae sea et. Et mea tale consul, an aeque alienum delicatissimi nec."}
          </p>
        </section>
        <div className="h-px bg-zinc-700 mb-2" />

        {/* Experience */}
        <section className="flex w-full justify-between">
          <h2 className="text-xl font-bold mb-2 w-1/3">Experience</h2>
          <div className="h-px bg-zinc-300 mb-4" />
          <div className="space-y-4 w-2/3">
            {ExperienceData &&ExperienceData[0].company
              ? ExperienceData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold">{item.company || "Company Name"}</h3>
                      <p className="text-zinc-600">
                        {item.startdate
                          ? new Date(item.startdate).getFullYear()
                          : "2017"}{" "}
                        - {item.enddate ? new Date(item.enddate).getFullYear() : "2020"}
                      </p>
                    </div>
                    <p className="text-zinc-600 italic mb-1">{item.position || "Job Position"}</p>
                    <p className="text-zinc-600 text-sm">{item.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"}</p>
                  </div>
                ))
              : Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold">Company Name {2017 + index} - {2020 + index}</h3>
                        <p className="text-zinc-600">{2017 + index} - {2020 + index}</p>
                      </div>
                      <p className="text-zinc-600 italic mb-1">Job Position</p>
                      <p className="text-zinc-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris
                      </p>
                    </div>
                  ))}
          </div>
        </section>
        <div className="h-px bg-zinc-700 mb-2" />


        {/* Education */}
        <section className="flex w-full justify-between">
          <h2 className="text-xl font-bold mb-2 w-1/3">Education</h2>
          <div className="h-px bg-zinc-300 mb-4" />
          <div className="flex flex-wrap w-2/3 gap-5">
            {EducationData && EducationData[0].degree
              ? EducationData.map((item, index) => (
                  <div key={index} className="w-[45%]">
                    <p className="text-sm">Year of Completion: 
                      {item.date ? new Date(item.date).getFullYear() : "2015"}
                    </p>
                    <p className="text-sm font-semibold">University: {item.university || "University Name"}</p>
                    <p className="text-sm font-semibold">{item.degree || "Your Degree"}</p>
                    <p className="text-sm text-zinc-600 ">{item.location || "Location"}</p>
                  </div>
                ))
              : Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <p className="font-bold">2015</p>
                      <p className="font-bold">University Name</p>
                      <p className="font-bold">Your Degree</p>
                      <p className="text-zinc-600 text-sm">Location</p>
                    </div>
                  ))}
          </div>
        </section>
        <div className="h-px bg-zinc-700 mb-2" />

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Language */}
          <section>
            <h2 className="text-xl font-bold mb-2">Language</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            <div className="space-y-2">
              {LanguagesData && LanguagesData[0].data ?
              LanguagesData.map((lang, index) => (
                <div key={index}>
                  <p className="font-semibold">{lang.data || "Language"}</p>
                </div>
              )):
              ["Spanish", "English", "Japanese", "Korean"].map((lang, index) => (
                <div key={index}>
                  <p className="font-semibold">{lang}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expertise */}
          <section>
            <h2 className="text-xl font-bold mb-2">Expertise</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            <ul className="list-disc list-inside space-y-1">
              {SkillsData && SkillsData[0].data
                ? SkillsData.map((item, index) => (
                    <li key={index} className="text-zinc-600">
                      {item.data || `Skill ${index + 1}`}
                    </li>
                  ))
                : ["UI/UX", "visual design", "leadership", "coaching"].map(
                    (skill, index) => (
                      <li key={index} className="text-zinc-600">
                        {skill}
                      </li>
                    )
                  )}
            </ul>
          </section>

          {/* Reference */}
          <section>
            <h2 className="text-xl font-bold mb-2">Reference</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            {
              ReferencesData && ReferencesData.name?
                <div>
                  <p className="font-bold">{ReferencesData.name || "Lorna Alvarado"}</p>
                  <p className="text-zinc-600">{ReferencesData.company || "Company Name"}</p>
                  <p className="text-zinc-600">{ReferencesData.position || "Position"}</p>
                  <p className="font-bold">Phone</p>
                  <p className="text-zinc-600">{ReferencesData.phone || "No contact info"}</p>
                </div>
              :
              <div>
              <p className="font-bold">Lorna Alvarado</p>
              <p className="text-zinc-600 mb-2">Company Name/Position</p>
              <p className="font-bold">Phone</p>
              <p className="text-zinc-600">+123-456-7890</p>
            </div>
            }
           
          </section>
        </div>
      </div>
    </div>
  )
})
export default Template