import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black px-4 py-20 text-white">
      <div className="mx-auto flex max-w-[560px] flex-col items-center">
        {/* Partners Section */}
        <section className="mb-40 w-full">
          <h2 className="mb-20 text-center text-2xl font-bold tracking-tight">
            Partners
          </h2>
          {/* <p className="mx-auto mb-20 max-w-sm text-center text-xs font-medium tracking-wide text-gray-400">
            We are grateful for the support of our sponsors and partners who
            help us achieve our goals on and off the field.
          </p> */}

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-90">
            <a
              href="https://www.instagram.com/kebabkingzdumaguete/"
              target="_blank"
              className="w-70 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Kebab Kings"
                src="/imgs/sponsors/kebabkings.png"
                width={454}
                height={108}
                unoptimized
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579370682002"
              target="_blank"
              className="w-38 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Montevista Studio Apartments"
                src="/imgs/sponsors/montevista.png"
                width={209}
                height={168}
                unoptimized
              />
            </a>

            <a
              href="https://www.facebook.com/popsis.official/"
              target="_blank"
              className="w-28 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Popsis"
                src="/imgs/sponsors/popsis.png"
                width={163}
                height={168}
                unoptimized
              />
            </a>

            <a
              href="https://www.facebook.com/BreakroomCafeDGTE"
              target="_blank"
              className="w-40 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Breakroom Cafe"
                src="/imgs/sponsors/breakroom.png"
                width={253}
                height={175}
                unoptimized
              />
            </a>

            <a
              href="https://www.youtube.com/@LifeWithLobo"
              target="_blank"
              className="w-30 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Life with Lobo"
                src="/imgs/sponsors/lobo.png"
                width={182}
                height={173}
                unoptimized
              />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100064115258151"
              target="_blank"
              className="w-27 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Sour Sip Relish that Dish"
                src="/imgs/sponsors/soursip.png"
                width={245}
                height={273}
                unoptimized
              />
            </a>

            <a
              href="https://www.facebook.com/H2ELq"
              target="_blank"
              className="w-18 transition-opacity hover:opacity-50"
            >
              <Image
                alt="Liso"
                src="/imgs/sponsors/liso.png"
                width={109}
                height={169}
                unoptimized
              />
            </a>
          </div>
        </section>

        {/* Social Icons */}
        <div className="mb-10 flex gap-5">
          <a
            href="https://facebook.com/fcinterracial"
            target="_blank"
            className="opacity-30 transition-opacity hover:opacity-70"
          >
            <Image
              alt="Facebook"
              src="/imgs/facebook.svg"
              width={40}
              height={40}
              unoptimized
            />
          </a>

          <a
            href="https://www.youtube.com/@FCInterRacial"
            target="_blank"
            className="opacity-30 transition-opacity hover:opacity-70"
          >
            <Image
              alt="Facebook"
              src="/imgs/youtube.svg"
              width={40}
              height={40}
              unoptimized
            />
          </a>
        </div>

        {/* Legal & Credits */}
        <div className="space-y-4 text-center">
          <p className="text-lg font-medium text-gray-300">Copyright © 2026</p>
          <p className="text-sm font-light tracking-wide text-gray-500">
            {"This website is built by "}
            <a
              href="https://grantimbo.com"
              target="_blank"
              className="text-gray-300 hover:text-white"
            >
              Grant Imbo
            </a>
            <span className="block md:inline">
              {" and "}
              <a
                className="text-gray-300 hover:text-white"
                href="https://jrbautista.dev/"
                target="_blank"
              >
                John Rey Bautista
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
