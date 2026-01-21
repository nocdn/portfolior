export function MobileSection({
  id,
  title,
  children,
  secondaryChildren,
}: {
  id?: string
  title: string
  children: React.ReactNode
  secondaryChildren?: React.ReactNode
}) {
  return (
    <div
      id={id}
      className="flex flex-col gap-2 p-8 pb-[calc(env(safe-area-inset-bottom)+2rem)] text-[24px] font-medium h-[100svh] justify-end"
      style={{
        fontFamily: "var(--font-pp-neue-montreal), Inter, sans-serif",
        fontWeight: 500,
        lineHeight: "30px",
        fontSize: "20px",
      }}
    >
      <div className="font-mono text-gray-500/60 text-[17px] font-semibold relative mb-1 flex items-center">
        {title}
        <div className="flex items-center gap-2 ml-auto">
          {secondaryChildren}
        </div>
      </div>
      {children}
    </div>
  )
}
