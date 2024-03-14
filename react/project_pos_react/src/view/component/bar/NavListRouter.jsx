import { MemoryRouter, Link as RouterLink } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import PropTypes from "prop-types";
import React from "react";
import { ListItemIcon, ListItemText, ListItem } from "@mui/material";

function NavigationRouter(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={[0]}>
      {children}
    </MemoryRouter>
  );
}

NavigationRouter.propTypes = {
  children: PropTypes.node,
};

const DirectLink = React.forwardRef(function DirectLink(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export default function ListItemLink(props) {
  const { icon, primary, to } = props;
  return (
    <li>
      <ListItem component={DirectLink} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : <ListItemIcon></ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
