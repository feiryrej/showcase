"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-customBg sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  loading="lazy"
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base text-center"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-customBg dark:hover:bg-customBg rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  loading="lazy"
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-center text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-center text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "League of Legends Landing Page (Morgana)",
    title: "Morgana - Landing Page",
    src: "/mor.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          Morgana drains spirit from her enemies, healing as she deals damage to champions.
        </p>
      );
    },
  },
  {
    description: "League of Legends Landing Page (Akali)",
    title: "Akali - Landing Page",
    src: "/ak.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          Abandoning the Kinkou Order and her title of the Fist of Shadow, Akali now strikes alone, ready to be the deadly weapon her people need. 
        </p>
      );
    },
  },

  {
    description: "League of Legends Landing Page (Luxanna)",
    title: "Lux - Landing Page",
    src: "/lu.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          Luxanna Crownguard hails from Demacia, an insular realm where magical abilities are viewed with fear and suspicion. 
        </p>
      );
    },
  },
  {
    description: "League of Legends Landing Page (Gwen)",
    title: "Gwen - Landing Page",
    src: "/gw.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          A former doll transformed and brought to life by magic, Gwen wields the very tools that once created her. 
        </p>
      );
    },
  },
  {
    description: "Genshin Impact Landing Page (Raiden)",
    title: "Raiden - Landing Page",
    src: "/rai.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          The Raiden Shogun (Japanese: 雷らい電でん将しょう軍ぐん Raiden Shougun) is a playable Electro character in Genshin Impact.
          The Raiden Shogun is comprised of two beings in one body: Ei, the current Electro Archon of Inazuma; 
          and the Shogun, the puppet created by Ei to act as the ruler of Inazuma in her stead.
        </p>
      );
    },
  },
  {
    description: "Genshin Impact Landing Page (Tartaglia)",
    title: "Tartaglia - Landing Page",
    src: "/tart.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          <b>My girlfriend's favorite character.</b> <br />
          Tartaglia, also known by his codename "Childe," is a playable Hydro character in Genshin Impact.
          He is the Eleventh of the Eleven Fatui Harbingers. Wherever he goes, danger follows, 
          and Childe is always eager for a challenge, making him extremely dangerous despite being the youngest member.
        </p>
      );
    },
  },
  {
    description: "Genshin Impact Landing Page (Xiao)",
    title: "Xiao - Landing Page",
    src: "/xia.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          Xiao (Chinese: 魈 Xiāo) is a playable Anemo character in Genshin Impact. He is an adeptus, under the name Alatus, 
          and the sole surviving member of the five foremost Yakshas dispatched by Morax to subdue the demonic spirits that plagued Liyue. 
          He currently resides at Wangshu Inn and mostly restrains himself from large crowds and social interactions.
        </p>
      );
    },
  },
  {
    description: "Genshin Impact Landing Page (Zhongli)",
    title: "Zhongli - Landing Page",
    src: "/zho.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          Zhongli (Chinese: 钟离 Zhōnglí) is a playable Geo character in Genshin Impact. A consultant of the Wangsheng Funeral Parlor,
          he is later revealed to be the Geo Archon, Morax, who has decided to experience the world from the perspective of a mortal.
        </p>
      );
    },
  },
  {
    description: "League of Legends Dashboard",
    title: "LOL-Dash",
    src: "/dash.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          I created a dashboard for League of Legends players that helps them see their game statistics, 
          watch videos, and check their lane positions and most played roles. The dashboard also allows them to connect with friends, 
          send messages, and switch between different games easily.
        </p>
      );
    },
  },
  {
    description: "League of Legends Music Player",
    title: "KD/A Music Player",
    src: "/uim.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          I created a K/DA music player. K/DA is a virtual K-pop girl group made up of four League of Legends characters: 
          Ahri, Akali, Evelynn, and Kai'Sa. The music player lets fans listen to their songs and enjoy the virtual band's music.
        </p>
      );
    },
  },
  {
    description: "Minecraft Landing Page",
    title: "Cherry Pink House",
    src: "/min.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          I designed a landing page with a complete prototype that showcases a Minecraft world. 
        </p>
      );
    },
  },
  {
    description: "My first 3D made in spline",
    title: "Litol Bean",
    src: "/bn.png",
    ctaText: "Visit",
    content: () => {
      return (
        <p>
          I created my first 3D design using Spline by following a YouTube tutorial. 
          I want to keep improving my 3D skills because I aim to become a 3D website programmer.
        </p>
      );
    },
  },
];
