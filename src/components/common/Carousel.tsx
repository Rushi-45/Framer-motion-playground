import {
  MouseEvent as ReactMouseEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects } from "@/constants/projects";
import ShinyButton from "./ShinyButton";
import SpotlightCard from "./SpotlightCard";

const MotionImage = motion(Image);

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

  const updateActiveSlide = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const offsetAdjustment = isMobile ? -30 : 0;
    const containerCenter =
      containerRect.left + containerRect.width / 2 + offsetAdjustment;
    const currentOffset = offsetX.get();

    let closestIndex = 0;
    let closestDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeSlide) {
      setActiveSlide(closestIndex);
    }
  };

  function handleDragSnap(
    _: MouseEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");

    animatedX.stop();

    const currentOffset = offsetX.get();
    const finalOffset = currentOffset + dragOffset;

    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      calculateActiveSlideFromOffset(currentOffset);
      return;
    }

    let offsetWidth = 0;
    let newActiveSlide = activeSlide;

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
        const newOffset = currentOffset + offsetWidth + prevItemWidth;
        offsetX.set(newOffset);
        newActiveSlide = i - 1;
      } else {
        const newOffset = currentOffset + offsetWidth - nextItemWidth;
        offsetX.set(newOffset);
        newActiveSlide = i + 1;
      }
      break;
    }

    setActiveSlide(newActiveSlide);
  }

  const calculateActiveSlideFromOffset = (offset: number) => {
    if (!containerRef.current || itemsRef.current.length === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const offsetAdjustment = isMobile ? -30 : 0;
    let accumulatedWidth = 0;
    let closestIndex = 0;
    let closestDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemWidth = item.offsetWidth;
      const itemCenter = accumulatedWidth + itemWidth / 2 + offset;
      const containerCenter = containerWidth / 2 + offsetAdjustment;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }

      accumulatedWidth += itemWidth;
    });

    if (closestIndex !== activeSlide) {
      setActiveSlide(closestIndex);
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (itemsRef.current[START_INDEX] && containerRef.current) {
        const startItem = itemsRef.current[START_INDEX];
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = startItem.offsetWidth;
        const isMobile = window.innerWidth < 768;
        const offsetAdjustment = isMobile ? -30 : 0;
        const initialOffset =
          -(itemWidth * START_INDEX) +
          (containerWidth - itemWidth) / 2 +
          offsetAdjustment;
        offsetX.set(initialOffset);
        setActiveSlide(START_INDEX);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = animatedX.on("change", (latest) => {
      if (!isDragging) {
        setTimeout(() => {
          calculateActiveSlideFromOffset(latest);
        }, 200);
      }
    });
    return unsubscribe;
  }, [isDragging]);

  function disableDragClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const goToSlide = (index: number) => {
    if (index < 0 || index >= projects.length) return;
    if (!containerRef.current || !itemsRef.current[index]) return;

    const item = itemsRef.current[index];
    const containerWidth = containerRef.current.offsetWidth;
    const itemWidth = item.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const offsetAdjustment = isMobile ? -30 : 0;
    const newOffset =
      -(itemWidth * index) +
      (containerWidth - itemWidth) / 2 +
      offsetAdjustment;

    offsetX.set(newOffset);
    setActiveSlide(index);
  };

  const goToPrev = () => {
    if (canScrollPrev) {
      goToSlide(activeSlide - 1);
    }
  };

  const goToNext = () => {
    if (canScrollNext) {
      goToSlide(activeSlide + 1);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
          Projects
        </h2>
      </div>
      <div className="flex flex-col gap-8 h-auto">
        <div className="relative w-full lg:w-2/3">
          <button
            onClick={goToPrev}
            disabled={!canScrollPrev}
            className={classNames(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
              "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3",
              "transition-all duration-300 flex items-center justify-center",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "text-white hover:text-blue-400",
              "lg:hidden"
            )}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={!canScrollNext}
            className={classNames(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
              "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3",
              "transition-all duration-300 flex items-center justify-center",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "text-white hover:text-blue-400",
              "lg:hidden"
            )}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

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
                      key={article.title}
                      ref={(el) => {
                        itemsRef.current[index] = el;
                      }}
                      className={classNames(
                        "group relative shrink-0 select-none px-2 sm:px-3 transition-opacity duration-300",
                        "basis-full sm:basis-1/2 lg:basis-1/3 max-w-full",
                        !active && "opacity-30"
                      )}
                      style={{ willChange: "transform" }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                    >
                      <div className="block" tabIndex={0} draggable={false}>
                        <div className="relative grid place-content-center overflow-hidden rounded-lg bg-[#2D3748]/90 w-full h-60 sm:h-72 lg:h-80">
                          <MotionImage
                            src={article.logo}
                            alt={`${article.title} project logo`}
                            className="h-40 sm:h-48 lg:h-60 w-auto object-cover"
                            width={300}
                            height={225}
                            loading="lazy"
                            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 300px"
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

          <div className="flex justify-center gap-2 mt-4 sm:mt-6 lg:hidden">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={classNames(
                  "transition-all duration-300 rounded-full",
                  index === activeSlide
                    ? "w-8 h-2 sm:w-10 sm:h-2.5 bg-blue-500"
                    : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {projects[activeSlide].title}
                </h3>

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
