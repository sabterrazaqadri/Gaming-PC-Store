// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: '9qdbtzuv', // ✅ replace with your actual ID
  dataset: 'production',
  apiVersion: '2023-07-15',
  useCdn: true,
}

export const sanityClient = createClient(config)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => imageUrlBuilder(config).image(source).url()
