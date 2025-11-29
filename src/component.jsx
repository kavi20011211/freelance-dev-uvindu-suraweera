const StarIcon = ({
  size = 200,
  bgColor = "#c5d5c0",
  iconColor = "#1a1a1a",
  className = "",
}) => (
  <div
    className={`rounded-full flex items-center justify-center ${className}`}
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 1} height={size * 1} viewBox="0 0 100 100">
      <path
        d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z"
        fill={iconColor}
      />
    </svg>
  </div>
);

const DiamondIcon = ({
  size = 200,
  bgColor = "#d4c4c4",
  iconColor = "#1a1a1a",
  className = "",
}) => (
  <div
    className={`rounded-full flex items-center justify-center ${className}`}
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 1} height={size * 1} viewBox="0 0 100 100">
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        fill={iconColor}
        transform="rotate(45 50 50)"
      />
      <rect
        x="35"
        y="10"
        width="30"
        height="20"
        fill={iconColor}
        transform="rotate(45 50 50)"
      />
    </svg>
  </div>
);

const AsteriskIcon = ({
  size = 200,
  bgColor = "#b4c4d4",
  iconColor = "#1a1a1a",
  className = "",
}) => (
  <div
    className={`rounded-full flex items-center justify-center ${className}`}
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 1} height={size * 1} viewBox="0 0 100 100">
      <rect x="45" y="10" width="10" height="80" fill={iconColor} />
      <rect x="10" y="45" width="80" height="10" fill={iconColor} />
      <rect
        x="45"
        y="10"
        width="10"
        height="80"
        fill={iconColor}
        transform="rotate(60 50 50)"
      />
      <rect
        x="45"
        y="10"
        width="10"
        height="80"
        fill={iconColor}
        transform="rotate(120 50 50)"
      />
    </svg>
  </div>
);

const TriangleIcon = ({
  size = 200,
  bgColor = "#d4c8ac",
  iconColor = "#1a1a1a",
}) => (
  <div
    className="rounded-full flex items-center justify-center"
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 100 100">
      <path d="M50 20 L80 80 L20 80 Z" fill={iconColor} />
    </svg>
  </div>
);

const StackedIcon = ({
  size = 200,
  bgColor = "#c4c4c4",
  iconColor = "#1a1a1a",
}) => (
  <div
    className="rounded-full flex items-center justify-center"
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 100 100">
      <rect x="15" y="20" width="70" height="15" fill={iconColor} />
      <rect x="25" y="42.5" width="50" height="15" fill={iconColor} />
      <rect x="15" y="65" width="70" height="15" fill={iconColor} />
    </svg>
  </div>
);

const ChevronIcon = ({
  size = 200,
  bgColor = "#c4c4dc",
  iconColor = "#1a1a1a",
}) => (
  <div
    className="rounded-full flex items-center justify-center"
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 100 100">
      <path d="M20 35 L50 15 L80 35 L80 65 L50 85 L20 65 Z" fill={iconColor} />
    </svg>
  </div>
);

const SunburstIcon = ({
  size = 200,
  bgColor = "#b4d4d4",
  iconColor = "#1a1a1a",
}) => (
  <div
    className="rounded-full flex items-center justify-center"
    style={{ width: size, height: size, backgroundColor: bgColor }}
  >
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="20" fill={iconColor} />
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x="48"
          y="10"
          width="4"
          height="15"
          fill={iconColor}
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </svg>
  </div>
);

export {
  StarIcon,
  DiamondIcon,
  AsteriskIcon,
  TriangleIcon,
  StackedIcon,
  ChevronIcon,
  SunburstIcon,
};
