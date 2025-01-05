import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { forwardRef } from "react";
import {
  EducationData,
  SkillsData,
  ExperienceData,
  CertificationData,
  AwardsData,
  PersonalData,
} from "@/app/editor/page";
const Template=forwardRef(({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  CertificationsData,
  AwardsData,
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  CertificationsData: CertificationData[];
  AwardsData: AwardsData[];
},ref:React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="w-[90%] mx-auto bg-white text-black p-8 shadow-lg">
      <header className="grid   grid-cols-[2fr_1fr] mb-4">
      <section>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {PersonalInformationData?.name || "Shubham Bhilare"}
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  {PersonalInformationData?.role || "Full stack developer"}
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {PersonalInformationData?.phone || "+91 XXXXXXXXXX"}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {PersonalInformationData?.email || "example@gmail.com"}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {PersonalInformationData?.address || " Pune, India"}
              </div>
              {/* <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {PersonalInformationData?.website ?? ""}
              </div> */}
            </div>
          </section>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-4">
          
          <section>
            <h2 className="text-lg font-bold text-gray-900 ">EDUCATION</h2>
            <div className="grid grid-cols-2 justify-between">
              {EducationData &&EducationData[0].degree
                ? EducationData.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">University: {edu.university}</p>
                      <p className="text-sm text-gray-500">Location: {edu.location}</p>
                      <p className="text-zinc-500 text-sm">Year of Completion: {edu.date ? new Date(edu.date).getFullYear() : "20XX"}</p>
                    </div>
                  ))
                : Array(2)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <div key={index} className="mb-2">
                          <h3 className="font-semibold">Pune University</h3>
                          <p className="text-gray-600">
                            B.Tech in Computer Science and Engineering
                          </p>
                          <p className="text-sm text-gray-500">Pune</p>
                          <p className="text-sm text-gray-500">20XX-20XX</p>
                        </div>
                      );
                    })}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 ">CERTIFICATION</h2>
            <div className="grid grid-cols-2 justify-between">
              {CertificationsData && CertificationsData[0].company
                ? CertificationsData.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold">  {cert.company}</h3>
                      <p className="text-gray-600"> {cert.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(cert.date as Date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                          })}
                      </p>
                    </div>
                  ))
                : Array(2)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold">Google</h3>
                          <p className="text-gray-600">
                            Google Cloud Certified Professional Data Engineer
                          </p>
                          <p className="text-sm text-gray-500">20XX-20XX</p>
                        </div>
                      );
                    })}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 ">
              WORK EXPERIENCE
            </h2>
            {ExperienceData && ExperienceData[0].company
              ? ExperienceData.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold">Role: {exp.position}</h3>
                    <p className="text-gray-600">
                      {exp.company} /{" "}
                      {exp.startdate
                        ? new Date(exp.startdate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                        })
                        : "N/A"}{" - "}
                      {exp.enddate
                        ? new Date(exp.enddate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                      })
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{exp.summary}</p>
                  </div>
                ))
              : Array(3)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index} className="mb-2">
                        <h3 className="font-semibold">The Vignal Pilot</h3>
                        <p className="text-gray-600">Journalist, Norfolk</p>
                        <ul className="list-disc list-inside text-xs">
                          <li>
                            Pitch timely story ideas for investigative
                            journalism.
                          </li>
                          <li>
                            Write 15 stories monthly covering breaking news.
                          </li>
                          <li>In-depth analysis of political events.</li>
                          <li>
                            Fact-checking for accuracy and data visualization.
                          </li>
                        </ul>
                      </div>
                    );
                  })}
          </section>
        </div>

        {/* Move Contact Info to the Second Column */}
        <div className="space-y-6">
          

          <section>
            <h2 className="text-lg font-bold text-gray-900 ">SKILLS</h2>
            <div className="space-y-2">
              {SkillsData &&SkillsData[0].data
                ? SkillsData.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {skill.data}
                    </div>
                  ))
                : ["Nodejs", "React", "HTML", "CSS", "JavaScript"].map(
                    (skill, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <p className="text-gray-600">{skill}</p>
                        </div>
                      );
                    }
                  )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 ">AWARDS</h2>
            {AwardsData &&AwardsData[0].company
              ? AwardsData.map((award, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-semibold">{award.company}</h3>
                    <p className="text-gray-600">{award.title}</p>
                    <p className="text-sm text-gray-500">
                      {typeof award.date === "string"
                        ? award.date
                        : award.date?.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                        })}
                    </p>
                  </div>
                ))
              : Array(3)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index} className="mb-3">
                        <h3 className="font-semibold">Google</h3>
                        <p className="text-gray-600">
                          Google Cloud Certified Professional Data Engineer
                        </p>
                        <p className="text-sm text-gray-500">20XX</p>
                      </div>
                    );
                  })}
          </section>
        </div>
      </div>
    </div>
  );
})
export default Template
