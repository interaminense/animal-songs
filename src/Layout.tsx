import { HTMLAttributes } from "react";

import "./Layout.scss";

export const Layout: React.FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return <div className="layout">{children}</div>;
};
