import { Phone, Mail, Globe, MapPin } from "lucide-react";

import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData
} from "@/app/editor/page";
import { forwardRef } from "react";

const Template=forwardRef(({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  LanguagesData: LanguagesData[];
},ref:React.Ref<HTMLDivElement>) => {
 
  return (
    <div ref={ref} className="w-[90%] min-[425px]:w-[70%] min-[550px]:w-[60%] sm:w-[50%] lg:w-[90%] xl:w-[80%]  md:w-full  mx-auto bg-white shadow-lg p-4 xl:p-8">
      {/* Header */}
      <div className="text-center mb-5 xl:mb-8">
        <h1 className="text-xl xl:text-2xl  font-semibold tracking-[0.3em] text-zinc-800 xl:mb-1">
          {PersonalInformationData?.name || "JONATHAN PATTERSON"}
        </h1>
        <p className="text-zinc-600 tracking-widest text-xs xl:text-base">
          {PersonalInformationData?.role || "GRAPHIC DESIGNER"}
        </p>
      </div>

      <div className="grid grid-cols-[2fr_3fr] gap-4 xl:gap-8">
        {/* Left Column */}
        <div className="space-y-4 ">
          {/* Contact */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              CONTACT
            </h2>
            <div className=" space-y-1.5 xl:space-y-3 text-zinc-600 text-xxs xl:text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-3 md:h-4" />
                <span>{PersonalInformationData?.phone || "123-456-7890"}</span>
              </div>
              <div className="flex items-center gap-3 md:hidden">
                <Mail className="w-4 h-3 md:h-4" />
                <span>
                  {PersonalInformationData?.email.split("@")[0] + " @gmail.com" ||
                    "hello@reallygreatsite.com"}
                </span>
              </div>
              <div className=" items-center gap-3 hidden md:flex">
                <Mail className="w-4 h-3 md:h-4" />
                <span>
                  {PersonalInformationData?.email ||
                    "hello@reallygreatsite.com"}
                </span>
              </div>
              {/* <div className="flex items-center gap-3">
                <Globe className="w-4 h-3 md:h-4" />
                <span>{PersonalInformationData?.website || "www.reallygreatsite.com"}</span>
              </div> */}
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-3 md:h-4" />
                <span>
                  {PersonalInformationData?.address ||
                    "123 Anywhere St., Any City"}
                </span>
              </div>
            </div>
            <div className="border-b border-dotted border-zinc-300 xl:mt-4 mt-2"></div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              SKILLS
            </h2>
            <ul className=" space-y-1 xl:space-y-2 text-xxs xl:text-xs text-zinc-600">
              {SkillsData && SkillsData[0].data ? (
                SkillsData.map((item, index) => (
                  <li key={index}>{item.data}</li>
                ))
              ) : (
                <>
                  <li>Skill name here</li>
                  <li>Your Skill</li>
                  <li>Special skills</li>
                  <li>List your skills</li>
                </>
              )}
            </ul>
            <div className="border-b border-dotted border-zinc-300 xl:mt-4 mt-2"></div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              EDUCATION
            </h2>
            <div className="space-y-4 text-xxs xl:text-xs text-zinc-600">
              {EducationData && EducationData[0].degree ? (
                EducationData.map((item, index) => (
                  <div key={index} className="mb-2 ">
                    <h3 className="font-medium">Degree: {item.degree}</h3>
                    <p className="text-zinc-600">
                      University: {item.university}
                    </p>
                    <p className="text-zinc-500 text-xxs xl:text-xs">
                      {item.date
                        ? new Date(item.date).getFullYear()
                        : "2016-2018"}
                    </p>
                    <p className="text-zinc-600 text-xxs xl:text-xs">
                      Location: {item.location}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-2 ">
                    <h3 className="font-medium">Your Degree Name</h3>
                    <p className="text-zinc-600">Your Institution Name</p>
                    <p className="text-zinc-500 text-xxs xl:text-xs">2016-2018</p>
                    <p className="text-zinc-600 text-xxs xl:text-xs">
                      Location: Your Location
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Your Degree Name</h3>
                    <p className="text-zinc-600">Your Institution Name</p>
                    <p className="text-zinc-500 text-xxs xl:text-xs">2016-2018</p>
                    <p className="text-zinc-600 text-xxs xl:text-xs">
                      Location: Your Location
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="border-b border-dotted border-zinc-300 xl:mt-4 mt-2"></div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              LANGUAGES
            </h2>
            <div className="text-xxs xl:text-xs space-y-1">
              {LanguagesData && LanguagesData[0].data ? 
                LanguagesData.map((item, index) => (
                  <p key={index} className="text-zinc-600">
                    {item.data}
                  </p>
                ))
               : (
                <>
                  <p className="text-zinc-600">English</p>
                  <p className="text-zinc-600">German</p>
                  <p className="text-zinc-600 ">Spanish</p>
                </>
              
                
              )}
            
              </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-4 ">
          {/* Profile */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              PROFILE
            </h2>
            <p className="text-zinc-600 text-xxs xl:text-xs">
              {PersonalInformationData?.aboutme ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis pretium nisl, nec commodo est. Fusce laoreet consequat sapien, eu fermentum ex pulvinar eget. Praesent hendrerit nulla in varius pharetra. Fusce facilisis venenatis lacus in lobortis. Fusce vulputate iaculis mauris. Nunc risus arcu, tempor vel dignissim porta, vulputate id quam. Vestibulum pellentesque augue in lobortis ullamcorper. In eleifend nisl faucibus molestie porttitor. Augue in lobortis ullamcorper. In eleifend nisl faucibus molestie porttitor."}
            </p>
            <div className="border-b border-dotted border-zinc-300 xl:mt-4 mt-2"></div>
          </section>

          {/* Work Experience */}
          <section className="text-zinc-800">
            <h2 className="text-zinc-800 font-semibold tracking-wider text-xs xl:text-base mb-2 ">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {ExperienceData && ExperienceData[0].company ? (
                ExperienceData.map((item, index) => (
                  <div key={index} className="mb-6 text-zinc-600">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="text-xxs xl:text-lg font-semibold">
                        {item.position || "Job position here"}
                      </h3>
                      <span className="text-zinc-500 text-xxs xl:text-xs">
                        {item.startdate
                          ? `${new Date(item.startdate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric", // Include the year
                                month: "short", // Use the abbreviated month format (e.g., "Jan")
                              }
                            )} - ${
                              item.enddate
                                ? new Date(item.enddate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric", // Include the year
                                      month: "short", // Use the abbreviated month format (e.g., "Jan")
                                    }
                                  )
                                : "Present"
                            }`
                          : "2020-2022"}
                      </span>
                    </div>
                    <p className="text-zinc-600 mb-2 text-xxs xl:text-base">
                      {item.company || "Company name"}
                    </p>
                    <ul className="list-disc list-inside text-zinc-600  space-y-1.5 xl:space-y-2 text-xxs xl:text-xs">
                      {item.summary.split("\n").map((point, idx) => (
                        <p key={idx}>{point}</p>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-xxs xl:text-base">Your Job Position here</h3>
                      <span className="text-zinc-500 text-xxs xl:text-xs">2020-2022</span>
                    </div>
                    <p className="text-zinc-600 mb-2 text-xxs xl:text-base">Company name</p>
                    <ul className="list-disc list-inside text-zinc-600  space-y-1.5 xl:space-y-2 text-xxs xl:text-xs ">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam sagittis pretium nisl, nec commodo est.
                      </li>
                      <li>
                        Fusce laoreet consequat sapien, eu fermentum ex pulvinar
                        eget. Praesent hendrerit nulla in varius pharetra. Fusce
                        facilisis venenatis lacus in lobortis. Fusce vulputate
                        iaculis mauris.
                      </li>
                      <li>
                        Nunc risus arcu, tempor vel dignissim porta, vulputate
                        id quam. Vestibulum pellentesque augue in lobortis
                        ullamcorper.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="hidden lg:block mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-xxs xl:text-base">Your Job Position here</h3>
                      <span className="text-zinc-500 text-xxs xl:text-xs">2020-2022</span>
                    </div>
                    <p className="text-zinc-600 mb-2 text-xxs xl:text-base">Company name</p>
                    <ul className="list-disc list-inside text-zinc-600  space-y-1.5 xl:space-y-2 text-xxs xl:text-xs ">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam sagittis pretium nisl, nec commodo est.
                      </li>
                      <li>
                        Fusce laoreet consequat sapien, eu fermentum ex pulvinar
                        eget. Praesent hendrerit nulla in varius pharetra. Fusce
                        facilisis venenatis lacus in lobortis. Fusce vulputate
                        iaculis mauris.
                      </li>
                      <li>
                        Nunc risus arcu, tempor vel dignissim porta, vulputate
                        id quam. Vestibulum pellentesque augue in lobortis
                        ullamcorper.
                      </li>
                    </ul>
                  </div>
                  
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
})
export default Template;
