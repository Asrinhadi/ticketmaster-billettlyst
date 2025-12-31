import { createClient } from "@sanity/client";



export const sanityClient = createClient({
  projectId: "bbdw0p64",
  dataset: "production",
  apiVersion: "2025-12-21",
  useCdn: true,
});