import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
  # This is my first post
  
  Isn't it great?
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
    },
    {
      slug: "my-second-post",
      title: "My second Post",
      markdown: `
      # Inerti herbas qua si illi digitos

      ## Vox patrio gutture per
      
      **Lorem markdownum** multa Siculo et et valle visus, *qui amat*. Nova cervi,
      animas perde tendentemque subitus delet, nec rex: tortilis dedisti Iasone haesit
      et cepi excita. Occasus **quoniam**, qua isto non deos *admovit Aesoniden
      fortunaque* locutum. Vidi tua pelle addenda male talibus patrias dixit mea,
      cupiam Phaethon, imago? Est fit te corrige ductum: huc sequitur; egerat sed sua
      sit pars.
      
      ## Coacti amat
      
      Aquis medio his frenisque massa haerent. Quae aequi habet, Scylla ritu tamen est
      in, Charybdin ficti. Fieretque iuvenum septem voluntas lumen conscia, pati
      nulla? Deae ursi semperque auctore, Oechalia quaerit explorant quibus gramen
      multorumque sine; ligavit.
      
      > Porrigeret quamvis legit verba puppibus motisque insanis qui qua, poplite
      > adulterium ductum alite. Toro inscribit domoque vittis re armenti *terras*
      > indiciique Pholus, exturbare colubrae auxiliumque partu rursusque formaque?
      > Accipe dicta linguis sortemque Palladios et *placuerunt Turnus*. Ossa herbas,
      > et quaerit nocte.
      
      ## Post mora
      
      Incipit Calydonia Minos haec inter petunt natura Siculaeque ubera salutat causa,
      difficilem responsa quod artis. Cadet vates et rostro, animavit et adsunt filis
      **quam** Simois.
      
      Nunc nervo annos [glandes lunaria
      cecidisse](http://dare-illi.org/potentiapedibus) nostraque inmodico: sacra it
      munera. [Cumarum caecos](http://etvale.io/atria-sim.html); ducit pulsat
      antiquarum vellera posterior nomine non anno est quasi, **divulsaque**.
      
      ## Volucres illas
      
      Nec tenuere magna prima mollierant tenens pontum. Cura casusve celsum pervenit
      tenebat, geminos: deprensa nec erat nymphas est rumor, tenet non, morari, ora?
      
          property_pcmcia(windows_hot, typefaceMiddleware(parity, dlc, nosql_soap),
                  bit(bar_java_jsp(radcabServer, -3, disk), nybble.vrml_export_volume(
                  1)));
          var text = remote_metadata(registry_macro.nybble_cyberspace_portal(1,
                  power_control_sidebar));
          desktop_lock_play /= jpeg_cd;
          var input_horizontal_word = guid - macroGamma(cifs_leaderboard);
      
      Est corpus. Laetitiam desint dextram.
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
      author: "Neil",
      isFeatured: true,
    },
    {
      slug: "my-third-post",
      title: "My third Post",
      markdown: `
  # This is my third post
  
  Isn't it great?
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
      author: "Neil",
      isFeatured: true,
    },
    {
      slug: "my-fourth-post",
      title: "My fourth Post",
      markdown: `
  # This is my fourth post
  
  Isn't it great?
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
      author: "Neil",
      isFeatured: true,
    },
    {
      slug: "my-fifth-post",
      title: "My fifth Post",
      markdown: `
  # This is my fifth post
  
  Isn't it great?
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
      author: "Neil",
      isFeatured: true,
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
  # 90s Mixtape
  
  - I wish (Skee-Lo)
  - This Is How We Do It (Montell Jordan)
      `.trim(),
      description: "Desc",
      image: "/images/blog/1.jpg",
      tags: "{ tags: ['FreedomBox'] }",
      author: "Neil",
      isFeatured: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
