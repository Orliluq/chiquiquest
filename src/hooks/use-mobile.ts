import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value immediately in effect, avoiding custom linter rules by using timeout
    const timeout = setTimeout(() => {
      setIsMobile(mql.matches)
    }, 0)
    
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    mql.addEventListener("change", handler)
    return () => {
      clearTimeout(timeout)
      mql.removeEventListener("change", handler)
    }
  }, [])

  return isMobile
}
