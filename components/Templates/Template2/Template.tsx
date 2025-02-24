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
    <div ref={ref} className="w-[90%] min-[425px]:w-[80%] min-[500px]:w-[60%] sm:w-[50%] xl:w-[90%] md:w-full mx-auto bg-white text-black lg:p-8 p-3 shadow-lg">
      <header className="grid grid-cols-[2fr_1fr] justify-between mb-4">
      <section>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="lg:text-3xl text-lg font-bold tracking-tight text-gray-900">
                  {PersonalInformationData?.name || "Shubham Bhilare"}
                </h1>
                <p className="text-xs lg:text-lg text-gray-600 lg:mt-1">
                  {PersonalInformationData?.role || "Full stack developer"}
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="text-xxs lg:text-sm text-gray-600 space-y-2">
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
      <div className="grid grid-cols-[2fr_1fr] lg:gap-8 gap-4">
        <div className="lg:space-y-4 space-y-2">
          
          <section>
            <h2 className="text-xs lg:text-lg font-bold text-gray-900 ">EDUCATION</h2>
            <div className="grid grid-cols-2 gap-1 justify-between">
              {EducationData &&EducationData[0].degree
                ? EducationData.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-xs lg:text-base">{edu.degree}</h3>
                      <p className="text-gray-600 text-xxs lg:text-base">University: {edu.university}</p>
                      <p className="text-xxs lg:text-sm text-gray-500">Location: {edu.location}</p>
                      <p className="text-zinc-500 text-xxs lg:text-sm">Year of Completion: {edu.date ? new Date(edu.date).getFullYear() : "20XX"}</p>
                    </div>
                  ))
                : Array(2)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <div key={index} className="mb-2">
                          <h3 className="font-semibold text-xs lg:text-base">Pune University</h3>
                          <p className="text-gray-600 text-xxs lg:text-base">
                            B.Tech in Computer Science and Engineering
                          </p>
                          <p className="text-xxs lg:text-sm text-gray-500">Pune</p>
                          <p className="text-xxs lg:text-sm text-gray-500">20XX-20XX</p>
                        </div>
                      );
                    })}
            </div>
          </section>

          <section>
            <h2 className="text-xs lg:text-lg font-bold text-gray-900 ">CERTIFICATION</h2>
            <div className="grid grid-cols-2 gap-1 justify-between">
              {CertificationsData && CertificationsData[0].company
                ? CertificationsData.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-xs lg:text-base">  {cert.company}</h3>
                      <p className="text-gray-600 text-xxs"> {cert.title}</p>
                      <p className="text-xxs lg:text-sm text-gray-500">
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
                          <h3 className="font-semibold text-xs lg:text-base">Google</h3>
                          <p className="text-gray-600 text-xxs lg:text-sm">
                            Google Cloud Certified Professional Data Engineer
                          </p>
                          <p className="text-xxs lg:text-sm text-gray-500">20XX-20XX</p>
                        </div>
                      );
                    })}
            </div>
          </section>

          <section>
            <h2 className="text-xs lg:text-lg font-bold text-gray-900 ">
              WORK EXPERIENCE
            </h2>
            {ExperienceData && ExperienceData[0].company
              ? ExperienceData.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold text-xs lg:text-base">Role: {exp.position}</h3>
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
                    <p className="text-xxs lg:text-sm text-gray-500 mt-1">{exp.summary}</p>
                  </div>
                ))
              : Array(2)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index} className="mb-2">
                        <p className="text-gray-600 font-semibold text-xs lg:text-base">Journalist, Norfolk</p>
                        <h3 className="lg:text-base text-xxs ">The Vignal Pilot</h3>
                        <ul className="list-disc list-inside lg:text-xs text-xxs">
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
        <div className="lg:space-y-6 space-y-3">
          <section>
            <h2 className="text-xs lg:text-lg font-bold text-gray-900 ">SKILLS</h2>
            <div className="space-y-2">
              {SkillsData &&SkillsData[0].data
                ? SkillsData.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600 text-xxs lg:text-base"
                    >
                      <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                      {skill.data}
                    </div>
                  ))
                : ["Nodejs", "React", "HTML", "CSS", "JavaScript"].map(
                    (skill, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-600 text-xxs lg:text-base"
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
            <h2 className="text-xs lg:text-lg font-bold text-gray-900 ">AWARDS</h2>
            {AwardsData &&AwardsData[0].company
              ? AwardsData.map((award, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-semibold text-xs lg:text-base">{award.company}</h3>
                    <p className="text-gray-600">{award.title}</p>
                    <p className="text-xxs lg:text-sm text-gray-500">
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
                        <h3 className="font-semibold text-xs lg:text-base">Google</h3>
                        <p className="text-gray-600 text-xxs lg:text-sm">
                          Google Cloud Certified Professional Data Engineer
                        </p>
                        <p className="text-xxs lg:text-sm text-gray-500">20XX</p>
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
