import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import HeadLessTippy from '@tippyjs/react/headless'

// import request from '~/utils/request' // cách dùng bình thường không custom return res.data
// import * as request from '~/utils/request' // cách dùng custom return res.data
import * as searchServices from '~/services/searchService'

import styles from './Search.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountsItem from '~/components/AccountsItem'
import { Loading, SearchIcon } from '~/components/Icons'
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounced = useDebounce(searchValue, 500)

    const inputRef = useRef()

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        // setLoading(true) // sử dụng với tất cả trừ trường hợp số 5 sẽ được đẩy vào trong fetchApi

        //1. cách dùng với fetch API
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setSearchResult(res.data)
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //         setLoading(false)
        //     })


        // 2. cách dùng với thư viện axios
        // axios.get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        //     params: {
        //         q: debounced,
        //         type: 'less', //type less/more , link https://fullstack.edu.vn/learning/reactjs?id=a49f4b81-074d-4ede-8dbb-eafbea7e94c2
        //     }
        // })
        //     // .then(res => res.json())   //axios tự chuyển đổi file json nên không cần bước này như fetch
        //     .then(res => {
        //         console.log(res); //check res axios trả về

        //         setSearchResult(res.data.data)
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //         setLoading(false)
        //     })

        // 3. cách dùng với module axios từ bên ngoài import vào và custom return res.data
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         }
        //     })
        //     .then(res => {
        //         console.log(res.data)
        //         // setSearchResult(res.data.data) // không custom
        //         setSearchResult(res.data) // custom
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //         setLoading(false)
        //     })

        // 4. cách dùng với async/await
        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             }
        //         })
        //         setSearchResult(res.data)
        //         setLoading(false)
        //     } catch (error) {
        //         setLoading(false)
        //     }
        // }
        // fetchApi()

        // 5. cách dùng với module api được import từ bên ngoài vào
        const fetchApi = async () => {
            setLoading(true)

            const result = await searchServices.search(debounced)
            console.log('kq:', result)
            setSearchResult(result)

            setLoading(false)
        }
        fetchApi()
    }, [debounced])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }



    return (
        //bọc thẻ div để remove warning tippy
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
                        onChange={handleChange}
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
                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon className={cx('searchIcon')} />
                    </button>
                </div>
            </HeadLessTippy>
        </div>
    );
}

export default Search;