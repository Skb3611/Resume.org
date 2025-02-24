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
    <div ref={ref} className="w-[95%] min-[500px]:w-[70%] sm:w-[55%] md:w-full xl:w-[85%] mx-auto bg-white text-black shadow-lg">
      {/* Header */}
      <div className="bg-zinc-800 text-white p-4 2xl:p-8 flex justify-between items-start">
        <div>
          <h1 className="text-lg xl:text-3xl font-bold mb-1">
            {PersonalInformationData?.name || "MORGAN MAXWELL"}
          </h1>
          <p className="text-xs xl:text-base tracking-wide">
            {PersonalInformationData?.role || "MARKETING MANAGER"}
          </p>
        </div>
        <div className="space-y-2 text-right text-sm">
          <div className="text-xxs xl:text-sm flex items-center justify-end gap-2">
            <span >{PersonalInformationData?.phone || "+123-456-7890"}</span>
            <Phone className="w-3 h-3 2xl:w-5 2xl:h-5" />
          </div>
          <div className="text-xxs xl:text-sm flex items-center justify-end gap-2">
            <span>{PersonalInformationData?.email || "hello@reallygreatsite.com"}</span>
            <Mail className="w-3 h-3 2xl:w-5 2xl:h-5" />
          </div>
          <div className="text-xxs xl:text-sm flex items-center justify-end gap-2">
            <span>{PersonalInformationData?.address || "123 Anywhere St., Any City"}</span>
            <MapPin className="w-3 h-3 2xl:w-5 2xl:h-5" />
          </div>
        </div>
      </div>

      <div className=" p-4 2xl:p-8 py-4 space-y-3">
        {/* About Me */}
        <section className="flex w-full justify-between">
          <h2 className="text-sm xl:text-lg font-bold mb-2 w-1/3">About Me</h2>
          <p className="text-zinc-600 text-xxs xl:text-xs w-2/3">
            {PersonalInformationData?.aboutme ||
              "Lorem ipsum dolor sit amet, bonorum pertinax patrioque et pri, ea pri audire molestie ponderum, ei eripit habemus delicatissimi eum. Ius te feugait theophrastus, nec quaestio intellegat at. Pro inermis quaestio splendide id, meliore ancillae sea et. Et mea tale consul, an aeque alienum delicatissimi nec."}
          </p>
        </section>
        <div className="h-px bg-zinc-700 mb-2" />

        {/* Experience */}
        <section className="flex w-full justify-between">
          <h2 className="text-sm xl:text-lg font-bold mb-2 w-1/3">Experience</h2>
          <div className="h-px bg-zinc-300 mb-4" />
          <div className="space-y-4 w-2/3">
            {ExperienceData &&ExperienceData[0].company
              ? ExperienceData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs xl:text-base font-bold">{item.company || "Company Name"}</h3>
                      <p className="text-zinc-600 text-xxs xl:text-sm">
                        {item.startdate
                          ? new Date(item.startdate).getFullYear()
                          : "2017"}{" "}
                        - {item.enddate ? new Date(item.enddate).getFullYear() : "2020"}
                      </p>
                    </div>
                    <p className="text-zinc-600 italic mb-1 text-xs xl:text-sm">{item.position || "Job Position"}</p>
                    <p className="text-zinc-600 text-xxs xl:text-xs">{item.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"}</p>
                  </div>
                ))
              : Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs xl:text-base font-bold">Company Name </h3>
                        <p className="text-zinc-600 text-xxs xl:text-sm">{2017 + index} - {2020 + index}</p>
                      </div>
                      <p className="text-zinc-600 italic mb-1 text-xs xl:text-sm">Job Position</p>
                      <p className="text-zinc-600 text-xxs xl:text-xs">
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
          <h2 className="text-sm xl:text-lg font-bold mb-2 w-1/3">Education</h2>
          <div className="h-px bg-zinc-300 mb-4" />
          <div className="flex flex-col min-[425px]:flex-row  w-2/3 gap-5">
            {EducationData && EducationData[0].degree
              ? EducationData.map((item, index) => (
                  <div key={index} className="2xl:w-[45%]">
                    <p className="text-xs xl:text-sm">Year of Completion: 
                      {item.date ? new Date(item.date).getFullYear() : "2015"}
                    </p>
                    <p className="text-xs xl:text-sm font-semibold">University: {item.university || "University Name"}</p>
                    <p className="text-xs xl:text-sm font-semibold">Degree: {item.degree || "Your Degree"}</p>
                    <p className="text-xs xl:text-xs text-zinc-600 ">{item.location || "Location"}</p>
                  </div>
                ))
              : Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <p className="font-bold text-xs xl:text-sm">2015</p>
                      <p className="font-bold text-xs xl:text-sm">University Name</p>
                      <p className="font-bold text-xs xl:text-sm">Your Degree</p>
                      <p className="text-zinc-600 text-xxs xl:text-xs">Location</p>
                    </div>
                  ))}
          </div>
        </section>
        <div className="h-px bg-zinc-700 mb-2" />

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-2 2xl:gap-8">
          {/* Language */}
          <section>
            <h2 className="text-sm xl:text-lg font-bold mb-2">Language</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            <div className="space-y-2">
              {LanguagesData && LanguagesData[0].data ?
              LanguagesData.map((lang, index) => (
                <div key={index}>
                  <p className="font-semibold text-xs xl:text-sm">{lang.data || "Language"}</p>
                </div>
              )):
              ["Spanish", "English", "Japanese", "Korean"].map((lang, index) => (
                <div key={index}>
                  <p className="font-semibold text-xs xl:text-sm">{lang}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expertise */}
          <section>
            <h2 className="text-sm xl:text-lg font-bold mb-2">Expertise</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            <ul className="list-disc list-outside space-y-1">
              {SkillsData && SkillsData[0].data
                ? SkillsData.map((item, index) => (
                    <li key={index} className="text-zinc-600 text-xs xl:text-sm">
                      {item.data || `Skill ${index + 1}`}
                    </li>
                  ))
                : ["UI/UX", "visual design", "leadership", "coaching"].map(
                    (skill, index) => (
                      <li key={index} className="text-zinc-600 text-xs xl:text-sm">
                        {skill}
                      </li>
                    )
                  )}
            </ul>
          </section>

          {/* Reference */}
          <section>
            <h2 className="text-sm xl:text-lg font-bold mb-2">Reference</h2>
            <div className="h-px bg-zinc-700 mb-4" />
            {
              ReferencesData && ReferencesData.name?
                <div>
                  <p className="font-bold text-xs xl:text-sm">{ReferencesData.name || "Lorna Alvarado"}</p>
                  <p className="text-zinc-600 text-xs xl:text-sm">{ReferencesData.company || "Company Name"}</p>
                  <p className="text-zinc-600">{ReferencesData.position || "Position"}</p>
                  <p className="font-bold text-xs xl:text-sm">Phone</p>
                  <p className="text-zinc-600 text-xs xl:text-sm">{ReferencesData.phone || "No contact info"}</p>
                </div>
              :
              <div>
              <p className="font-bold text-xs xl:text-sm">Lorna Alvarado</p>
              <p className="text-zinc-600 mb-2 text-xs xl:text-sm">Company Name / Position</p>
              <p className="font-bold text-xs xl:text-sm">Phone</p>
              <p className="text-zinc-600 text-xs xl:text-sm">+123-456-7890</p>
            </div>
            }
           
          </section>
        </div>
      </div>
    </div>
  )
})
export default Template