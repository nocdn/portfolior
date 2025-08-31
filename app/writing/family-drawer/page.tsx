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
        It feels like whenever the topic of animations (whether that is web or
        otherwise) comes up, the{" "}
        <a href="https://family.co/" target="_blank" className="article-link">
          Family App
        </a>{" "}
        is front and center of all the examples. And for good reason.
      </p>
    </>
  )
}
