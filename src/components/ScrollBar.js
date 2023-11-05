import { Box, styled, alpha } from '@mui/material';
import React, { memo, forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';

const ScrollBar = forwardRef(({ children, sx, ...other}, ref) => {
    
    const StyledRootScrollbar = styled('div')(() => ({
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden',
    }));

    const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
        maxHeight: '100%',
        '& .simplebar-scrollbar': {
            '&:before': {
                backgroundColor: alpha(theme.palette.grey[600], 0.48),
            },
            '&.simplebar-visible:before': {
                opacity: 1,
            },
        },
        '& .simplebar-mask': {
            zIndex: 'inherit',
        },
    }));

    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (mobile) {
        return (
            <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return (
        <StyledRootScrollbar>
            <StyledScrollbar
                scrollableNodeProps={{
                    ref,
                }}
                clickOnTrack={false}
                sx={sx}
                {...other}
            >
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    )
})

ScrollBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default memo(ScrollBar);
