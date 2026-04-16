import { defineField, defineType } from "sanity";

/** Objeto anidado dentro de cada video (no es un documento suelto). */
export default defineType({
  name: "videoCategoria",
  title: "Categoría",
  type: "object",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la categoría",
      type: "string",
      description: "Ej.: Highlights, Entrevistas, Torneos… Agrupa la videoteca por este nombre.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
