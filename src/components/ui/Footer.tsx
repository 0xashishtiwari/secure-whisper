const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="w-full border-t bg-white/70 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">

        {/* Top row */}
        <div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">

          <p className="text-sm text-muted-foreground">
            © {currentYear}{" "}
            <span className="font-medium text-gray-900">
              Secure Whisper
            </span>
            . All rights reserved.
          </p>

          <address className="not-italic text-sm text-muted-foreground">
            Built for honest conversations.{" "}
            <span className="text-gray-900">
              Protected by privacy.
            </span>
          </address>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Secure Whisper never stores or reveals sender identities.  
          Anonymous messaging, done right.
        </p>
      </div>
    </footer>
  )
}

export default Footer
