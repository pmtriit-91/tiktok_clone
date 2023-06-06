import classNames from 'classnames'
import { useState, forwardRef } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'

function Image({ src, alt, className, ...props }, ref) {

    const [fallback, setFallback] = useState('')

    const handleError = () => {
        setFallback(images.noImage)
    }

    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallback || src}
            ref={ref} {...props}
            onError={handleError}
            alt={alt}
        />
    );
}

export default forwardRef(Image);
