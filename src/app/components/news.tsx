import FacebookEmbed from "./facebook-embed";

interface IPhoneProps {
  color?: string;
  children?: React.ReactNode;
}

const IPhone17Template: React.FC<IPhoneProps> = ({
  color = "#2c2c2e",
  children,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
      <svg
        className="h-auto w-full"
        viewBox="0 0 400 680"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Frame */}
        <rect
          x="50"
          y="20"
          width="300"
          height="620"
          rx="55"
          fill={color}
          stroke="#1a1a1a"
          strokeWidth="2"
        />

        {/* Screen Bezel */}
        <rect x="58" y="28" width="284" height="604" rx="48" fill="#000000" />

        {/* Dynamic Island */}
        <rect x="145" y="45" width="110" height="28" rx="14" fill="#1a1a1a" />

        {/* Buttons */}
        <rect x="46" y="140" width="4" height="30" rx="2" fill="#444" />
        <rect x="350" y="210" width="4" height="90" rx="2" fill="#444" />
      </svg>

      {/* Content Overlay */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: "5.15%",
          left: "16.25%",
          width: "67.5%",
          height: "86.76%",
          borderRadius: "15.5% / 7.1%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function News() {
  return (
    <section
      className="scroll-mt-16 bg-[#f5f6f7] px-4 py-12 font-sans sm:py-16 md:scroll-mt-20 dark:bg-gray-500/10"
      id="news"
    >
      <div className="mx-auto max-w-6xl text-center">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-12">
          <IPhone17Template>
            <FacebookEmbed />
          </IPhone17Template>

          <div className="max-w-xl text-center text-black md:text-left dark:text-white">
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Don&rsquo;t miss a beat.
            </h2>
            <p className="text-base sm:text-lg md:text-xl">
              Catch all our latest updates over on Facebook.
            </p>

            <a
              href="https://facebook.com/fcinterracial"
              className="mt-6 inline-block rounded-md bg-white px-8 py-3 text-sm font-bold tracking-widest text-black uppercase outline-3 outline-black hover:bg-gray-200 sm:mt-8 sm:px-10 sm:py-4 dark:outline-white"
            >
              Visit Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
