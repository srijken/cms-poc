// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  // Local development - use git provider with filesystem
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "imageCarousel",
                label: "Image Carousel",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Carousel Title"
                  },
                  {
                    type: "object",
                    name: "images",
                    label: "Images",
                    list: true,
                    fields: [
                      {
                        type: "image",
                        name: "src",
                        label: "Image"
                      },
                      {
                        type: "string",
                        name: "alt",
                        label: "Alt Text"
                      },
                      {
                        type: "string",
                        name: "caption",
                        label: "Caption"
                      }
                    ]
                  }
                ]
              },
              {
                name: "quote",
                label: "Quote",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Quote Content"
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author"
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Author Role/Title"
                  },
                  {
                    type: "string",
                    name: "source",
                    label: "Source"
                  }
                ]
              }
            ]
          }
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return `/${document._sys.filename}`;
          }
        }
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "imageCarousel",
                label: "Image Carousel",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Carousel Title"
                  },
                  {
                    type: "object",
                    name: "images",
                    label: "Images",
                    list: true,
                    fields: [
                      {
                        type: "image",
                        name: "src",
                        label: "Image"
                      },
                      {
                        type: "string",
                        name: "alt",
                        label: "Alt Text"
                      },
                      {
                        type: "string",
                        name: "caption",
                        label: "Caption"
                      }
                    ]
                  }
                ]
              },
              {
                name: "quote",
                label: "Quote",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Quote Content"
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author"
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Author Role/Title"
                  },
                  {
                    type: "string",
                    name: "source",
                    label: "Source"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
