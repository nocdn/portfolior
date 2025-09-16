import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recreating the Family Drawer",
  description: "My recreation of the Family Drawer",
}

export default function FamilyDrawerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
