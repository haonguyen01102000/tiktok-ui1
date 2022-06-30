import { useState, forwardRef } from 'react'
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './image.module.scss'
import PropTypes from 'prop-types';
const Image = forwardRef(({ className, src, alt, fallBack: customFallBack = images.noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('')
    const handleError = () => {
        setFallBack(customFallBack)
    }
    return (
        <img className={classNames(styles.wrapper, className)} ref={ref} src={fallBack || src} alt={alt} {...props} onError={handleError} />
    );
})
Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallBack: PropTypes.string,
}
export default Image;