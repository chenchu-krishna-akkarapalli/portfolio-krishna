export default function ContactPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-[586px] flex-col items-center pb-[40px] sm:pb-[100px] pt-[10px]">
      <div className="mt-[10px] flex flex-col items-center gap-[10px]">
        <p className="text-[24px] font-bold leading-[normal] text-white">Contact Me!</p>
        <p className="text-[14px] font-medium leading-[normal] text-text-tertiary">
          The start of something magical...
        </p>
      </div>

      <section className="mt-[38px] w-full">
        <div
          className="
            relative mx-auto w-full
            overflow-hidden rounded-huge
            border border-border-card
            bg-bg-card
            px-[56px] pb-[30px] pt-[34px]
            shadow-[0px_18px_48px_rgba(0,0,0,0.35)]
            backdrop-blur-[20px]
          "
        >
          <form className="flex flex-col gap-[16px]">
            <Field label="Name">
              <input
                type="text"
                placeholder="Your Full Name"
                className="
                  h-[42px] w-full rounded-[10px]
                  border border-border-strong
                  bg-bg-primary
                  px-[14px] text-[14px] text-white
                  placeholder:text-text-placeholder
                  outline-none
                  focus:border-border-interactive
                "
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                placeholder="schats@xyz.com"
                className="
                  h-[42px] w-full rounded-[10px]
                  border border-border-strong
                  bg-bg-primary
                  px-[14px] text-[14px] text-white
                  placeholder:text-text-placeholder
                  outline-none
                  focus:border-border-interactive
                "
              />
            </Field>

            <Field label="Your Message For Me?">
              <textarea
                placeholder="You can describe a lot, I can read it all."
                className="
                  h-[160px] w-full resize-none rounded-[10px]
                  border border-border-strong
                  bg-bg-primary
                  px-[14px] py-[12px] text-[14px] text-white
                  placeholder:text-text-placeholder
                  outline-none
                  focus:border-border-interactive
                "
              />
            </Field>

            <button
              type="submit"
              className="
                mt-[6px] h-[44px] w-full rounded-[10px]
                bg-white text-[14px] font-semibold text-black
                transition-colors duration-200
                hover:bg-[rgba(255,255,255,0.92)]
              "
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[8px]">
      <span className="text-[14px] font-medium leading-[normal] text-text-secondary">{label}</span>
      {children}
    </label>
  );
}
