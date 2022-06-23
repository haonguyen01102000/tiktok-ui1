

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss'
import { SearchIcon, } from '~/components/Icons';


const cx = classNames.bind(styles)


function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)


    const inputRef = useRef()

    useEffect(() => {

        if (!searchValue.trim()) {
            setSearchResults([])
            return
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResults(res.data);
                setLoading(false)

            })
    }, [searchValue])

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }
    return (
        <HeadlessTippy
            visible={showResult && searchResults.length > 0}
            render={attrs => (

                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResults.map((result) =>
                        (
                            <AccountItem key={result.id} data={result} />
                        ))}



                    </PopperWrapper>
                </div>


            )}
            interactive={true}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Search accounts and video'
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}


                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />

                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;