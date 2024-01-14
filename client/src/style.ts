export const getIconHoverClass = (isHovered: boolean) =>
  `flex justify-end gap-4 ${
    isHovered ? "opacity-100" : "opacity-0"
  } transition-opacity duration-300`;
