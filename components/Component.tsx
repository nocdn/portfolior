import { motion } from "motion/react"

export function Component({
  title,
  description,
  imgURL,
}: {
  title: string
  description: string
  imgURL: string
}) {
  return (
    <motion.div
      key={0}
      className="flex items-center gap-3 mr-12"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      exit={{ opacity: 0, x: 40, filter: "blur(3px)" }}
    >
      <img
        src={imgURL}
        alt={title}
        className="max-w-[200px] max-h-[300px] rounded-xl border border-gray-200"
      />
      <div className="flex flex-col gap-1 mb-auto">
        <p
          className="self-start font-inter text-[15px]"
          //   style={{
          //     fontFamily: "PP Neue Montreal",
          //     fontWeight: 500,
          //     lineHeight: "32px",
          //     fontSize: "17px",
          //   }}
        >
          {title}
        </p>
        <p className="mb-auto text-[15px] font-inter font-normal">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
