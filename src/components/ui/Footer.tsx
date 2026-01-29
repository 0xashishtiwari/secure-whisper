const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="w-full border"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 text-center space-y-2">

        <p className="text-sm text-muted-foreground">
          © {currentYear}{" "}
          <span className="font-medium text-gray-900">
            Secure Whisper
          </span>
          . All rights reserved.
        </p>

        <p className="text-xs text-muted-foreground">
          Created with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/ashiishtiwarii/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 hover:underline hover:text-blue-700 transition"
          >
            Ashish Tiwari
          </a>
        </p>

      </div>
    </footer>
  )
}

export default Footer
