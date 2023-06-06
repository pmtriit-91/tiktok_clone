
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { TickBlue } from "../Icons";
import styles from './AccountsItem.module.scss'
import Image from "../Image";

const cx = classNames.bind(styles)

function AccountsItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image 
                className={cx('avatar')} 
                src={data.avatar}
                alt={data.full_name}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <TickBlue className={cx('check')} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountsItem;