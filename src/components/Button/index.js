import classNames from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'
import {forwardRef} from 'react'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    rounded = false,
    text = false,
    disable = false,
    large = false,
    small = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}, ref) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }

    //khi button co type disable thi xoa props.onClick
    //case1
    // if(disable){
    //     delete props.onClick
    // }
    //case2
    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        rounded,
        text,
        disable,
        small,
        large,
        [className]: className,
        leftIcon,
        rightIcon,
    })

    return (
        <Comp className={classes} ref={ref} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default forwardRef(Button);