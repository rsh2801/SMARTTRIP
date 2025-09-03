import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        zIndex: 9999
      }}
      toastOptions={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 1)", 
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          zIndex: 9999
        },
        className: "z-[9999]"
      }}
      {...props} />
  );
}

export { Toaster }
