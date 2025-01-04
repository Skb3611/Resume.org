import {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
} from "@/app/editor/page";
export default function Template1({
  PersonalInformationData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
}: {
  PersonalInformationData: PersonalData;
  EducationData: EducationData[];
  SkillsData: SkillsData[];
  ExperienceData: ExperienceData[];
  LanguagesData: LanguagesData[];
}) {
  return (
    <div className="flex mx-auto bg-white shadow-lg w-[85%]">
      <div className="bg-slate-700 w-1/3 text-white p-4">
        <h1 className="text-lg font-bold mb-1">
          {PersonalInformationData?.name || "Random name"}
        </h1>
        <p className="mb-4 text-xs">
          {PersonalInformationData?.role || "Random role"}
        </p>

        <h2 className="text-lg font-semibold mb-1">ABOUT ME</h2>
        <p className="mb-4 text-xs">
          {PersonalInformationData?.aboutme ||
            "Experienced journalist passionate about uncovering the truth and producing high-quality content."}
        </p>

        <h2 className="text-lg font-semibold mb-1">SKILLS</h2>
        <ul className="list-none mb-4 text-xs">
          {SkillsData && SkillsData[0].data
            ? SkillsData.map((item) => {
                return <li key={item.index}>- {item.data} </li>;
              })
            : Array(5)
                .fill(0)
                .map((_, index) => {
                  return <li key={index}>- Lorem ipsum </li>;
                })}
        </ul>

        <h2 className="text-lg font-semibold mb-1">CONTACT</h2>
        <p className="text-xs mb-1">
          📞 {PersonalInformationData?.phone || "+1 686 0202 020"}
        </p>
        <p className="text-xs mb-1 w-full">
          ✉️ {PersonalInformationData?.email || "asus@gmail.com"}
        </p>
        <p className="text-xs">
          📍 {PersonalInformationData?.address || "Address"}
        </p>
        <h2 className="text-lg font-semibold mb-1 mt-4">Languages</h2>
        {LanguagesData && LanguagesData[0].data ? (
            LanguagesData.map((item) => {
              return <p className="text-xs">{item.data}</p>;
            })
          ) : (
            <>
              <p className="text-xs">English: Native</p>
              <p className="text-xs">Spanish: Proficient</p>
              <p className="text-xs">French: Advanced</p>
            </>
          )}
      </div>

      <div className="w-2/3 px-4 py-2 text-black">
        <section className="mb-4">
          <h2 className="text-base font-semibold bg-yellow-100 p-1 mb-1">
            WORK EXPERIENCE
          </h2>
          {ExperienceData && ExperienceData[0].company
            ? ExperienceData.map((item) => {
                // console.log(item);
                return (
                  <div key={item.index} className="mb-2 ml-2">
                    <h3 className="font-semibold text-sm">
                      {item.company} |{" "}
                      {item.startdate
                        ? new Date(item.startdate).getFullYear().toString()
                        : "N/A"}{" "}
                      -{" "}
                      {item.enddate
                        ? new Date(item.enddate).getFullYear().toString()
                        : "N/A"}
                    </h3>
                    <p className="italic text-xs">{item.position}</p>
                    <p className="text-sm ">{item.summary}</p>
                  </div>
                );
              })
            : Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <h3 className="font-semibold text-sm">
                        THE VIRGINIAN PILOT | 20XX – 20XX
                      </h3>
                      <p className="italic text-xs">Journalist, Norfolk</p>
                      <ul className="list-disc list-inside text-xs">
                        <li>
                          Pitch timely story ideas for investigative journalism.
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

        <section>
         <h2 className="text-base font-semibold bg-yellow-100 p-1 mb-1">
            EDUCATION
          </h2> 
          {EducationData &&EducationData[0].degree
            ? EducationData.map((item) => {
                return (
                  <div className="mb-1" key={item.index}>
                    <p className="font-semibold text-xs">
                      {item.degree} |{" "}
                      {item.date
                        ? new Date(item.date).getFullYear().toString()
                        : "N/A"}
                    </p>
                    <p className="font-semibold text-xs">University: {item.university}</p>
                    <p className="italic text-xs">Location: {item.location}</p>
                  </div>
                );
              })
            : Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <p className="font-semibold text-xs">
                        20XX-20XX | Seattle - Washington
                      </p>
                      <p className="font-semibold text-xs">
                        Masters Digital Communication
                      </p>
                      <p className="italic text-xs">University of Washington</p>
                    </div>
                  );
                })}
        </section>
      </div>
    </div>
  );
}
