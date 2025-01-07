import { Phone, Mail, Globe, MapPin } from "lucide-react";

import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
} from "@/app/editor/page";
import { forwardRef } from "react";

const Template=forwardRef(({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
},ref:React.Ref<HTMLDivElement>) => {
 
  return (
    <div ref={ref} className="w-[90%] mx-auto bg-white shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl  font-semibold tracking-[0.3em] text-zinc-800 mb-1.5">
          {PersonalInformationData?.name || "JONATHAN PATTERSON"}
        </h1>
        <p className="text-zinc-600 tracking-widest">
          {PersonalInformationData?.role || "GRAPHIC DESIGNER"}
        </p>
      </div>

      <div className="grid md:grid-cols-[2fr_3fr] gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Contact */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              CONTACT
            </h2>
            <div className="space-y-3 text-zinc-600 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>{PersonalInformationData?.phone || "123-456-7890"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>
                  {PersonalInformationData?.email ||
                    "hello@reallygreatsite.com"}
                </span>
              </div>
              {/* <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>{PersonalInformationData?.website || "www.reallygreatsite.com"}</span>
              </div> */}
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>
                  {PersonalInformationData?.address ||
                    "123 Anywhere St., Any City"}
                </span>
              </div>
            </div>
            <div className="border-b border-dotted border-zinc-300 mt-4"></div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              SKILLS
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600">
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
            <div className="border-b border-dotted border-zinc-300 mt-4"></div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              EDUCATION
            </h2>
            <div className="space-y-4 text-sm text-zinc-600">
              {EducationData && EducationData[0].degree ? (
                EducationData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium">Degree: {item.degree}</h3>
                    <p className="text-zinc-600">
                      University: {item.university}
                    </p>
                    <p className="text-zinc-500 text-sm">
                      {item.date
                        ? new Date(item.date).getFullYear()
                        : "2016-2018"}
                    </p>
                    <p className="text-zinc-600 text-sm">
                      Location: {item.location}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium">Your Degree Name</h3>
                    <p className="text-zinc-600">Your Institution Name</p>
                    <p className="text-zinc-500 text-sm">2016-2018</p>
                    <p className="text-zinc-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Your Degree Name</h3>
                    <p className="text-zinc-600">Your Institution Name</p>
                    <p className="text-zinc-500 text-sm">2016-2018</p>
                    <p className="text-zinc-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="border-b border-dotted border-zinc-300 mt-4"></div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              LANGUAGES
            </h2>
            <div className="space-y-1">
              <div>
                <p className="text-zinc-600">English</p>
              </div>
              <div>
                <p className="text-zinc-600">German</p>
              </div>
              <div>
                <p className="text-zinc-600 ">Spanish</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Profile */}
          <section>
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              PROFILE
            </h2>
            <p className="text-zinc-600 text-sm">
              {PersonalInformationData?.aboutme ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis pretium nisl, nec commodo est. Fusce laoreet consequat sapien, eu fermentum ex pulvinar eget. Praesent hendrerit nulla in varius pharetra. Fusce facilisis venenatis lacus in lobortis. Fusce vulputate iaculis mauris. Nunc risus arcu, tempor vel dignissim porta, vulputate id quam. Vestibulum pellentesque augue in lobortis ullamcorper. In eleifend nisl faucibus molestie porttitor. Augue in lobortis ullamcorper. In eleifend nisl faucibus molestie porttitor."}
            </p>
            <div className="border-b border-dotted border-zinc-300 mt-4"></div>
          </section>

          {/* Work Experience */}
          <section className="text-zinc-800">
            <h2 className="text-zinc-800 font-semibold tracking-wider mb-4">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {ExperienceData && ExperienceData[0].company ? (
                ExperienceData.map((item, index) => (
                  <div key={index} className="mb-6 text-zinc-600">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">
                        {item.company || "Company Name"}
                      </h3>
                      <span className="text-zinc-500">
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
                    <p className="text-zinc-600 mb-2">
                      {item.position || "Position here"}
                    </p>
                    <ul className="list-disc list-inside text-zinc-600 space-y-2 text-sm">
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
                      <h3 className="font-medium">Your Job Position here</h3>
                      <span className="text-zinc-500">2020-2022</span>
                    </div>
                    <p className="text-zinc-600 mb-2">Company name</p>
                    <ul className="list-disc list-inside text-zinc-600 space-y-2 text-sm ">
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
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Your Job Position here</h3>
                      <span className="text-zinc-500">2020-2022</span>
                    </div>
                    <p className="text-zinc-600 mb-2">Company name</p>
                    <ul className="list-disc list-inside text-zinc-600 space-y-2 text-sm">
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
                      <li>In eleifend nisl faucibus molestie porttitor.</li>
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
