import { Link } from "@remix-run/react";
import { BaseImage } from "remix-image";

import { Theme, useTheme } from "~/utils/theme-provider";

export function Header() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <header className="my-10">
      <div className="px-4">
        <div className="shadow-l dark:shadow-d bg-panel-light dark:bg-panel-dark py-5 px-8 rounded-2xl flex flex-wrap items-center justify-between">
          <Link to="/" prefetch="render">
            <BaseImage
              className="max-h-6"
              loaderUrl="/api/image"
              src="/images/blog/logo9-light.png"
            />
          </Link>
          <nav
            className="flex flex-wrap items-center"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="flex">
              <button
                className="flex wrap items-center border-none fill-light hover:fill-highlight dark:fill-dark dark:hover:fill-highlight"
                aria-label="Toggle theme"
              >
                <div className="flex">
                  {theme === Theme.LIGHT ? (
                    <div onClick={toggleTheme}>
                      <svg className="w-5 h-5">
                        <use href="#i-moon"></use>
                      </svg>
                    </div>
                  ) : (
                    <div onClick={toggleTheme}>
                      <svg className="w-5 h-5">
                        <use href="#i-sun"></use>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
