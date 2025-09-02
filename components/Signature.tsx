import React, { useEffect, useState } from "react"

// Type Definitions
type LetterCase = "up" | "lo"

interface BaseLetterData {
  pathD: string
  viewBox: string
  width: number
  height: number
  dasharray: number
  margin: string
  caseClass: LetterCase
}

interface SpaceLetterData {
  isSpace: true
  margin: string
}

type LetterDatum = BaseLetterData | SpaceLetterData

interface DisplayedLetter {
  id: number
  char: string
  data: LetterDatum
  animate: boolean
}

export interface SignatureProps {
  nameToSign?: string
  strokeColor?: string
  letterAppearDelay?: number
  animationDuration?: number
}

// Component Implementation
export default function Signature({
  nameToSign = "Bak",
  strokeColor = "black",
  letterAppearDelay = 80,
  animationDuration = 250,
}: SignatureProps) {
  const [displayedLetters, setDisplayedLetters] = useState<DisplayedLetter[]>(
    []
  )

  useEffect(() => {
    setDisplayedLetters([])
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cumulativeDelay = 0

    for (let i = 0; i < nameToSign.length; i++) {
      const char = nameToSign[i]
      const isUpperCase = char === char.toUpperCase() && char !== " "
      const key = char === " " ? " " : isUpperCase ? char : char.toLowerCase()
      const caseSuffix = char === " " ? "" : isUpperCase ? "_up" : "_lo"
      const letterKey = char === " " ? " " : `${key}${caseSuffix}`
      const data = lettersData[letterKey]

      const appearDelay = data
        ? letterAppearDelay
        : Math.floor(letterAppearDelay / 2)

      const t1 = setTimeout(() => {
        const newLetter: DisplayedLetter = {
          id: i,
          char,
          data,
          animate: false,
        }
        setDisplayedLetters((prev) => [...prev, newLetter])

        const t2 = setTimeout(() => {
          setDisplayedLetters((prev) =>
            prev.map((l) => (l.id === i ? { ...l, animate: true } : l))
          )
        }, 10)
        timeouts.push(t2)
      }, cumulativeDelay)

      timeouts.push(t1)
      cumulativeDelay += appearDelay

      if (!data) {
        console.warn(`Letter data for "${char}" (${letterKey}) not found`)
      }
    }

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [nameToSign, letterAppearDelay, animationDuration])

  return (
    <div className="signature-main">
      {displayedLetters.map((letter) => {
        if ("isSpace" in letter.data) {
          return (
            <div
              key={letter.id}
              className="space"
              style={{ margin: letter.data.margin }}
            />
          )
        }

        return (
          <div
            key={letter.id}
            className={`${letter.data.caseClass} ${letter.char.toLowerCase()} ${
              letter.animate ? "animate-in" : ""
            }`}
            style={
              {
                "--dasharray": letter.data.dasharray,
                "--stroke-color": strokeColor,
                "--duration": `${animationDuration}ms`,
                margin: letter.data.margin,
              } as React.CSSProperties
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox={letter.data.viewBox}
              height={letter.data.height}
              width={letter.data.width}
            >
              <path d={letter.data.pathD} />
            </svg>
          </div>
        )
      })}

      <style>{`
        .signature-main {
          display: flex;
          min-height: 51px;
          flex-flow: wrap;
          justify-content: start;
          padding-bottom: 5px;
          overflow: hidden;
          width: fit-content;
          position: relative;
          box-sizing: border-box;
          padding: 0 12px;
        }
        
        .signature-main > div:not(.space) {
          max-height: 51px;
          line-height: 0;
          position: relative;
          box-sizing: border-box;
        }
        
        .signature-main svg path {
          stroke-linejoin: round;
          stroke-linecap: round;
          stroke-width: 1.5;
          stroke: var(--stroke-color, #1a1a1a);
          fill: none;
          stroke-dasharray: var(--dasharray);
          stroke-dashoffset: var(--dasharray);
          transition: stroke-dashoffset var(--duration, 250ms) ease-out;
        }
        
        .signature-main > div.animate-in svg path {
          stroke-dashoffset: 0;
        }
        
        .space {
          display: inline-block;
          height: 51px;
          vertical-align: bottom;
          box-sizing: border-box;
        }
        
        @media (prefers-color-scheme: dark) {
          .signature-main svg path {
            stroke: #ffffff;
          }
        }
      `}</style>
    </div>
  )
}

// Type-checked Letter Data
const lettersData: Record<string, LetterDatum> = {
  A_up: {
    pathD:
      "M14.9987 32.0003C20.8769 23.2406 40.7942 1.02295 44.6176 1.58265C48.4411 2.14235 25.4397 26.0685 19.6688 50.0398C28.2839 11.7157 5.83642 32.6888 1.46688 33.1804C4.63512 27.4831 32.8719 20.946 44.7496 24.6628",
    viewBox: "0 0 46 51",
    width: 46,
    height: 51,
    dasharray: 190,
    margin: "0 -10px 0 -7px",
    caseClass: "up",
  },
  B_up: {
    pathD:
      "M25.7369 6.82933C16.1889 19.6519 13.2127 26.1056 8.11585 37.5574C21.5374 6.58445 41.1497 1.82882 45.1601 3.92338C52.3423 8.2922 18.8269 29.8371 17.6306 27.2038C16.4343 24.5705 38.5178 23.6728 37.9785 29.4181C36.1831 44.0806 -7.20643 55.631 2.96733 40.4898C7.27648 33.1286 25.3502 33.1885 27.7453 35.702",
    viewBox: "0 0 47 51",
    width: 47,
    height: 51,
    dasharray: 230,
    margin: "0 -5px 0 -13px",
    caseClass: "up",
  },
  C_up: {
    pathD:
      "M35.1522 7.2324C38.1612 -9.90171 5.01684 18.1833 1.44481 44.1581C-0.863382 60.9427 22.8446 32.2692 28.2295 28.4927",
    viewBox: "0 0 37 51",
    width: 37,
    height: 51,
    dasharray: 101,
    margin: "0 -5px 0 -6px",
    caseClass: "up",
  },
  D_up: {
    pathD:
      "M26.5606 9.18304C16.6848 26.0062 3.378 46.7523 1.89258 45.5634C-3.1006 40.6888 26.7398 2.16864 41.7793 5.25978C51.1122 6.68653 19.6065 49.6651 9.26293 46.2174C4.62623 44.3152 20.0819 27.7895 31.6737 29.9295",
    viewBox: "0 0 45 51",
    width: 45,
    height: 51,
    dasharray: 194,
    margin: "0 -6px 0 -6px",
    caseClass: "up",
  },
  E_up: {
    pathD:
      "M38.6505 10.5127C38.6505 10.5127 50.1156 2.77326 42.1993 4.69163C34.283 6.61 7.29611 24.5362 9.21359 27.9759C11.1311 31.4157 26.8097 26.7853 26.8097 26.7853C12.5763 31.9276 -0.576393 42.3963 1.21022 45.8361C2.99682 49.2758 27.2051 38.229 27.2051 38.229",
    viewBox: "0 0 46 51",
    width: 46,
    height: 51,
    dasharray: 132,
    margin: "0 -10px 0 -8px",
    caseClass: "up",
  },
  F_up: {
    pathD:
      "M3.99414 15.4999C18.0539 7.88344 40.9941 2.5 58.4941 4.49991C15.9941 5.5 23.4941 9 1.49414 47.4999C4.49414 33.5 3.99414 25.5 43.9941 22.9999",
    viewBox: "0 0 60 51",
    width: 60,
    height: 51,
    dasharray: 191,
    margin: "0 -13px 0 -5px",
    caseClass: "up",
  },
  G_up: {
    pathD:
      "M37.4677 13.6689C40.3847 3.01441 37.7852 1.4925 29.7299 4.91693C7.78844 14.6201 -4.26276 42.3972 4.55267 46.0754C13.3681 49.7537 42.3496 30.9185 34.1686 26.4792C29.0318 23.8791 9.56239 45.1242 14.3821 47.6611",
    viewBox: "0 0 40 51",
    width: 40,
    height: 51,
    dasharray: 145,
    margin: "0 0px 0 -6px",
    caseClass: "up",
  },
  H_up: {
    pathD:
      "M35.957 3.99976C23.1235 22.025 18.442 31.2217 10.457 47.4998C26.957 5.99983 30.457 37.5 52.957 7.5C33.957 29.4998 32.957 37.6924 29.457 38.5C25.957 39.3076 0.957031 32.5 0.957031 29.4998C23.1446 22.8906 34.5662 20.6514 50.957 22.4998",
    viewBox: "0 0 54 51",
    width: 54,
    height: 51,
    dasharray: 235,
    margin: "0 -8px 0 -6px",
    caseClass: "up",
  },
  I_up: {
    pathD:
      "M16.7648 9.03851C21.8129 5.77875 25.3024 4.00811 47.421 2.22626C35.7012 1.49995 34.274 -0.0548382 21.4876 22.9726C8.70118 45.9999 13.2012 40 1.2832 48.9828C3.36519 44.9656 17.2012 40.4999 23.7334 42.0158",
    viewBox: "0 0 49 51",
    width: 49,
    height: 51,
    dasharray: 128,
    margin: "0 -25px 0 -16px",
    caseClass: "up",
  },
  J_up: {
    pathD:
      "M5.91946 15.5C13.9195 9.49996 30.9194 3.38158 51.4194 4.99996C41.4194 -5.99996 36.9194 7.49985 26.4195 22C15.9195 36.5001 11.9204 40.4999 5.92029 45C-5.57979 53.6248 6.91943 32.5002 18.9197 21.0001C30.9199 9.5 15.9195 31.5 15.9195 31.5",
    viewBox: "0 0 53 51",
    width: 53,
    height: 51,
    dasharray: 174,
    margin: "0 -24px 0 -6px",
    caseClass: "up",
  },
  K_up: {
    pathD:
      "M30.6585 5.69873C20.8873 19.471 15.4101 28.7219 5.65848 46.1987C22.4604 13.4133 39.6585 11.6987 53.1585 9.69873C64.6585 8.19873 51.1585 20.1987 51.1585 20.1987C80.6585 -7.30127 -1.22332 24.1987 1.15848 37.6987C2.39349 44.6987 37.1585 35.6987 37.1585 35.6987",
    viewBox: "0 0 59 51",
    width: 59,
    height: 51,
    dasharray: 244,
    margin: "0 -23px 0 -3px",
    caseClass: "up",
  },
  L_up: {
    pathD:
      "M28.5059 3.6123C19.5058 9.1123 -1.12359 39.6123 1.00666 46.6123C2.22398 50.6123 28.5059 38.6123 28.5059 38.6123",
    viewBox: "0 0 30 51",
    width: 30,
    height: 51,
    dasharray: 83,
    margin: "0 -7px 0 -5px",
    caseClass: "up",
  },
  M_up: {
    pathD:
      "M1.48242 48.3176C8.1298 31.8088 14.4004 21.838 29.9824 2.81763C29.9824 2.81763 10.9824 34.8176 17.4824 37.8176C22.4824 40.1253 47.4824 9.31763 47.4824 9.31763C34.5795 28.6674 30.1369 37.0839 29.4824 45.8176",
    viewBox: "0 0 49 51",
    width: 49,
    height: 51,
    dasharray: 176,
    margin: "0 -7px 0 -10px",
    caseClass: "up",
  },
  N_up: {
    pathD:
      "M1.73633 45.7104C2.46255 39.6904 11.2363 23.2104 19.7363 14.2104C17.7363 36.7104 21.3778 43.3814 24.7363 43.2104C28.0949 43.0395 33.0666 31.1917 43.2363 5.21045",
    viewBox: "0 0 45 51",
    width: 45,
    height: 51,
    dasharray: 111,
    margin: "0 -4px 0 -10px",
    caseClass: "up",
  },
  O_up: {
    pathD:
      "M19.2264 13.6837C12.2264 15.1837 -0.773614 43.6837 6.72639 46.1837C14.2264 48.6837 43.2258 13.6837 28.7272 5.68376C13.2266 -2.86957 -2.2744 33.1838 2.22656 40.6838C6.72753 48.1839 20.7264 29.6837 20.7264 29.6837",
    viewBox: "0 0 34 51",
    width: 34,
    height: 51,
    dasharray: 167,
    margin: "0 -1px 0 -1px",
    caseClass: "up",
  },
  P_up: {
    pathD:
      "M6.17969 47.4213C13.346 34.4334 17.26 27.7753 26.1804 13.4212C15.6807 22.9212 7.17969 26.4211 1.17969 30.4214C15.1797 10.4213 55.1797 -3.07861 50.1799 7.42125C45.1801 17.9211 24.6017 34.3749 19.6797 37.4214C7.56237 44.9214 28.6797 21.4214 35.1797 24.9213",
    viewBox: "0 0 52 51",
    width: 52,
    height: 51,
    dasharray: 203,
    margin: "0 -12px 0 -3px",
    caseClass: "up",
  },
  Q_up: {
    pathD:
      "M33.1765 13.6025C25.1765 0.102458 -5.32345 39.1026 10.1765 43.6025C21.6765 46.6025 45.4375 13.6025 39.1765 4.60246C31.1766 -6.89746 -5.82409 18.6025 3.17655 31.6024C10.7926 42.6025 22.1589 20.9042 26.1758 27.6025C27.6751 30.1026 27.1751 49.6026 38.6758 44.6025",
    viewBox: "0 0 41 51",
    width: 41,
    height: 51,
    dasharray: 212,
    margin: "0 -3px 0 -3px",
    caseClass: "up",
  },
  R_up: {
    pathD:
      "M12.0195 45.3685C19.1859 32.3806 23.0999 25.7226 32.0203 11.3685C21.5205 20.8685 5.01953 34.2139 1.01953 30.7139C6.01953 17.2138 71.5195 -7.28639 53.5188 13.7136C43.6613 25.2136 12.0195 41.7136 14.0195 38.2136C37.0871 17.3054 32.9838 44.188 46.7608 39.6997",
    viewBox: "0 0 58 51",
    width: 58,
    height: 51,
    dasharray: 235,
    margin: "0 -8px 0 -4px",
    caseClass: "up",
  },
  S_up: {
    pathD:
      "M44.435 9.39728C49.435 -5.10286 -4.56457 25.3972 1.43476 32.8973C6.23411 38.8972 25.0605 38.3972 24.4355 40.8972C23.8105 43.3972 10.9355 44.8972 7.93479 42.8973",
    viewBox: "0 0 46 51",
    width: 46,
    height: 51,
    dasharray: 100,
    margin: "0 -14px 0 -2px",
    caseClass: "up",
  },
  T_up: {
    pathD:
      "M1.31836 20.8976C6.45115 13.0499 39.3184 2.39746 60.3184 4.8976C33.3184 4.8976 36.3184 8.89746 14.3184 46.8976",
    viewBox: "0 0 62 51",
    width: 62,
    height: 51,
    dasharray: 133,
    margin: "0 -29px 0 -17px",
    caseClass: "up",
  },
  U_up: {
    pathD:
      "M15.1867 11.5769C8.1875 11.5769 -2.81417 40.0769 3.68673 41.0769C10.1876 42.0769 42.6867 5.0769 42.6867 5.0769C42.6867 5.0769 17.1875 43.5769 23.6867 46.5769",
    viewBox: "0 0 44 51",
    width: 44,
    height: 51,
    dasharray: 136,
    margin: "0 -10px 0 -1px",
    caseClass: "up",
  },
  V_up: {
    pathD:
      "M17.7137 11.0771C1.95501 41.7408 0.214021 47.5771 2.71479 48.0771C5.21556 48.5771 21.7148 24.0771 39.2137 3.07715",
    viewBox: "0 0 41 51",
    width: 41,
    height: 51,
    dasharray: 100,
    margin: "0 -15px 0 -6px",
    caseClass: "up",
  },
  W_up: {
    pathD:
      "M24.8836 9.06641C19.8837 9.06641 -2.11633 44.0664 1.88364 44.5664C5.88362 45.0664 29.8828 9.06641 32.3836 10.0664C32.3836 12.5664 26.8828 38.0664 33.3836 40.0664C39.8845 42.0664 55.8836 7.06641 55.8836 7.06641",
    viewBox: "0 0 57 51",
    width: 57,
    height: 51,
    dasharray: 163,
    margin: "0 -8px 0 -6px",
    caseClass: "up",
  },
  X_up: {
    pathD:
      "M39.293 8.5227C23.1329 20.8029 15.0268 30.1783 0.792969 47.5227C20.8836 24.5227 13.5352 35.0227 14.293 2.02271C13.7765 24.514 15.5889 33.6064 19.293 49.0227",
    viewBox: "0 0 41 51",
    width: 41,
    height: 51,
    dasharray: 153,
    margin: "0 -11px 0 -13px",
    caseClass: "up",
  },
  Y_up: {
    pathD:
      "M16.8032 1.3594C12.7184 0.602171 -1.69718 28.9308 2.30381 28.3593C6.30481 27.7879 33.8032 2.8594 33.8032 2.8594C14.0741 30.0733 5.30273 48.8594 8.80324 49.8594C12.3037 50.8594 30.3027 19.8594 6.80324 39.8594",
    viewBox: "0 0 35 51",
    width: 35,
    height: 51,
    dasharray: 162,
    margin: "0 -12px 0 2px",
    caseClass: "up",
  },
  Z_up: {
    pathD:
      "M18.4364 13.4383C15.9364 8.93822 51.9364 -1.5618 53.9364 4.43828C55.9364 10.4384 13.9362 25.9382 1.93593 44.4382C-5.52379 55.9382 31.4361 37.9382 38.9364 36.9383",
    viewBox: "0 0 55 51",
    width: 55,
    height: 51,
    dasharray: 149,
    margin: "0 -9px 0 -8px",
    caseClass: "up",
  },
  a_lo: {
    pathD:
      "M5.99958 25C5.73591 21.1582 1.99899 25.5 1.49941 28C1.00013 30.5 7.65454 23.3545 7.65454 23.3545C3.5802 27.3691 3.29278 30.5313 4.09638 30.7478C5.08629 31.0263 12.2012 24.7466 12.2012 24.7466",
    viewBox: "0 0 13 51",
    width: 13,
    height: 51,
    dasharray: 36,
    margin: "0 -4px 0 0",
    caseClass: "lo",
  },
  b_lo: {
    pathD:
      "M15.9206 5.40527L2.07203 28.8782C1.02375 28.8035 6.74541 22.7468 8.7643 23.9805C10.5595 25.4012 1.88642 33.589 1.17541 32.0187C0.464395 30.4485 9.73655 25.9621 13.9253 24.7283",
    viewBox: "0 0 17 51",
    width: 17,
    height: 51,
    dasharray: 64,
    margin: "0 -6px 0 -1.5px",
    caseClass: "lo",
  },
  c_lo: {
    pathD:
      "M5.63386 24.0707C5.12282 21.6404 0.607995 27.2758 1.82723 28.005C3.15925 28.5935 9.75939 24.6736 9.75939 24.6736",
    viewBox: "0 0 11 51",
    width: 11,
    height: 51,
    dasharray: 17,
    margin: "0 -4px 0 0",
    caseClass: "lo",
  },
  d_lo: {
    pathD:
      "M6.08732 26.1229C8.23611 18.5681 -0.331592 27.5316 1.908 28.6301C7.01852 28.6767 10.2741 20.6086 19.1923 6.23315C9.56633 22.4841 2.35848 34.2032 2.35848 34.2032",
    viewBox: "0 0 20 51",
    width: 20,
    height: 51,
    dasharray: 73,
    margin: "0 -11.3px 0 0",
    caseClass: "lo",
  },
  e_lo: {
    pathD:
      "M3.07713 25.3392C3.03314 27.7282 6.78706 24.9554 6.03999 23.505C4.44172 21.2653 -0.294204 28.3892 2.71291 28.2186C5.35941 27.9626 10.2422 24.7207 10.2422 24.7207",
    viewBox: "0 0 11 51",
    width: 11,
    height: 51,
    dasharray: 22,
    margin: "0 -4px 0 0",
    caseClass: "lo",
  },
  f_lo: {
    pathD:
      "M17.7207 13.1365C8.45405 23.5754 -1.22714 43.6967 2.45623 40.1666C6.13959 36.6365 12.1704 24.6314 8.13529 26.9287C6.46836 27.8777 12.1416 27.8273 15.3106 24.7416",
    viewBox: "0 0 19 51",
    width: 19,
    height: 51,
    dasharray: 59,
    margin: "0 -6px 0 -6px",
    caseClass: "lo",
  },
  g_lo: {
    pathD:
      "M15.8299 24.1058C14.7224 20.2293 8.05794 29.529 11.1896 27.8486C13.4811 26.531 17.2991 22.5381 17.2991 22.5381C15.8865 28.7238 1.15713 50.9628 1.47176 43.8335C1.59134 36.4678 10.0592 36.074 20.9856 24.7167",
    viewBox: "0 0 23 51",
    width: 23,
    height: 51,
    dasharray: 75,
    margin: "0 -4px 0 -10px",
    caseClass: "lo",
  },
  h_lo: {
    pathD:
      "M14.75 6.08472C8.75724 15.6124 5.74081 20.6113 1.16797 28.7222C2.27051 26.7174 7.40879 23.7648 9.19185 23.8223C10.4381 23.8798 8.46919 26.815 9.75037 27.5733C11.2054 28.4346 16.3726 24.6677 16.3726 24.6677",
    viewBox: "0 0 18 51",
    width: 18,
    height: 51,
    dasharray: 48,
    margin: "0 -4px 0 -1px",
    caseClass: "lo",
  },
  i_lo: {
    pathD:
      "M3.7548 22.9229C2.60207 23.529 -0.752212 29.5295 1.61166 28.7618C3.97553 27.994 5.61205 25.8726 7.67374 24.721",
    viewBox: "0 0 9 51",
    width: 9,
    height: 51,
    dasharray: 16,
    margin: "0 -3.5px 0 0",
    caseClass: "lo",
  },
  j_lo: {
    pathD:
      "M18.24 23.0059C16.0413 28.6829 1.71142 51.8946 1.71177 43.8826C1.62097 38.7092 9.17395 37.2442 21.5819 24.5625",
    viewBox: "0 0 23 51",
    width: 23,
    height: 51,
    dasharray: 59,
    margin: "0 -5px 0 -14px",
    caseClass: "lo",
  },
  k_lo: {
    pathD:
      "M15.7207 6.04492C9.81615 15.6875 6.702 20.8513 1.7832 29.2278C6.71346 22.5005 7.97044 24.3967 8.53371 25.0963C6.93134 22.6684 3.19642 26.693 4.13275 27.9568C5.06907 29.2205 9.96155 26.6057 13.3705 24.8444",
    viewBox: "0 0 17 51",
    width: 17,
    height: 51,
    dasharray: 54,
    margin: "0 -6.5px 0 0",
    caseClass: "lo",
  },
  l_lo: {
    pathD: "M0.800781,34.0845C7.00167,23.7712 10.562,17.889 17.543,6.64502",
    viewBox: "0 0 19 51",
    width: 19,
    height: 51,
    dasharray: 33,
    margin: "0 -12px 0 -4px",
    caseClass: "lo",
  },
  m_lo: {
    pathD:
      "M4.23047 23.5026L0.871094 29.4474C3.50472 25.5411 6.75255 22.8947 9.44272 21.6504C7.06863 25.4683 5.83806 27.9029 6.63039 28.2444C7.09897 28.3943 7.92245 27.8359 12.5443 24.6228C11.5082 26.1726 11.4655 26.753 11.9412 27.2936C12.31 27.6478 13.3286 27.1883 17.2828 24.5797",
    viewBox: "0 0 19 51",
    width: 19,
    height: 51,
    dasharray: 43,
    margin: "0 -5px 0 0",
    caseClass: "lo",
  },
  n_lo: {
    pathD:
      "M4.42188 23.1724L1.16211 28.4658C3.87099 25.9122 7.65167 23.2024 8.42922 23.7108C8.87781 23.9799 6.69468 26.9705 7.8311 27.4191C8.96753 27.8677 11.8983 25.565 14.0814 24.7575",
    viewBox: "0 0 15 51",
    width: 15,
    height: 51,
    dasharray: 27,
    margin: "0 -5px 0 0",
    caseClass: "lo",
  },
  o_lo: {
    pathD:
      "M3.30217 23.604C2.72482 23.9566 0.574341 28.3484 1.66563 28.4119C2.75692 28.4755 7.24524 21.8731 4.4886 23.027C3.29045 23.5286 2.14727 24.4054 2.14727 24.4054",
    viewBox: "0 0 7 51",
    width: 7,
    height: 51,
    dasharray: 17,
    margin: "0 -2.5px 0 0",
    caseClass: "lo",
  },
  p_lo: {
    pathD:
      "M15.0664 22.3301C8.76943 32.3849 6.19117 36.8558 1.41211 45.0713C13.0127 25.9291 12.9105 23.9189 16.1863 22.9881C24.4611 20.4162 13.3535 31.3002 12.6334 25.7561",
    viewBox: "0 0 20 51",
    width: 20,
    height: 51,
    dasharray: 67,
    margin: "0 -2.5px 0 -10px",
    caseClass: "lo",
  },
  q_lo: {
    pathD:
      "M13.2541 23.388C11.6304 20.8016 7.32619 26.9844 7.06533 28.6014C6.90881 29.619 14.3173 22.4192 14.3173 22.4192C10.93 28.6504 4.52861 38.6885 1.19336 45.3776C5.16165 38.8933 7.66029 36.0655 13.9238 36.1798",
    viewBox: "0 0 16 51",
    width: 16,
    height: 51,
    dasharray: 63,
    margin: "0 -2px 0 -6px",
    caseClass: "lo",
  },
  r_lo: {
    pathD:
      "M4.04688 23.3381L1.02539 30.1005C7.1047 22.5828 11.8527 19.8132 11.2412 24.1654",
    viewBox: "0 0 13 51",
    width: 13,
    height: 51,
    dasharray: 24,
    margin: "0 -3px 0 -1px",
    caseClass: "lo",
  },
  s_lo: {
    pathD:
      "M8.95035 23.3347C8.289 21.833 5.66489 23.7794 5.71956 28.8314C5.77422 33.8834 1.12107 35.424 0.98514 33.3617C0.883641 31.4008 3.52325 32.4975 12.6583 24.7513",
    viewBox: "0 0 14 51",
    width: 14,
    height: 51,
    dasharray: 32,
    margin: "0 -4px 0 -4px",
    caseClass: "lo",
  },
  t_lo: {
    pathD:
      "M0.966797 16.3342C6.66806 14.1572 15.5438 14.1786 22.957 15.9795C12.1532 14.4252 15.852 9.92493 18.1685 5.96021C9.87226 17.3225 -0.709346 36.7351 1.78362 36.9101C3.40185 37.0413 9.39371 29.0376 13.8793 24.8435",
    viewBox: "0 0 24 51",
    width: 24,
    height: 51,
    dasharray: 91,
    margin: "0 -12.5px 0 -3.5px",
    caseClass: "lo",
  },
  u_lo: {
    pathD:
      "M4.02467 23.277C3.02512 22.8065 0.89338 26.614 1.20215 28.0439C1.51091 29.4737 7.5177 23.0864 7.5177 23.0864C7.5177 23.0864 4.71947 27.0005 5.80301 28.3576C6.96087 28.8941 10.5935 24.8364 11.7727 24.2932",
    viewBox: "0 0 13 51",
    width: 13,
    height: 51,
    dasharray: 28,
    margin: "0 -4.5px 0 0",
    caseClass: "lo",
  },
  v_lo: {
    pathD:
      "M3.3522 23.8316C1.86784 24.4052 0.653752 28.489 0.990061 28.894C1.93472 29.1302 3.78484 26.7863 7.70664 21.334",
    viewBox: "0 0 9 51",
    width: 9,
    height: 51,
    dasharray: 17,
    margin: "0 -4.5px 0 0",
    caseClass: "lo",
  },
  w_lo: {
    pathD:
      "M4.44922 23.4512C2.98177 24.6314 2.45348 25.9122 1.51172 28.1755C2.13496 28.0666 3.11068 27.0596 5.82622 24.4928C5.82622 24.4928 5.56819 27.1648 6.38421 27.4688C8.28137 28.1756 10.8109 23.4513 10.8109 23.4513",
    viewBox: "0 0 12 51",
    width: 12,
    height: 51,
    dasharray: 21,
    margin: "0 -4px 0 0",
    caseClass: "lo",
  },
  x_lo: {
    pathD:
      "M0.835938 28.9592C3.16429 26.7004 4.72124 25.4641 8.51758 23.3816C4.59281 26.4933 3.0991 27.1789 3.76827 23.2859C3.43652 25.6778 3.28964 27.0239 3.54516 29.5011",
    viewBox: "0 0 10 51",
    width: 10,
    height: 51,
    dasharray: 24,
    margin: "0 -4px 0 0",
    caseClass: "lo",
  },
  y_lo: {
    pathD:
      "M12.7596 23.2466C11.7764 22.8447 9.49733 28.5405 10.2142 28.4672C10.931 28.3939 16.2577 23.541 16.1552 24.1849C16.7988 27.8118 2.76345 49.8665 1.16523 44.1016C0.00381581 39.4883 5.35733 40.4355 20.0861 24.6317",
    viewBox: "0 0 21 51",
    width: 21,
    height: 51,
    dasharray: 70,
    margin: "0 -4px 0 -9px",
    caseClass: "lo",
  },
  z_lo: {
    pathD:
      "M13.3307 24.7886C15.2097 23.6362 19.139 21.8648 17.6386 23.8652C16.1382 25.8657 10.3676 30.2901 10.2522 32.2137C17.4465 33.5602 3.98082 48.6028 1.78771 44.6787C-0.0557117 41.3803 7.25054 41.1392 22.4092 24.7886",
    viewBox: "0 0 24 51",
    width: 24,
    height: 51,
    dasharray: 67,
    margin: "0 -4px 0 -10px",
    caseClass: "lo",
  },
  " ": {
    isSpace: true,
    margin: "0 6px",
  },
}
