import {
    LayoutDashboardIcon, BorderAllIcon,
    AlertCircleIcon,
    CircleDotIcon,
    BoxMultiple1Icon,
    
    LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon,
    BuildingStoreIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Shop',
        icon: LayoutDashboardIcon,
        BgColor: 'primary',
        to: '/shop'
    },
    {
        title: 'Product',
        icon: BuildingStoreIcon,
        BgColor: 'primary',
        to: '/product'
    },
    { header: 'Ui components' },
    {
        title: 'Chart',
        icon: AlertCircleIcon,
        BgColor: 'primary',
        to: '/cart'
    },
    {
        title: 'History',
        icon: CircleDotIcon,
        BgColor: 'primary',
        to: '/history'
    }
    //   {
    //     title: "Cards",
    //     icon: BoxMultiple1Icon,
    //     BgColor: 'primary',
    //     to: "/ui/cards",
    //   },
    //   {
    //     title: "Tables",
    //     icon: BorderAllIcon,
    //     BgColor: 'primary',
    //     to: "/ui/tables",
    //   },

    //   { header: 'Auth' },
    //   {
    //     title: 'Login',
    //     icon: LoginIcon,
    //     BgColor: 'primary',
    //     to: '/auth/login'
    // },
    // {
    //     title: 'Register',
    //     icon: UserPlusIcon,
    //     BgColor: 'primary',
    //     to: '/auth/register'
    // },
    // { header: 'Extra' },
    // {
    //     title: 'Icons',
    //     icon: MoodHappyIcon,
    //     BgColor: 'primary',
    //     to: '/icons'
    // },
    // {
    //     title: 'Sample Page',
    //     icon: ApertureIcon,
    //     BgColor: 'primary',
    //     to: '/sample-page'
    // },
];

export default sidebarItem;
