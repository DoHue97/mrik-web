import React from "react";
import { RiMenuFill, RiBarChartBoxFill, RiNotification3Fill, RiTimeLine, RiCheckDoubleLine, RiShoppingCartFill, RiEyeOffLine, RiEyeLine,
    RiCloseLine, RiExpandUpDownLine, RiUser3Fill, RiMoreLine, RiEditLine, RiDeleteBinLine, 
} from 'react-icons/ri';
import { GetIconColor } from '../theme/main_style';

export const iconFontSize = {
    xxxs: 16,
    xxs: 20,
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40,
    xxl: 48,
    xxxl: 56
}

export const MenuIcon = (props) => { return <RiMenuFill color={props.color ? props.color : GetIconColor().default} size={props.size ? props.size : iconFontSize.xs} /> }
export const DashboardIcon = (props) => { return <RiBarChartBoxFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const NotificationIcon = (props) => { return <RiNotification3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const ClockIcon = (props) => { return <RiTimeLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const CheckDoubleFillIcon = (props) => { return <RiCheckDoubleLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const CartIcon = (props) => { return <RiShoppingCartFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }

export const EyeOffIcon = (props) => { return <RiEyeOffLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const EyeIcon = (props) => { return <RiEyeLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const CloseIcon = (props) => { return <RiCloseLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const SortIcon = (props) => { return <RiExpandUpDownLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const UserIcon = (props) => { return <RiUser3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const MoreIcon = (props) => { return <RiMoreLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const EditIcon = (props) => { return <RiEditLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} /> }
export const DeleteIcon = (props) => { return <RiDeleteBinLine color={props.color ? props.color : GetIconColor().error} size={props.size ? props.size : iconFontSize.xs} /> }