import { useState } from "react";
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import styles from './Menu.module.scss'
import MenuItems from "./MenuItems";
import Header from "./Header";

const cx = classNames.bind(styles)

const defaultFnc = () => { }

function Menu({ children, items = [], onChange = defaultFnc }) {

    const [history, setHistory] = useState([{ data: items }])
    console.log(history);
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory(prev => [...prev, item.children]);
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[12, 10]}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('menu-list')} tapindex='-1' {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={'Language'} onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;