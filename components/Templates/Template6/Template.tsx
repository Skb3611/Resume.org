import { Phone, Mail, Home } from "lucide-react";
import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  CertificationData,
} from "@/app/editor/page";
import { forwardRef } from "react";

const Template=forwardRef(({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  CertificationsData
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  CertificationsData:CertificationData[]
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-full mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-serif text-zinc-800 border-b-2 border-zinc-800 pb-2 mb-2">
              {PersonalInformationData?.name || "ISABEL MERCADO"}
            </h1>
            <p className="text-lg text-zinc-600 font-serif">
              {PersonalInformationData?.role || "Executive Secretary"}
            </p>
          </div>
          <div className="text-right space-y-2 text-sm">
            <div className="flex items-center justify-end gap-2 text-zinc-700">
              <span>{PersonalInformationData?.phone || "+123-456-7890"}</span>
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-end gap-2 text-zinc-700">
              <span>
                {PersonalInformationData?.email || "hello@reallygreatsite.com"}
              </span>
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-end gap-2 text-zinc-700">
              <span>
                {PersonalInformationData?.address ||
                  "123 Anywhere St., Any City"}
              </span>
              <Home className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-zinc-800" />

      {/* Summary */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-serif text-center text-zinc-800 mb-4">
          SUMMARY
        </h2>
        <p className="text-zinc-600  max-w-4xl mx-auto text-sm text-justify">
          {PersonalInformationData?.aboutme ||
            "Highly motivated and professional Executive Secretary with over 7 years of experience providing high-level support to senior executives. Proficient in managing calendars, organizing meetings and events, handling confidential documents, and communicating with internal and external stakeholders. Possess exceptional communication and interpersonal skills with a proven ability to work independently and as part of a team."}
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_1.2fr] gap-8 p-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Education */}
          <section>
            <h2 className="text-lg font-serif text-zinc-800 mb-4 border-b border-zinc-300">
              EDUCATION
            </h2>
            <div className="space-y-4 text-sm">
              {EducationData && EducationData[0].degree ? (
                EducationData.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-zinc-800">
                      University: {item.university}
                    </h3>

                    <p className="text-zinc-600">Degree: {item.degree}</p>
                    <p className="text-zinc-500 ">Location: {item.location}</p>
                    <p className="text-zinc-500 text-sm">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric", // Include the year
                            month: "short", // Use the abbreviated month format (e.g., "Jan")
                          })
                        : "2020"}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-zinc-800">
                      Ginyard International Co. University
                    </h3>
                    <p className="text-zinc-600">
                      Bachelor's Degree in Business Administration
                    </p>
                    <p className="text-zinc-500 text-sm">2016 - 2020</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-800">
                      Studio Shodwe University
                    </h3>
                    <p className="text-zinc-600">
                      Business Administration on Executive Assistance
                    </p>
                    <p className="text-zinc-500 text-sm">2020 - 2022</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-serif text-zinc-800 mb-4 border-b border-zinc-300">
              SKILLS
            </h2>
            <ul className="list-disc list-inside text-sm space-y-2 text-zinc-600">
              {SkillsData && SkillsData[0].data ? (
                SkillsData.map((item, index) => (
                  <li key={index}>{item.data}</li>
                ))
              ) : (
                <>
                  <li>Strong organizational and time-management skills</li>
                  <li>Exceptional communication and interpersonal skills</li>
                  <li>Ability to work independently and as part of a team</li>
                  <li>
                    Detail-oriented and able to handle multiple tasks
                    simultaneously
                  </li>
                  <li>
                    Experience in managing budgets and handling financial
                    documents
                  </li>
                </>
              )}
            </ul>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-lg font-serif text-zinc-800 mb-4 border-b border-zinc-300">
              CERTIFICATIONS
            </h2>
            <div>
              <div className="text-zinc-600 text-sm space-y-2">
                {CertificationsData[0].company ?
                CertificationsData.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-zinc-800">
                      {item.company||"Udemy"}
                    </h3>
                    <p className="text-zinc-600">
                      {item.title || "Title" } | {item.date
                        ? new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric", // Include the year
                            month: "short", // Use the abbreviated month format (e.g., "Jan")
                          })
                        : "20XX"}
                    </p>
                  </div>
                )):
                  <div>
                    <h3 className="font-semibold text-zinc-800">
                      Udemy
                    </h3>
                    <p className="text-zinc-600">
                      Executive Assistant Training | 2020
                    </p>
                  </div>
                  }
              </div>
            </div>
            
          </section>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-zinc-200" />

        {/* Right Column - Professional Experience */}
        <div>
          <h2 className="text-lg font-serif text-zinc-800 mb-4 border-b border-zinc-300">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6 text-sm">
            {ExperienceData && ExperienceData[0].company ? (
              ExperienceData.map((item, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-semibold text-zinc-800">
                    {item.position}
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    {item.company} |{" "}
                    {item.startdate
                      ? new Date(item.startdate).getFullYear()
                      : "2018"}{" "}
                    -{" "}
                    {item.enddate
                      ? new Date(item.enddate).getFullYear()
                      : "Present"}
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-1">
                    {item.summary.split("\n").map((point, idx) => (
                      <p key={idx}>{point}</p>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold text-zinc-800">
                    Executive Secretary
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Ingoude Company | 2018 - Present
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-1">
                    <li>
                      Manage the schedules and calendars of the CEO and other
                      senior executives
                    </li>
                    <li>
                      Coordinate and schedule meetings and conferences with
                      internal and external stakeholders
                    </li>
                    <li>
                      Prepare and distribute meeting agendas, minutes, and other
                      relevant materials
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-zinc-800">
                    Executive Assistant
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Wardiere Inc. | 2016 - 2018
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-1">
                    <li>
                      Managed calendars, scheduled appointments, and arranged
                      meetings and conferences
                    </li>
                    <li>
                      Prepared and distributed reports, presentations, and other
                      materials
                    </li>
                    <li>
                      Handled confidential documents and maintained their proper
                      organization
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-800">
                    Executive Secretary Intern
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Aldenaire & Partners | 2015 - 2016
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 space-y-1">
                    <li>
                      Assisted executive secretary in managing and coordinating
                      schedules, meetings, and travel arrangements for senior
                      executives
                    </li>
                    <li>
                      Conducted research and prepared reports on various topics
                      related to the company's operations and industry trends
                    </li>
                    <li>
                      Provided administrative support, including answering phone
                      calls, responding to emails, and preparing correspondence
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
})
export default Template;
