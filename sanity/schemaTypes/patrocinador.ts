import { defineField, defineType } from "sanity";

export default defineType({
  name: "patrocinador",
  title: "Patrocinador",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "numero_telefono",
      title: "Número telefónico",
      type: "number",
    }),
  ],
});
