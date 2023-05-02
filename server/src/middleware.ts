import path from "path";

export function fallback(request: any, response: { sendFile: (arg0: string) => void; }) {
  response.sendFile(path.join(__dirname, '/static', '/index.html'))
}
