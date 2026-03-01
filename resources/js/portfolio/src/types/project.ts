export type ProjectCategory = {
  id: number
  name: string
  slug: string
}

export type Skill = {
  id: number
  name: string
  icon?: string | null
}

export type Project = {
  id: number
  title: string
  description: string
  thumbnail_url: string | null
  demo_url: string | null
  project_category_id: number | null
  category?: ProjectCategory
  skills?: Skill[]
}
