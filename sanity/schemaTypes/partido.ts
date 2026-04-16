import { defineField, defineType } from "sanity";

export default defineType({
  name: "partido",
  title: "Partido / Merce",
  type: "document",
  fields: [
    defineField({
      name: "tournament",
      title: "Torneo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "location", title: "Lugar", type: "string" }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Hora (ej. 18:00)",
      type: "string",
      description: "Texto como en Strapi, p. ej. 18:00:00 o 18:00",
    }),
    defineField({ name: "merce_link", title: "Enlace a la Merce", type: "url" }),
    defineField({
      name: "premios",
      title: "Premios (Markdown)",
      type: "text",
      description:
        "Podés pegar en una sola línea: 1-$8,000 2-$6,000 3-$4,000 (se verá como lista). O markdown: cada premio en renglón con 1. **$8,000**",
    }),
    defineField({ name: "equipo_ganador", title: "Equipo ganador", type: "string" }),
  ],
});
