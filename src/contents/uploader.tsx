import Encoding from "encoding-japanese"
import type { PlasmoCSConfig } from "plasmo"

const GMAIL_BODY_SELECTOR = ".Am.Al.editable"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/mail/*"]
}

const Uploader = () => {
  const loadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result || typeof e.target.result === "string") {
        return
      }
      const target = document.querySelector(GMAIL_BODY_SELECTOR)
      if (!target) {
        return
      }

      const codes = new Uint8Array(e.target.result)
      const unicodeString = Encoding.convert(codes, {
        to: "UNICODE",
        type: "string"
      })

      target.innerHTML = unicodeString
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <label
      style={{
        position: "fixed",
        left: "4px",
        bottom: "4px",
        borderRadius: "2px",
        backgroundColor: "white",
        padding: "8px 16px",
        display: "inline-block"
      }}>
      <input
        type="file"
        accept=".html"
        onChange={loadFile}
        style={{ display: "none" }}></input>
      insert HTML mail
    </label>
  )
}

export default Uploader
