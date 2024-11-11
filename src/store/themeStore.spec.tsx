import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useThemeStore } from "./themeStore";

describe("Theme store", () => {
  it("should toggle theme", async () => {
    function ThemeComponent() {
      const theme = useThemeStore((state) => state.theme);
      const handleToggleTheme = useThemeStore(
        (state) => state.handleToggleTheme
      );

      return (
        <div>
          <button data-testid="toggle-button" onClick={handleToggleTheme}>
            Mudar o tema
          </button>
          <div data-testid="theme-display">{theme}</div>
        </div>
      );
    }

    render(<ThemeComponent />);

    const toggleThemeButton = screen.getByTestId("toggle-button");
    const themeDisplay = screen.getByTestId("theme-display");


    userEvent.click(toggleThemeButton);

    await waitFor(() => {
      expect(themeDisplay).toHaveTextContent("dark");
    });

    // Segundo clique para voltar para "light"
    userEvent.click(toggleThemeButton);

    await waitFor(() => {
      expect(themeDisplay).toHaveTextContent("light");
    });
  });
});
