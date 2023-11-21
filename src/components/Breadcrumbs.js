import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Link, useTheme } from "@mui/material";

function MenuBreadcrumbs(props) {
    const { items } = props;
    const theme = useTheme();

    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                {items.map((item, index) => {
                    return (
                        <Link key={index} color="inherit" href={item.link} sx={{
                            textDecoration: 'none',
                            ':hover': {
                                color: item.link ? theme.palette.primary.main : undefined,
                            }
                        }}>
                            {item.name}
                        </Link>
                    )
                })}
            </Breadcrumbs>
        </div>
    )
}

MenuBreadcrumbs.propTypes = {
    items: PropTypes.array,
}

export default MenuBreadcrumbs;
