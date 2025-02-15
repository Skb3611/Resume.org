import React,{forwardRef} from "react";
import {
  PersonalData,
  EducationData,
  SkillsData,
  ExperienceData,
  LanguagesData,
  
} from "@/app/editor/page";
const Template=forwardRef(({
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
  
},ref:React.Ref<HTMLDivElement>) => {

  return (
    <div ref={ref}  className="flex mx-auto bg-white shadow-lg lg:w-[85%] w-[70%] max-[425px]:w-[95%] sm:w-[50%] md:w-full my-1">
      <div className="bg-slate-700 sm:w-1/3 w-[35%] text-white p-4">
        <h1 className="text-xs lg:text-lg font-bold mb-1">
          {PersonalInformationData?.name || "Random name"}
        </h1>
        <p className="mb-4 text-xxs lg:text-xs">
          {PersonalInformationData?.role || "Random role"}
        </p>

        <h2 className="text-xs lg:text-lg font-semibold mb-1">ABOUT ME</h2>
        <p className="mb-4 text-xxs lg:text-xs">
          {PersonalInformationData?.aboutme ||
            "Experienced journalist passionate about uncovering the truth and producing high-quality content."}
        </p>

        <h2 className="text-xs lg:text-lg font-semibold mb-1">SKILLS</h2>
        <ul className="list-none mb-4 text-xxs lg:text-xs">
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

        <h2 className="text-xs lg:text-lg font-semibold mb-1">CONTACT</h2>
        <p className="text-xxs lg:text-xs mb-1">
          📞 {PersonalInformationData?.phone || "+1 686 0202 020"}
        </p>
        <p className="text-xxs lg:text-xs mb-1 w-full">
          ✉️ {PersonalInformationData?.email || "asus@gmail.com"}
        </p>
        <p className="text-xxs lg:text-xs">
          📍 {PersonalInformationData?.address || "Address"}
        </p>
        <h2 className="text-xs lg:text-lg font-semibold mb-1 mt-4">Languages</h2>
        {LanguagesData && LanguagesData[0].data ? (
            LanguagesData.map((item) => {
              return <p className="text-xxs lg:text-xs">{item.data}</p>;
            })
          ) : (
            <>
              <p className="text-xxs lg:text-xs">English: Native</p>
              <p className="text-xxs lg:text-xs">Spanish: Proficient</p>
              <p className="text-xxs lg:text-xs">French: Advanced</p>
            </>
          )}
      </div>

      <div className="sm:w-2/3 w-[65%] px-4 py-2 text-black">
        <section className="mb-4">
          <h2 className="text-xs lg:text-base font-semibold bg-yellow-100 p-1 mb-1">
            WORK EXPERIENCE
          </h2>
          {ExperienceData && ExperienceData[0].company
            ? ExperienceData.map((item) => {
            
                return (
                  <div key={item.index} className="mb-2 ml-2">
                    <h3 className="font-semibold text-xxs lg:text-sm">
                      {item.company} |{" "}
                      {item.startdate
                        ? new Date(item.startdate).getFullYear().toString()
                        : "N/A"}{" "}
                      -{" "}
                      {item.enddate
                        ? new Date(item.enddate).getFullYear().toString()
                        : "N/A"}
                    </h3>
                    <p className="italic text-xxs lg:text-xs">{item.position}</p>
                    <p className="text-xxs lg:text-sm ">{item.summary}</p>
                  </div>
                );
              })
            : Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <h3 className="font-semibold text-xxs lg:text-sm">
                        THE VIRGINIAN PILOT | 20XX – 20XX
                      </h3>
                      <p className="italic text-xxs lg:text-xs">Journalist, Norfolk</p>
                      <ul className="list-disc list-inside text-xxs lg:text-xs">
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
         <h2 className="text-xs lg:text-base font-semibold bg-yellow-100 p-1 mb-1">
            EDUCATION
          </h2> 
          {EducationData &&EducationData[0].degree
            ? EducationData.map((item) => {
                return (
                  <div className="mb-1" key={item.index}>
                    <p className="font-semibold text-xxs lg:text-xs">
                      {item.degree} |{" "}
                      {item.date
                        ? new Date(item.date).getFullYear().toString()
                        : "N/A"}
                    </p>
                    <p className="font-semibold text-xxs lg:text-xs">University: {item.university}</p>
                    <p className="italic text-xxs lg:text-xs">Location: {item.location}</p>
                  </div>
                );
              })
            : Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <p className="font-semibold text-xxs lg:text-xs">
                        20XX-20XX | Seattle - Washington
                      </p>
                      <p className="font-semibold text-xxs lg:text-xs">
                        Masters Digital Communication
                      </p>
                      <p className="italic text-xxs lg:text-xs">University of Washington</p>
                    </div>
                  );
                })}
        </section>
      </div>
    </div>
  );
})
 export default Template;