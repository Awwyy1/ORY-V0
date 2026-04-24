export const COOKIE_CONSENT_KEY = "broov-cookie-consent"
export const CONSENT_CHANGE_EVENT = "broov-consent-change"

export type ConsentValue = "accepted" | "declined" | null

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (stored === "accepted" || stored === "declined") return stored
  return null
}

export function setConsent(value: "accepted" | "declined") {
  if (typeof window === "undefined") return
  localStorage.setItem(COOKIE_CONSENT_KEY, value)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}

export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return
  const host = window.location.hostname
  document.cookie.split(";").forEach((c) => {
    const name = c.trim().split("=")[0]
    if (
      name.startsWith("_ga") ||
      name.startsWith("_cl") ||
      name.startsWith("CLID") ||
      name === "ANONCHK" ||
      name === "SM" ||
      name === "MR"
    ) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${host}`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${host}`
    }
  })
}
