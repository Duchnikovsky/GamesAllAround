import { BiSolidCategory, BiSolidContact } from "react-icons/bi";
import { IoExtensionPuzzle, IoHome } from "react-icons/io5";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

interface subcategoriesTypes {
  id: number;
  name: string;
  path: string;
}

interface categoriesTypes {
  id: number;
  name: string;
  icon: React.ReactNode;
  width: number;
  path: string;
  listed: boolean;
  subcategories?: subcategoriesTypes[];
}

export default function Categories() {
  const location = useLocation();

  const categories: categoriesTypes[] = [
    {
      id: 0,
      name: "Home page",
      icon: <IoHome />,
      width: 7.75,
      path: "/",
      listed: false,
    },
    {
      id: 1,
      name: "Categories",
      icon: <BiSolidCategory />,
      width: 9,
      path: "/categories",
      listed: true,
      subcategories: [
        { id: 1, name: "Adventure games", path: "games/adventure-games" },
        { id: 2, name: "Action games", path: "games/action-games" },
        { id: 3, name: "Sports games", path: "games/sports-games" },
        { id: 4, name: "RPG games", path: "games/rpg-games" },
        { id: 5, name: "Strategy games", path: "games/strategy-games" },
        { id: 6, name: "Simulation games", path: "games/simulation-games" },
        { id: 7, name: "Racing games", path: "games/racing-games" },
        { id: 8, name: "Horror games", path: "games/horror-games" },
        { id: 9, name: "MMO games", path: "games/mmo-games" },
        { id: 10, name: "Hack and slash", path: "games/hsh-games" },
      ],
    },
    {
      id: 2,
      name: "DLCS",
      icon: <IoExtensionPuzzle />,
      width: 5,
      path: "/dlcs",
      listed: false,
    },
    {
      id: 3,
      name: "About us",
      icon: <BiSolidContact />,
      width: 6.5,
      path: "/about-us",
      listed: false,
    },
  ];

  return (
    <div className="hidden h-20 pt-5 sm:flex gap-4 items-start">
      {categories.map((category: categoriesTypes) => (
        <div
          className={`flex flex-col text-gray-300 text-lg tracking-wide items-center overflow-hidden border-gray-300 hover:text-gray-100 hover:border-gray-100 cursor-pointer transition-all duration-300 ${
            category.path === location.pathname ? "border-b-2" : "border-b-0" 
          } ${category.listed ? "hover:bg-zinc-800/60" : "hover:bg-transparent"}`}
          style={{ width: `${category.width}rem`, height: "2rem" }}
          onMouseEnter={(event) => {
            if (event.target === event.currentTarget) {
              const height = 2 + (category.subcategories?.length || 0) * 2;
              (
                event.currentTarget as HTMLDivElement
              ).style.height = `${height}rem`;
            }
          }}
          onMouseOut={(event) => {
            if (
              event.currentTarget.contains(event.target as HTMLDivElement) &&
              !event.currentTarget.contains(
                event.relatedTarget as HTMLDivElement
              )
            ) {
              (event.currentTarget as HTMLDivElement).style.height = "2rem";
            }
          }}
          key={category.id}
        >
          <div className="flex flex-row gap-1">
            <div className="pt-1">{category.icon}</div>
            {category.name}
          </div>
          {category.listed && (
            <div className="w-full mt-1 flex flex-col">
              {category.subcategories?.map(
                (subCategory: subcategoriesTypes) => (
                  <Link to={subCategory.path} className="w-full text-base h-8 pl-2 flex items-center text-gray-300 hover:text-gray-100 hover:border-r-2">
                    {subCategory.name}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
