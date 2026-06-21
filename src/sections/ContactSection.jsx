import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const formRef = useRef();

  const currentYear = new Date().getFullYear();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("Message sent successfully.");
      formRef.current.reset();
    } catch (error) {
      setStatus("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden px-6 md:px-16 py-28 flex flex-col items-center justify-center">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute bottom-[-200px] left-[-100px] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* CLIENTS SECTION (NEW) */}
      <div className="relative z-10 mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4 font-extrabold">
          Clients I work with
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {["Canada", "USA", "Sri Lanka"].map((country, i) => (
            <div
              key={i}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 text-sm hover:border-indigo-400/40 hover:text-white transition"
            >
              {country}
            </div>
          ))}
        </div>

        <p className="mt-4 text-zinc-600 text-sm font-bold">
          Remote collaborations across the world.
        </p>
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-2xl">
        {/* LEFT SIDE */}
        <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
          <p className="uppercase tracking-[0.3em] text-indigo-400 text-sm mb-6">
            Contact
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-white">
            Let’s <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
              Build Something
            </span>
          </h2>

          <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-md">
            Whether it’s a modern web app, scalable backend architecture, or
            AI-powered solution let’s create something exceptional.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-zinc-400">
              Available for freelance & collaborations
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 md:p-16">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="John Doe"
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-white outline-none transition focus:border-indigo-400/50 focus:bg-white/6"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-white outline-none transition focus:border-indigo-400/50 focus:bg-white/6"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="6"
                placeholder="Tell me about your project..."
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-white outline-none resize-none transition focus:border-indigo-400/50 focus:bg-white/6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full rounded-2xl bg-white text-black font-semibold py-4 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="text-sm text-center text-zinc-400">{status}</p>
            )}
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-zinc-500 z-20">
        <p>© {currentYear} Uvindu Suraweera. All rights reserved.</p>
      </div>
    </section>
  );
}

export default ContactSection;
