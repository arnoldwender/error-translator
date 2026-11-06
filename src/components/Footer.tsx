export function Footer() {
  return (
    <footer className="border-t border-[--neon-ghost] pt-6 mt-4 text-center text-[0.58rem] text-[--neon-ghost] tracking-[2px] leading-[2.2]">
      <div>ERROR TRANSLATOR IS NOT A SUBSTITUTE FOR ACTUAL DEBUGGING OR ACTUAL THERAPY</div>
      <div>BUILT BY ARNOLD WENDER -- WE HAVE SEEN EVERY ERROR. WE ARE NOT OKAY.</div>
      <div className="text-[#ff000022] mt-1">
        HTTP 418 -- YOUR STACK TRACE IS ALSO A TEAPOT
      </div>
      {/* Legal pages are static files in public/ so they stay reachable without JavaScript */}
      <nav aria-label="Legal" className="mt-3 flex justify-center gap-6 text-[0.7rem] text-[--neon]">
        <a href="/impressum/" className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[--neon]">IMPRESSUM</a>
        <a href="/datenschutz/" className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[--neon]">DATENSCHUTZ</a>
      </nav>
    </footer>
  );
}
