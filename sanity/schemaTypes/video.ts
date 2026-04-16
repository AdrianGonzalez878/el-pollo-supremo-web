import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video_url",
      title: "URL del video",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "plataforma",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "YouTube" },
          { title: "Facebook", value: "Facebook" },
        ],
        layout: "radio",
      },
      initialValue: "YouTube",
    }),
    defineField({
      name: "miniatura_manual",
      title: "Miniatura personalizada (opcional)",
      description:
        "YouTube: se usa la miniatura del enlace automáticamente. Facebook: también, si Meta lo permite. Solo sube imagen si quieres sustituir la automática.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categoria_video",
      title: "Categoría del video",
      type: "videoCategoria",
      description: "Pertenece solo a este video; mismo nombre en varios videos = misma sección en la web.",
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Publicado",
      type: "datetime",
    }),
  ],
});
