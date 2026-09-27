import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function Icon({ viewBox, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path d="M10 2.533a.8.8 0 0 1 .8.8V9.2h5.866a.8.8 0 1 1 0 1.6H10.8v5.866a.8.8 0 1 1-1.6 0V10.8H3.333a.8.8 0 0 1 0-1.6H9.2V3.333a.8.8 0 0 1 .8-.8" />
    </Icon>
  )
}

export function MicrophoneIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M18.585 13.412a.9.9 0 0 1 1.668.676 8.91 8.91 0 0 1-7.353 5.516V22a.9.9 0 0 1-1.8 0v-2.396a8.91 8.91 0 0 1-7.352-5.516.9.9 0 0 1 1.668-.676 7.104 7.104 0 0 0 13.169 0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.35a4.9 4.9 0 0 1 4.9 4.9v4.483a4.9 4.9 0 0 1-9.8 0V6.25a4.9 4.9 0 0 1 4.9-4.9m0 1.8a3.1 3.1 0 0 0-3.1 3.1v4.483a3.1 3.1 0 1 0 6.2 0V6.25a3.1 3.1 0 0 0-3.1-3.1"
      />
    </Icon>
  )
}

export function VoiceIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M10 3.1a.9.9 0 0 1 .9.9v16a.9.9 0 0 1-1.8 0V4a.9.9 0 0 1 .9-.9M15 5.6a.9.9 0 0 1 .9.9v10a.9.9 0 0 1-1.8 0v-10a.9.9 0 0 1 .9-.9M5 8.6a.9.9 0 0 1 .9.9v5a.9.9 0 0 1-1.8 0v-5a.9.9 0 0 1 .9-.9M20 9.1a.9.9 0 0 1 .9.9v4a.9.9 0 0 1-1.8 0v-4a.9.9 0 0 1 .9-.9" />
    </Icon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path d="M12.629 5.879a.525.525 0 1 1 .742.742l-4.765 4.765a.86.86 0 0 1-1.212 0L2.629 6.62a.525.525 0 1 1 .742-.742L8 10.508z" />
    </Icon>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path d="M5.962 11.629a.525.525 0 1 0 .743.742l3.764-3.765a.86.86 0 0 0 0-1.212L6.705 3.629a.525.525 0 1 0-.743.742L9.592 8z" />
    </Icon>
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path d="M8.343 1.713c.695-.694 1.912-.043 1.67.95l-.686 2.833h3.267c.978 0 1.51 1.143.88 1.89l-5.751 6.83c-.68.807-1.985.146-1.737-.88l.687-2.832H3.406c-.977 0-1.51-1.143-.88-1.89l5.751-6.83zM3.329 9.29a.1.1 0 0 0 .077.164h3.617c.501 0 .87.47.752.958l-.718 2.964L12.67 6.71a.1.1 0 0 0-.077-.164H8.978a.775.775 0 0 1-.753-.958l.717-2.965z" />
    </Icon>
  )
}

export function ResetIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path d="M8 1.641a6.359 6.359 0 1 1-6.2 7.772.526.526 0 1 1 1.023-.233A5.309 5.309 0 1 0 8 2.692 5.3 5.3 0 0 0 3.302 5.53H4.76a.525.525 0 0 1 0 1.05H2.167a.525.525 0 0 1-.526-.525V3.14a.526.526 0 0 1 1.051 0V4.5A6.35 6.35 0 0 1 8 1.641" />
    </Icon>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path d="M10 10.168a1.499 1.499 0 0 1 .665 2.84v1.159a.666.666 0 0 1-1.33 0v-1.16A1.498 1.498 0 0 1 10 10.169" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.835a4.83 4.83 0 0 1 4.831 4.832v.22a3.066 3.066 0 0 1 2.5 3.013v5.2a3.065 3.065 0 0 1-3.064 3.065H5.734A3.066 3.066 0 0 1 2.668 15.1V9.9c0-1.5 1.078-2.747 2.5-3.012v-.221A4.83 4.83 0 0 1 10 1.835m-4.266 6.33c-.959 0-1.736.777-1.736 1.735v5.2c0 .958.777 1.735 1.736 1.735h8.533c.958 0 1.734-.777 1.734-1.735V9.9c0-.958-.776-1.735-1.734-1.735zm4.266-5a3.5 3.5 0 0 0-3.502 3.502v.168h7.003v-.168a3.5 3.5 0 0 0-3.5-3.502"
      />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path d="M12.722 2.997a.524.524 0 0 1 .864.595L7.2 12.847a.625.625 0 0 1-.956.09L2.46 9.18a.525.525 0 0 1 .74-.745l3.423 3.397z" />
    </Icon>
  )
}
