import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Link } from "@mui/material";

function MenuBreadcrumbs(props) {
    const { items } = props;
    
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                {items.map((item, index) => {
                    return(
                        <Link key={index} color="inherit" href={item.link} sx={{textDecoration: 'none'}}>
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
