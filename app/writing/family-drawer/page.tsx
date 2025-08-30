import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recreating the Family Drawer",
  description: "My recreation of the Family Drawer",
}

export default function FamilyDrawer() {
  return (
    <>
      <h1
        className="mb-2 w-full text-lg font-medium font-inter"
        id="recreating-the-family-drawer"
      >
        Recreating the Family Drawer
      </h1>
      <p className="leading-relaxed text-gray-800 text-[17px]">
        I've been using the Family Drawer for a while now, and I've always
        wanted to recreate it. I've been using the Family Drawer for a while
        now, and I've always wanted to recreate it. I've been using the Family
        Drawer for a while now, and I've always wanted to recreate it.
      </p>
    </>
  )
}
