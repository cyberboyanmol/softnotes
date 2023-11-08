import React from "react";
import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface IconPickerProps {
  onChange: (icon: string) => void;
  asChild?: boolean;
  children: React.ReactNode;
}

const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
