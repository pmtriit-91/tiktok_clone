import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link } from 'react-router-dom'

import routesConfig from '~/config/routes'
import { Menu } from '~/components/Popper'
import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import { Coin, InboxIcon, Keyboard, Language, Logout, MessageIcon, Persion, PlusIcon, Question, Setting } from '~/components/Icons';
import Image from '~/components/Image'
import Search from '../Search'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <Language />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }

    },
    {
        icon: <Question />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <Keyboard />,
        title: 'Keyboard shortcuts',
    }
]

function Header() {

    const currentUser = true

    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // logic handle change language
                break;
            default:
        }
    }

    const userMenu = [
        {
            icon: <Persion />,
            title: 'View profile',
            to: '/hoaa'
        },
        {
            icon: <Coin className={cx('coin-icon')} />,
            title: 'Get Coins',
            to: '/coin'
        },
        {
            icon: <Setting />,
            title: 'Setting',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <Logout />,
            title: 'Log out',
            to: '/logout',
            separate: true
        }
    ]

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            <Link to={routesConfig.home} className={cx('logo')}><img src={images.logo} alt='Tiktok' /></Link>

            <Search />

            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Tippy content='Upload Video' placement='bottom' delay={[0, 100]}>
                            <Button className={cx('btn-upload')} outline>
                                <PlusIcon className={cx('icon-plus')} />
                                <span>Upload</span>
                            </Button>
                        </Tippy>
                        <Tippy content='Messages' placement='bottom' delay={[0, 100]}>
                            <button className={cx('action-btn')}><MessageIcon /></button>
                        </Tippy>
                        <Tippy content='Inbox' placement='bottom' delay={[0, 100]} offset={[0, 6]}>
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>12</span>
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button text>Upload</Button>
                        <Button primary>Log in</Button>

                    </>
                )}
                <Menu
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >

                    {currentUser ? (
                        <Image
                            className={cx('user-avatar')}
                            alt='Nguyen van A'
                            src='https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/7006132335699558402.jpeg?x-expires=1687183200&x-signature=Px40Ttae%2Fa0cXW%2BX4hGWvWTih1k%3D'
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>

        </div>
    </header >
}

export default Header;