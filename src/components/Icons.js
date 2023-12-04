import React from "react";
import { RiMenuFill, RiBarChartBoxFill, RiNotification3Fill, RiTimeLine, RiCheckDoubleLine, RiShoppingCartFill, RiEyeOffLine, RiEyeLine,
    RiCloseLine, RiExpandUpDownLine, RiUser3Fill, RiMoreLine, RiEditLine, RiDeleteBinLine, RiBox3Fill, RiWallet3Fill, RiShieldUserLine, RiGiftFill, 
    RiWalletFill, RiFileDownloadLine, RiSearch2Line, RiFileList2Fill, 
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

export const MenuIcon = (props) => { return <RiMenuFill color={props.color ? props.color : GetIconColor().default} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const DashboardIcon = (props) => { return <RiBarChartBoxFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const NotificationIcon = (props) => { return <RiNotification3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const ClockIcon = (props) => { return <RiTimeLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const CheckDoubleFillIcon = (props) => { return <RiCheckDoubleLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const CartIcon = (props) => { return <RiShoppingCartFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}

export const EyeOffIcon = (props) => { return <RiEyeOffLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const EyeIcon = (props) => { return <RiEyeLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const CloseIcon = (props) => { return <RiCloseLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const SortIcon = (props) => { return <RiExpandUpDownLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const UserIcon = (props) => { return <RiUser3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const MoreIcon = (props) => { return <RiMoreLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const EditIcon = (props) => { return <RiEditLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const DeleteIcon = (props) => { return <RiDeleteBinLine color={props.color ? props.color : GetIconColor().error} size={props.size ? props.size : iconFontSize.xs} {...props}/> }
export const ProductsIcon = (props) => { return <RiBox3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const WalletIcon = (props) => { return <RiWallet3Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const RolesIcon = (props) => { return <RiShieldUserLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const OffersIcon = (props) => { return <RiGiftFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const RequestWithDrawalIcon = (props) => { return <RiWalletFill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const FileDownloadIcon = (props) => { return <RiFileDownloadLine color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const SearchIcon = (props) => { return <RiSearch2Line color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
export const ReportsIcon = (props) => { return <RiFileList2Fill color={props.color ? props.color : GetIconColor().primary} size={props.size ? props.size : iconFontSize.xs} {...props} />}
