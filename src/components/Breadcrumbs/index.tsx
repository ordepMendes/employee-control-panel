import { Link, UIMatch, useMatches } from "react-router-dom";

type BreadcrumbHandle = {
  breadcrumb: string;
};

const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle>[];

  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match, index) => {
      const isLast = index === matches.length - 1;
      const name = match.handle?.breadcrumb;
      const path = match.pathname;

      return (
        <span key={path} className="text-sm text-gray-500">
          {!isLast ? (
            <>
              <Link to={path} className="text-blue-600 hover:underline">
                {name}
              </Link>
              <span className="mx-1">/</span>
            </>
          ) : (
            <span className="font-medium text-gray-800">{name}</span>
          )}
        </span>
      );
    });

  return <div className="flex flex-wrap items-center">{breadcrumbs}</div>;
};

export default Breadcrumbs;
