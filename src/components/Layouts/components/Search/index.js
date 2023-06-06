import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import HeadLessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountsItem from '~/components/AccountsItem';
import { Loading, SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data);
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

    }, [searchValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <div>
            <HeadLessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={attrs => (
                    <div className={cx('search-result')} tapindex='-1' {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map(result => (
                                <AccountsItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    )}
                    {loading && <Loading className={cx('loading')} />}
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadLessTippy>
        </div>
    );
}

export default Search;