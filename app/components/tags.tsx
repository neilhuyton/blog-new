import { Link } from "@remix-run/react";
import type { Tag } from "@prisma/client";

interface TagsProps {
  tags: Tag[];
  showHeader?: boolean;
}

export default function Tags({ tags, showHeader = false }: TagsProps) {
  return (
    <div className="mt-14 first:mt-0">
      {showHeader && (
        <h3 className="mt-0 mb-8 font-semibold leading-6 text-lg">Tags</h3>
      )}
      <div className="mb-1 flex flex-wrap">
        {tags.map((tag: Tag) => (
          <Link
            to={`${tag.slug}`}
            className="text-sm mt-0 mr-3 mb-4 ml-0 bg-tag-light dark:bg-tag-dark flex text-center h-8 leading-8 py-0 px-3 rounded-2xl items-center transition duration-250"
            key={tag.slug}
          >
            <>
              {/* bg-tag-react bg-tag-remix bg-tag-freedombox */}
              <span
                className={`w-2 h-2 mr-2 bg-tag-${tag.slug} rounded-2xl`}
              ></span>
              {tag.name}
            </>
          </Link>
        ))}
      </div>
    </div>
  );
}
