const FS = require("fs");
const PATH = require("path");
const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient();

(async () => {
  console.log(__dirname);

  // Read all directories in the current folder
  // @ts-ignore
  let folders = FS.readdirSync(__dirname).filter((file) =>
    FS.statSync(PATH.join(__dirname, file)).isDirectory()
  );

  // Iterate over each folder
  for (const folder of folders) {
    try {
      // Read metadata.json file
      let metadata = FS.readFileSync(
        PATH.join(__dirname, folder, "metadata.json"),
        "utf8"
      );
      let metadataObj = JSON.parse(metadata);

      // Upsert data for the 'template' table
      await prisma.template.upsert({
        where: { id: parseInt(metadataObj.id) },
        update: {
          name: metadataObj.name,
          thumbnail: metadataObj.thumbnail,
          description: metadataObj.description,
          category: metadataObj.category,
        },
        create: {
          id: parseInt(metadataObj.id),
          name: metadataObj.name,
          thumbnail: metadataObj.thumbnail,
          description: metadataObj.description,
          category: metadataObj.category,
        },
      });

      // Upsert data for the 'templateMetaData' table
      await prisma.templateMetaData.upsert({
        where: { id: parseInt(metadataObj.metaData.id) },
        update: {
          templateId: parseInt(metadataObj.metaData.id),
          PersonalInformation: metadataObj.metaData.PersonalInformation,
          Education: metadataObj.metaData.Education,
          Skills: metadataObj.metaData.Skills,
          Experience: metadataObj.metaData.Experience,
          Projects: metadataObj.metaData.Projects,
          Certifications: metadataObj.metaData.Certifications,
          Awards: metadataObj.metaData.Awards,
          Languages: metadataObj.metaData.Languages,
          Hobbies: metadataObj.metaData.Hobbies,
          References: metadataObj.metaData.References,
        },
        create: {
          id: parseInt(metadataObj.metaData.id),
          templateId: parseInt(metadataObj.metaData.id),
          PersonalInformation: metadataObj.metaData.PersonalInformation,
          Education: metadataObj.metaData.Education,
          Skills: metadataObj.metaData.Skills,
          Experience: metadataObj.metaData.Experience,
          Projects: metadataObj.metaData.Projects,
          Certifications: metadataObj.metaData.Certifications,
          Awards: metadataObj.metaData.Awards,
          Languages: metadataObj.metaData.Languages,
          Hobbies: metadataObj.metaData.Hobbies,
          References: metadataObj.metaData.References,
        },
      });

      console.log(`Processed folder: ${folder}`);
    } catch (error) {
      console.error(`Error processing folder ${folder}:`, error);
    }
  }

  // Disconnect Prisma client
  await prisma.$disconnect();
})();
