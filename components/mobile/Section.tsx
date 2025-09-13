export function MobileSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col gap-2 p-8 text-[24px] font-medium h-screen justify-end"
      style={{
        fontFamily: "PP, Inter, sans-serif",
        fontWeight: 500,
        lineHeight: "30px",
        fontSize: "20px",
      }}
    >
      <span className="font-mono text-gray-500/60 text-[17px] font-semibold relative mb-1 flex items-center">
        {title}
      </span>
      {children}
    </div>
  )
}
