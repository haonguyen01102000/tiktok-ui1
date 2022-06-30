import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCloudUpload, faCoins, faEllipsisVertical, faGear, faKeyboard, faLanguage, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


import Button from '~/components/Button';
import images from '~/assets/images';
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config/';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng việt'
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },


            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts'
    }
]

function Header() {

    const currentUser = true





    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //hande change Languages
                break;

            default:
        }

    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoa'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]
    return (
        <header className={cx('wraper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}><img src={images.logo} alt="tiktok" /></Link>

                {/* Search */}
                <Search />

                <div className={cx('actions')}>

                    {
                        currentUser ? (
                            <>
                                <Tippy delay={[0, 200]} content="Upload Video" placement='bottom'>
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faCloudUpload} />
                                    </button>
                                </Tippy>

                                <Tippy delay={[0, 200]} content="Message" placement='bottom'>
                                    <button className={cx('action-btn')}>
                                        <MessageIcon className={cx('')} />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 200]} content="Inbox" placement='bottom'>
                                    <button className={cx('action-btn', 'inbox-icon')}>
                                        <InboxIcon />
                                        <span className={cx('notification')}>12</span>

                                    </button>
                                </Tippy>

                            </>
                        ) : (

                            <>
                                <Button text >Upload</Button>
                                <Button primary >Log in</Button>


                            </>

                        )
                    }
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {
                            currentUser ? (
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                                    alt="Nguyen Van a"
                                //fallBack='https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png'
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )
                        }

                    </Menu>
                </div>
            </div >
        </header >
    );
}

export default Header;