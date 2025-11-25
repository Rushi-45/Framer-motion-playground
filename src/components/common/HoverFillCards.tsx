import React from "react";

interface CardProps {
  title: string;
  subtitle: string;
  Icon: any;
  href: string;
  color: "red" | "blue" | "violet" | "green" | "pink" | "gray";
  target?: string;
  rel?: string;
}

const colorMap = {
  red: "from-red-600 to-red-600 text-red-600 group-hover:text-red-200",
  blue: "from-blue-600 to-blue-600 text-blue-600 group-hover:text-blue-200",
  violet:
    "from-violet-600 to-violet-600 text-violet-600 group-hover:text-violet-200",
  green:
    "from-green-600 to-green-600 text-green-600 group-hover:text-green-200",
  pink: "from-pink-600 to-pink-600 text-pink-600 group-hover:text-pink-200",
  gray: "from-gray-600 to-gray-600 text-gray-600 group-hover:text-gray-200",
};

const HoverDevCards: React.FC<CardProps> = ({
  title,
  subtitle,
  Icon,
  href,
  color,
  target,
  rel,
}) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded-sm border border-slate-300 relative overflow-hidden group bg-opacity-55"
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
    >
      <div
        className={`absolute inset-0 bg-linear-to-r ${
          colorMap[color]?.split(" ")[0]
        } ${
          colorMap[color]?.split(" ")[1]
        } translate-y-full group-hover:translate-y-[0%] transition-transform duration-300`}
      />

      <Icon
        className={`absolute z-10 -top-12 -right-12 text-9xl text-opacity-55 group-hover:translate-y-[0%] ${
          colorMap[color]?.split(" ")[2]
        } group-hover:rotate-12 transition-transform duration-300 group-hover:text-white`}
      />

      <Icon
        className={`mb-2 text-2xl ${
          colorMap[color]?.split(" ")[2]
        } transition-colors relative z-10 duration-300`}
      />

      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>

      <p className="text-slate-400 group-hover:text-white relative z-10 duration-300">
        {subtitle}
      </p>
    </a>
  );
};

export default HoverDevCards;
