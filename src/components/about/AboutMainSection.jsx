import About1 from "../../assets/about/about-1.jpg";
import About2 from "../../assets/about/about-2.jpg";
import { EASE_OUT } from "../shared/motion";
import { Reveal, RevealGroup, RevealItem, Words } from "../shared/guestMotion";

// Each photo opens from the page's outer edge in toward its text, drawing
// the eye across to it. The wipe runs on the photo but is triggered by its
// frame (the RevealGroup around it): a fully clipped element has no visible
// area, so it could never report itself as scrolled into view.
const WIPE_FROM_LEFT = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE_OUT } },
};
const WIPE_FROM_RIGHT = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE_OUT } },
};

export default function AboutMainSection() {
  return (
    <>
      <div
        data-component="AboutMainSection"
        className="p-[12rem] max-md:px-[6rem] max-sm:px-[4rem] w-full flex flex-col gap-[4.8rem]"
      >
        <Reveal y={24}
          data-component="Block1"
          className="bg-[color:var(--text-color)] p-[6rem] max-sm:p-[4rem] flex flex-col gap-[1.8rem] text-[var(--white)] font-secondary"
        >
          <Words
            as="h1"
            onLoad
            delay={0.2}
            text="Seamless Comfort and Hospitality"
            className="text-6xl font-secondary font-bold"
          />
          <p className="text-3xl">
            Ringruby Bateye combines modern comfort with the warmth of West African hospitality on Bateye Road, just off Oduduwa Crescent. The location strikes a good balance - quiet enough to unwind, close enough to everything Ikeja GRA has to offer.
          </p>
        </Reveal>
        <div data-component="Block2" className="flex flex-col w-full">
          <div className="flex max-sm:flex-col">
            <RevealGroup amount={0.3}
              data-component="Block2Image"
              className="w-[60%] max-sm:w-[100%] max-w-[40rem] max-sm:max-w-[100%] max-sm:h-[25rem]"
            >
              <RevealItem
                as="img"
                variants={WIPE_FROM_LEFT}
                src={About1}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </RevealGroup>
            <Reveal delay={0.15}
              data-component="Block2Text"
              className="flex flex-col gap-[1.8rem] font-secondary bg-[color:var(--background-color-2)] w-[100%] p-[12rem] max-md:p-[6rem] max-sm:p-[4rem]"
            >
              <h2 className="text-6xl font-bold">
                Your Ideal Retreat for Comfort and Convenience
              </h2>
              <p className="text-3xl">
                Ringruby Hotel Bateye is a short drive from Murtala Muhammed Airport, making it a practical base for both business and leisure travel. Every room is fitted for comfort: king-sized beds with premium bedding, a complimentary coffee station, air conditioning, free Wi-Fi, a flat-screen TV, and a private ensuite bathroom.
              </p>
            </Reveal>
          </div>
          {/* Second row - you can add this structure for additional img+text pairs */}
          <div className="flex max-sm:flex-col">
            <Reveal delay={0.15}
              data-component="Block2Text"
              className="flex flex-col gap-[1.8rem] font-secondary bg-[color:var(--background-color-2)] w-[100%] p-[12rem] max-md:p-[6rem] max-sm:p-[4rem]"
            >
              <h2 className="text-6xl font-bold">
                Experience Tranquil Stays with Unmatched Security
              </h2>
              <p className="text-3xl">
                Ringruby Bateye takes guest security seriously, with advanced surveillance and a dedicated on-site team keeping watch around the clock. It's a stay built around comfort, safety, and service that pays attention to the details.
              </p>
            </Reveal>
            <RevealGroup amount={0.3}
              data-component="Block2Image"
              className="w-[60%] max-w-[40rem] max-sm:w-[100%] max-sm:max-w-[100%] max-sm:h-[25rem]"
            >
              <RevealItem
                as="img"
                variants={WIPE_FROM_RIGHT}
                src={About2}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </RevealGroup>
          </div>
        </div>
        <RevealGroup stagger={0.15}
          data-component="Block3"
          className="bg-[color:var(--text-color)] p-[6rem] flex max-sm:flex-col gap-[6rem] text-[var(--white)] font-secondary"
        >
          <RevealItem className="flex flex-col gap-[1.8rem]">
            <h2 className="text-6xl font-secondary font-bold">Our Vision</h2>
            <p className="text-3xl">
              We're building toward more than one hotel - an organically grown group that leads on place, service, people, and system.
            </p>
          </RevealItem>
          <RevealItem className="flex flex-col gap-[1.8rem]">
            <h2 className="text-6xl font-secondary font-bold">Our Mission</h2>
            <p className="text-3xl">
              At Ringruby Bateye, that vision is simple in practice: create a world-class stay for every guest who walks through our doors.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
