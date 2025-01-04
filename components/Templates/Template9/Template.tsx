import type {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
  CertificationData,
  AwardsData,
} from "@/app/editor/page";

export default function JacquelineThompsonTemplate({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
  CertificationsData,
  AwardsData,
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  LanguagesData: LanguagesData[];
  CertificationsData: CertificationData[];
  AwardsData: AwardsData[];
}) {
  return (
    <div className=" w-[85%] mx-auto bg-white shadow-lg p-8 text-black">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">
          {PersonalInformationData?.name || "JACQUELINE THOMPSON"}
        </h1>
        <p className="text-sm">
          {PersonalInformationData?.address || "123 Anywhere St., Any City"} •{" "}
          {PersonalInformationData?.phone || "123-456-7890"} •{" "}
          {PersonalInformationData?.email || "hello@reallygreatsite.com"}
        </p>
        {/* <p className="text-sm">{PersonalInformationData?.website || "www.reallygreatsite.com"}</p> */}
      </header>

      <div className="w-full h-px bg-purple-700 mb-6"></div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">SUMMARY</h2>
        <p className="text-sm">
          {PersonalInformationData?.aboutme ||
            "Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. Skilled in strategic project management and team leadership. Seeking a challenging executive role to leverage technical expertise and drive engineering excellence."}
        </p>
      </section>
      <div className="w-full h-px bg-purple-700 mb-6"></div>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          WORK EXPERIENCE
        </h2>
        {ExperienceData && ExperienceData[0].company ? (
          ExperienceData.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">
                  {job.position}, {job.company}
                </h3>
                <span className="text-sm">
                  {job.startdate &&
                    new Date(job.startdate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                  -
                  {job.enddate
                    ? new Date(job.enddate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                </span>
              </div>
              <ul className="list-disc list-inside text-sm mt-2">
                {job.summary.split("\n").map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">
                  Engineering Executive, Borcelle Technologies
                </h3>
                <span className="text-sm">Jan 2023 - Present</span>
              </div>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>
                  Implemented cost-effective solutions, resulting in a 20%
                  reduction in project expenses.
                </li>
                <li>
                  Streamlined project workflows, enhancing overall efficiency by
                  25%.
                </li>
                <li>
                  Led a team in successfully delivering a complex engineering
                  project on time and within allocated budget.
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">
                  Project Engineer, Salford & Co
                </h3>
                <span className="text-sm">Mar 2021 - Dec 2022</span>
              </div>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>
                  Managed project timelines, reducing delivery times by 30%.
                </li>
                <li>
                  Spearheaded the adoption of cutting-edge engineering software,
                  improving project accuracy by 15%.
                </li>
                <li>
                  Collaborated with cross-functional teams, enhancing project
                  success rates by 10%.
                </li>
              </ul>
            </div>
          </>
        )}
      </section>
      <div className="w-full h-px bg-purple-700 mb-6"></div>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          EDUCATION
        </h2>
        {EducationData && EducationData[0].degree ? (
          EducationData.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Degree: {edu.degree}</h3>
                <p className="text-sm">
                  {edu.date &&
                    new Date(edu.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>
              <p className="text-sm">University: {edu.university}</p>

              {edu.location && (
                <p className="text-sm">Locattion: {edu.location}</p>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="mb-2">
              <h3 className="font-semibold">
                Master of Science in Mechanical Engineering
              </h3>
              <p className="text-sm">
                University of Engineering and Technology
              </p>
              <p className="text-sm">Sep 2019 - Oct 2020</p>
              <ul className="list-disc list-inside text-sm mt-1">
                <li>Specialization in Advanced Manufacturing.</li>
                <li>
                  Thesis on "Innovations in Sustainable Engineering Practices".
                </li>
              </ul>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">
                Bachelor of Science in Civil Engineering
              </h3>
              <p className="text-sm">City College of Engineering</p>
              <p className="text-sm">Aug 2015 - Aug 2019</p>
              <p className="text-sm">
                Relevant coursework in Structural Design and Project Management.
              </p>
            </div>
          </>
        )}
      </section>
      <div className="w-full h-px bg-purple-700 mb-6"></div>

      {/* Additional Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          Additional Information
        </h2>
        <div className="w-full ">
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">Technical Skills : </span>
              {(() => {
                return SkillsData && SkillsData[0].data ? (
                  SkillsData.map((skill) => {
                    return skill.data;
                  }).join(", ")
                ) : (
                  <>Enter Skills Here</>
                );
              })()}
            </li>
            <li>
              <span className="font-semibold">Languages : </span>
              {(() => {
                return LanguagesData&& LanguagesData[0].data ? (
                  LanguagesData.map((lang) => {
                    return lang.data;
                  }).join(", ")
                ) : (
                  <>Enter Languages here</>
                );
              })()}
            </li>
            <li>
              <span className="font-semibold">Certifications : </span>
              {(() => {
                return CertificationsData && CertificationsData[0].title ? (
                  CertificationsData.map((cert) => {
                    return cert.title;
                  }).join(", ")
                ) : (
                  <>Enter Certifications here</>
                );
              })()}
            </li>
            <li>
              <span className="font-semibold">Awards : </span>
              {(() => {
                return AwardsData && AwardsData[0].title ? (
                  AwardsData.map((award) => {
                    return award.title;
                  }).join(", ")
                ) : (
                  <>Enter Awards here</>
                );
              })()}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
