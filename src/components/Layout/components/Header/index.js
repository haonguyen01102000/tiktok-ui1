import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleXmark, faCloudUpload, faCoins, faEllipsisVertical, faGear, faKeyboard, faLanguage, faMagnifyingGlass, faSignOut, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss'
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';
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
                }
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

    const [searchResults, setSearchResults] = useState([])
    const currentUser = true



    useEffect(() => {
        setTimeout(() => {
            setSearchResults([])
        }, 0)
    }, [])

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
                <img src={images.logo} alt="tiktok" />

                <HeadlessTippy
                    visible={searchResults.length > 0}
                    render={attrs => (

                        <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />

                            </PopperWrapper>
                        </div>


                    )}
                    interactive={true}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder='Search accounts and video'
                            spellCheck={false}
                        />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />

                        </button>
                    </div>
                </HeadlessTippy>
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