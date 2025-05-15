// import React, { useEffect, useRef, useState } from "react";

// const CircularProgress = ({
//   size = 160,
//   strokeWidth = 10,
//   progress = 65,
//   animationDuration = 2000,
//   animationTimingFunction = "ease-out",
//   gradientColors = ["#DA22FF", "#9733EE"],
//   textColor = "#555",
//   fontSize = 20,
//   backgroundColor = "#e3edf7",
//   id = "1",
//   children,
//   containerStyle = {},
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   const [displayValue, setDisplayValue] = useState(0);
//   const rafId = useRef(null);

//   useEffect(() => {
//     let start = null;
//     let lastUpdate = 0;

//     const animate = (timestamp) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;

//       const percentage = Math.min(
//         Math.round((elapsed / animationDuration) * progress),
//         progress
//       );

//       // Only update state every 40ms (25fps) to reduce lag
//       if (timestamp - lastUpdate > 40) {
//         setDisplayValue(percentage);
//         lastUpdate = timestamp;
//       }

//       if (elapsed < animationDuration) {
//         rafId.current = requestAnimationFrame(animate);
//       } else {
//         setDisplayValue(progress); // ensure final value is exact
//       }
//     };

//     rafId.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafId.current);
//   }, [progress, animationDuration]);

//   return (
//     <div
//       style={{
//         backgroundColor,
//         width: size,
//         height: size,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         borderRadius: "50%",
//         boxShadow:
//           "8px 8px 20px rgba(0, 0, 0, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)",
//         ...containerStyle,
//       }}
//     >
//       <div
//         style={{
//           width: size - 40,
//           height: size - 40,
//           borderRadius: "50%",
//           background: backgroundColor,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow:
//             "inset 6px 6px 12px rgba(0,0,0,0.08), inset -6px -6px 12px rgba(255,255,255,0.9)",
//         }}
//       >
//         {children ? (
//           children
//         ) : (
//           <div style={{ fontWeight: 600, fontSize, color: textColor }}>
//             {displayValue}%
//           </div>
//         )}
//       </div>

//       <svg
//         width={size}
//         height={size}
//         style={{ position: "absolute", top: 0, left: 0 }}
//       >
//         <defs>
//           <linearGradient id={`GradientColor-${id}`}>
//             <stop offset="0%" stopColor={gradientColors[0]} />
//             <stop offset="100%" stopColor={gradientColors[1]} />
//           </linearGradient>
//         </defs>
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={`url(#GradientColor-${id})`}
//           strokeWidth={strokeWidth}
//           strokeDasharray={circumference}
//           strokeDashoffset={circumference}
//           style={{
//             strokeLinecap: "round",
//             animation: `progressAnim-${id} ${animationDuration}ms ${animationTimingFunction} forwards`,
//           }}
//         />
//       </svg>

//       <style>{`
//         @keyframes progressAnim-${id} {
//           to {
//             stroke-dashoffset: ${offset};
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CircularProgress;

import React, { useEffect, useRef, useState } from "react";

const CircularProgress = ({
  size = 160,
  strokeWidth = 10,
  progress = 65,
  animationDuration = 2000,
  animationTimingFunction = "ease-out",
  gradientColors = ["#DA22FF", "#9733EE"],
  textColor = "#555",
  fontSize = 20,
  backgroundColor = "#e3edf7",
  id = "1",
  children,
  containerStyle = {},
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const [displayValue, setDisplayValue] = useState(0);
  const rafId = useRef(null);

  // This state will force re-rendering and new animation
  const [animationId, setAnimationId] = useState(() => `${id}-${Date.now()}`);

  useEffect(() => {
    let start = null;
    let lastUpdate = 0;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const percentage = Math.min(
        Math.round((elapsed / animationDuration) * progress),
        progress
      );

      if (timestamp - lastUpdate > 40) {
        setDisplayValue(percentage);
        lastUpdate = timestamp;
      }

      if (elapsed < animationDuration) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(progress);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animationId, progress, animationDuration]);

  return (
    <div
      onClick={() => {
        setAnimationId(`${id}-${Date.now()}`);
      }}
      style={{
        backgroundColor,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: "50%",
        boxShadow:
          "8px 8px 20px rgba(0, 0, 0, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)",
        cursor: "pointer",
        ...containerStyle,
      }}
    >
      <div
        style={{
          width: size - 40,
          height: size - 40,
          borderRadius: "50%",
          background: backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "inset 6px 6px 12px rgba(0,0,0,0.08), inset -6px -6px 12px rgba(255,255,255,0.9)",
        }}
      >
        {children ? (
          children
        ) : (
          <div style={{ fontWeight: 600, fontSize, color: textColor }}>
            {displayValue}%
          </div>
        )}
      </div>

      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id={`GradientColor-${animationId}`}>
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="100%" stopColor={gradientColors[1]} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#GradientColor-${animationId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            strokeLinecap: "round",
            animation: `progressAnim-${animationId} ${animationDuration}ms ${animationTimingFunction} forwards`,
          }}
        />
      </svg>

      <style>{`
        @keyframes progressAnim-${animationId} {
          to {
            stroke-dashoffset: ${offset};
          }
        }
      `}</style>
    </div>
  );
};

export default CircularProgress;
