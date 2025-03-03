import { Phone, Mail, MapPin } from "lucide-react"
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
    <div ref={ref} className="w-[90%] min-[425px]:w-[80%] min-[500px]:w-[65%] sm:w-[50%] md:w-full lg:w-[90%] mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="p-5 text-center ">
        <h1 className="text-lg xl:text-3xl font-medium text-zinc-800 xl:mb-1.5">
          {PersonalInformationData?.name || "Lorna Alvarado"}
        </h1>
        <p className="text-sm xl:text-lg text-zinc-800">
          {PersonalInformationData?.role || "Marketing Manager"}
        </p>
      </div>

      {/* Contact Info Banner */}
      <div className="bg-zinc-200 py-2.5 xl:py-4 xl:px-8 px-2 min-[425px]:px-4 flex justify-between text-xxs   xl:text-sm gap-2 items-center">
        <div className="flex items-center gap-2 text-zinc-700">
          <Phone className="xl:w-5 w-3  xl:h-5 h-3" />
          <span>{PersonalInformationData?.phone || "+123-456-7890"}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700">
          <Mail className="xl:w-5 w-3  xl:h-5 h-3" />
          <span>{PersonalInformationData?.email || "hello@reallygreatsite.com"}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700">
          <MapPin className="xl:w-5 w-3  xl:h-5 h-3" />
          <span>{PersonalInformationData?.address || "123 Anywhere St., Any City"}</span>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1px_3fr]  gap-2 xl:gap-8 xl:p-8 p-4">
        {/* Left Column */}
        <div className="space-y-4 xl:space-y-8">
          {/* Education */}
          <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">EDUCATION</h2>
            {EducationData && EducationData[0].degree  ? (
              EducationData.map((item, index) => (
                <div key={index} className="mb-2 xl:mb-4  text-xxs  xl:text-sm">
                  <h3 className="font-medium text-zinc-800">Degree: {item.degree}</h3>
                  <p className="text-zinc-800">University: {item.university}</p>
                  <p className="text-zinc-500">Location: {item.location}</p>
                  <p className="text-zinc-500">Year of Completion: {item.date ? new Date(item.date).getFullYear() : "20XX"}</p>
                </div>
              ))
            ) : (
              <>
                <div className="mb-2 xl:mb-4  text-xxs  xl:text-sm">
                  <h3 className="font-medium text-zinc-800">BA Sales and Commerce</h3>
                  <p className="text-zinc-800">Borcelle University</p>
                  <p className="text-zinc-500">(2016 - 2020)</p>
                </div>
                <div className="mb-2 xl:mb-4  text-xxs  xl:text-sm">
                  <h3 className="font-medium text-zinc-800">Bachelor of Design</h3>
                  <p className="text-zinc-800">Wardiere University</p>
                  <p className="text-zinc-500">(2011 - 2015)</p>
                </div>
              </>
            )}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">SKILLS</h2>
            <ul className="space-y-1  text-xxs  xl:text-sm">
              {SkillsData && SkillsData[0].data ? (
                SkillsData.map((item, index) => (
                  <li key={index} className="text-zinc-800">• {item.data}</li>
                ))
              ) : (
                <>
                  <li className="text-zinc-800">• Management Skills</li>
                  <li className="text-zinc-800">• Digital Marketing</li>
                  <li className="text-zinc-800">• Negotiation</li>
                  <li className="text-zinc-800">• Critical Thinking</li>
                  <li className="text-zinc-800">• Communication Skills</li>
                  <li className="text-zinc-800">• Digital Marketing</li>
                  <li className="text-zinc-800">• Negotiation</li>
                </>
              )}
            </ul>
          </section>

          {/* Language */}
          <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">LANGUAGE</h2>
            <ul className="space-y-1  text-xxs  xl:text-sm">
              <li className="text-zinc-800">• English</li>
              <li className="text-zinc-800">• Spanish</li>
              <li className="text-zinc-800">• French</li>
            </ul>
          </section>
        </div>

        {/* Partition Line */}
        <div className="block xl:w-0.5 w-px bg-zinc-400"></div>

        {/* Right Column */}
        <div className="space-y-4 xl:space-y-8 ">
          {/* Profile */}
          <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">PROFILE</h2>
            <p className="text-zinc-800  text-xxs  xl:text-sm">
              {PersonalInformationData?.aboutme ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu."}
            </p>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">WORK EXPERIENCE</h2>
            {ExperienceData && ExperienceData[0].company ? (
              ExperienceData.map((item, index) => (
                <div key={index} className="mb-6  text-xxs  xl:text-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-zinc-800">{item.company}</h3>
                      <p className="text-zinc-700">{item.position}</p>
                    </div>
                    <p className="text-zinc-500">
                      {item.startdate ? new Date(item.startdate).getFullYear() : "2020"} -{" "}
                      {item.enddate ? new Date(item.enddate).getFullYear() : "2023"}
                    </p>
                  </div>
                  <p className="text-zinc-800 text-justify">{item.summary}</p>
                </div>
              ))
            ) : (
              <div className= "text-xxs  xl:text-sm">
                <div className="mb-3 xl:mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-zinc-800">Ginyard International</h3>
                      <p className="text-zinc-700">Product Design Manager</p>
                    </div>
                    <p className="text-[6px] xl:text-sm text-zinc-500">2020 - 2023</p>
                  </div>
                  <p className="text-zinc-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu.
                  </p>
                </div>
                <div className="mb-3 xl:mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-zinc-800">Liceria & Co.</h3>
                      <p className="text-zinc-700">Product Design Manager</p>
                    </div>
                    <p className="text-[6px] xl:text-sm text-zinc-500">2019 - 2020</p>
                  </div>
                  <p className="text-zinc-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* References */}
          {/* <section>
            <h2 className="text-xs xl:text-xl font-semibold mb-2 xl:mb-4 text-zinc-800">REFERENCES</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className= "text-xxs  xl:text-sm">
                <h3 className="font-medium text-zinc-800">Bailey Dupont</h3>
                <p className="text-zinc-800 text-xs">Wardiere Inc. / CEO</p>
                <p className="text-zinc-800 text-xs">Phone: 123-456-7890</p>
                <p className="text-zinc-800 text-xs">Email: hello@reallygreatsite.com</p>
              </div>
              <div className= "text-xxs  xl:text-sm">
                <h3 className="font-medium text-zinc-800">Harumi Kobayashi</h3>
                <p className="text-zinc-800 text-xs">Wardiere Inc. / CEO</p>
                <p className="text-zinc-800 text-xs">Phone: 123-456-7890</p>
                <p className="text-zinc-800 text-xs">Email: hello@reallygreatsite.com</p>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  )
})
export default Template