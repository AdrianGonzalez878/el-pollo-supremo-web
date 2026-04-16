import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "hero_image",
      title: "Imagen hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "flyer_torneo",
      title: "Flyer del torneo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
