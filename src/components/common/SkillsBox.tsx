import React, { useEffect, useRef, useState } from "react";
import { skills } from "../../constants/skills";
import Matter, {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
} from "matter-js";
import toast, { Toaster } from "react-hot-toast";

const SKILL_SIZE = 64; // px, adjust as needed

const DraggableSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [engine] = useState(() => Engine.create());
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [bodies, setBodies] = useState<Matter.Body[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [physicsActive, setPhysicsActive] = useState(false);

  useEffect(() => {
    const ref = sectionRef.current;
    if (!ref) return;
    let timeout: number;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timeout = setTimeout(() => setPhysicsActive(true), 1000);
        } else {
          setPhysicsActive(false);
          clearTimeout(timeout);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // Set up Matter.js world and bodies
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth || 800;
    const height = containerRef.current.offsetHeight || 400;

    // Remove previous bodies
    World.clear(engine.world, false);

    // Create boundaries
    const wallThickness = 100;
    const walls = [
      // top
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
        isStatic: true,
      }),
      // bottom
      Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      ),
      // left
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
      }),
      // right
      Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true }
      ),
    ];
    World.add(engine.world, walls);

    // Create skill bodies
    const initialBodies = skills.map((skill, i) => {
      // Random position within bounds
      const x = Math.random() * (width - SKILL_SIZE) + SKILL_SIZE / 2;
      const y = Math.random() * (height - SKILL_SIZE) + SKILL_SIZE / 2;
      return Bodies.circle(x, y, SKILL_SIZE / 2, {
        restitution: 0.8,
        friction: 0.1,
        label: String(skill.id),
      });
    });
    World.add(engine.world, initialBodies);
    setBodies(initialBodies);
    setPositions(
      initialBodies.map((b) => ({ x: b.position.x, y: b.position.y }))
    );
    setIsReady(true);

    // Mouse drag
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    // Animation loop
    let frameId: number;
    const update = () => {
      if (physicsActive) {
        Engine.update(engine, 1000 / 60);
        setPositions(
          initialBodies.map((b) => ({ x: b.position.x, y: b.position.y }))
        );
      }
      frameId = requestAnimationFrame(update);
    };
    update();

    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, physicsActive]);

  // Toast on mount
  useEffect(() => {
    if (isReady) {
      const timeout = setTimeout(() => {
        toast("Drag the skills to play around!", {
          position: "bottom-center",
          duration: 4000,
          icon: "🖱️",
          style: {
            background: "linear-gradient(135deg, #6e45e2, #88d3ce)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            fontSize: "16px",
          },
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isReady]);

  // Responsive container size
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 400,
  });
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth || 800,
          height: containerRef.current.offsetHeight || 400,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center space-y-4 px-4 py-8"
    >
      <Toaster />
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
        Tech Stack
      </h2>
      <div
        ref={containerRef}
        className="relative flex items-center justify-center bg-[#2D3748] rounded-lg p-4 sm:p-6"
        style={{
          width: containerSize.width,
          height: containerSize.height,
          minWidth: "250px",
          maxWidth: "90vw",
          minHeight: "200px",
          maxHeight: "50vh",
        }}
      >
        {isReady &&
          positions.length === skills.length &&
          skills.map((skill, i) => (
            <div
              key={skill.id}
              className={`absolute w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center ${skill.bgColor} rounded-full shadow-lg cursor-grab active:cursor-grabbing select-none group`}
              style={{
                left: `${positions[i].x - SKILL_SIZE / 2}px`,
                top: `${positions[i].y - SKILL_SIZE / 2}px`,
                transition: "box-shadow 0.2s",
                zIndex: 2,
              }}
              tabIndex={0}
              aria-label={skill.name}
              title={skill.name}
            >
              {skill.icon &&
                React.cloneElement(skill.icon, {
                  size: window.innerWidth < 400 ? 30 : 40,
                  className: `sm:text-2xl ${skill.textColor}`,
                })}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DraggableSkills;
