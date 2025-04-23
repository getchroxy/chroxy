import classNames from "classnames";
import { ReactNode } from "react";

export interface ProxyItemProps {
  title: string;
  indicator?: true | false | null;
  onClick?: () => void;
  children?: ReactNode;
}

export function ProxyItem({
  title,
  indicator = null,
  onClick,
  children,
}: ProxyItemProps) {
  return (
    <button
      key={title}
      onClick={onClick || undefined}
      className={classNames(
        "flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded bg-gray-100 p-2 text-left text-sm whitespace-nowrap hover:bg-gray-200",
        {
          "justify-start border-l-4 border-emerald-500":
            indicator !== null && indicator,
          "justify-start border-l-4 border-gray-200":
            indicator !== null && !indicator,
          "pl-3": indicator === null,
        },
      )}
    >
      {children}
    </button>
  );
}

export default ProxyItem;
