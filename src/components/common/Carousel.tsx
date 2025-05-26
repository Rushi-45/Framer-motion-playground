import { MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { projects } from "../../constants/projects";
import ShinyButton from "./ShinyButton";
import SpotlightCard from "./SpotlightCard";

const START_INDEX = 1;
const DRAG_THRESHOLD = 150;
const FALLBACK_WIDTH = 509;

const CURSOR_SIZE = 80;

interface CarouselProps {
  projectEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  projectLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Carousel: React.FC<CarouselProps> = ({ projectEnter, projectLeave }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(START_INDEX);
  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < projects.length - 1;
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });

  const [isDragging, setIsDragging] = useState(false);
  function handleDragSnap(
    _: MouseEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");

    animatedX.stop();

    const currentOffset = offsetX.get();

    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }

    let offsetWidth = 0;

    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i];
      if (item === null) continue;
      const itemOffset = item.offsetWidth;

      const prevItemWidth =
        itemsRef.current[i - 1]?.offsetWidth ?? FALLBACK_WIDTH;
      const nextItemWidth =
        itemsRef.current[i + 1]?.offsetWidth ?? FALLBACK_WIDTH;

      if (
        (dragOffset > 0 && dragOffset > offsetWidth + itemOffset && i > 1) ||
        (dragOffset < 0 &&
          dragOffset < offsetWidth + -itemOffset &&
          i < itemsRef.current.length - 2)
      ) {
        dragOffset > 0
          ? (offsetWidth += prevItemWidth)
          : (offsetWidth -= nextItemWidth);
        continue;
      }

      if (dragOffset > 0) {
        offsetX.set(currentOffset + offsetWidth + prevItemWidth);
        setActiveSlide(i - 1);
      } else {
        offsetX.set(currentOffset + offsetWidth - nextItemWidth);
        setActiveSlide(i + 1);
      }
      break;
    }
  }

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function disableDragClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <>
      <div className="text-center">
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
          Projects
        </h1>
      </div>
      <div className="flex flex-col gap-8 h-auto">
        <div className="relative w-full lg:w-2/3">
          <div className="group container mx-4 sm:mx-6">
            <div
              className="relative overflow-hidden"
              onMouseEnter={projectEnter}
              onMouseLeave={projectLeave}
            >
              <motion.ul
                ref={containerRef}
                className="flex cursor-none items-start"
                style={{
                  x: animatedX,
                }}
                drag="x"
                dragConstraints={{
                  left: -(FALLBACK_WIDTH * (projects.length - 1)),
                  right: FALLBACK_WIDTH,
                }}
                onMouseMove={({ currentTarget, clientX, clientY }) => {
                  const parent = currentTarget.offsetParent;
                  if (!parent) return;
                  const { left, top } = parent.getBoundingClientRect();
                  mouseX.set(clientX - left - CURSOR_SIZE / 2);
                  mouseY.set(clientY - top - CURSOR_SIZE / 2);
                }}
                onDragStart={() => {
                  containerRef.current?.setAttribute("data-dragging", "true");
                  setIsDragging(true);
                }}
                onDragEnd={handleDragSnap}
              >
                {projects.map((article, index) => {
                  const active = index === activeSlide;
                  return (
                    <motion.li
                      layout
                      key={article.title}
                      ref={(el) => {
                        itemsRef.current[index] = el;
                      }}
                      className={classNames(
                        "group relative shrink-0 select-none px-2 sm:px-3 transition-opacity duration-300",
                        "basis-full sm:basis-1/2 lg:basis-1/3 max-w-full",
                        !active && "opacity-30"
                      )}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: [-6, 6, -6],
                        transition: {
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                          },
                        },
                      }}
                    >
                      <div className="block" tabIndex={0} draggable={false}>
                        <div className="relative grid place-content-center overflow-hidden rounded-lg bg-[#2D3748]/90 w-full h-60 sm:h-72 lg:h-80">
                          <img
                            src={article.logo}
                            alt={article.title}
                            className="h-40 sm:h-48 lg:h-60 w-auto object-cover"
                          />

                          <div className="absolute inset-0 opacity-0 cursor-grab pointer-events-auto"></div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="w-full flex lg:justify-center">
            <SpotlightCard
              className="custom-spotlight-card w-full lg:max-w-2xl"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg 
                 text-left lg:text-center"
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {projects[activeSlide].title}
                </h2>

                <p className="mt-2 sm:mt-4 text-sm sm:text-lg leading-relaxed text-gray-300">
                  {projects[activeSlide].description}
                </p>

                <div
                  className="mt-4 sm:mt-6 flex flex-wrap 
                      justify-start lg:justify-center gap-2"
                >
                  {projects[activeSlide].technologies.map((tech) => (
                    <ShinyButton key={tech} title={tech} />
                  ))}
                </div>
              </motion.div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
