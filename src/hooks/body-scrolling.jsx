import { useEffect } from "react"
const useImperativeDisableScroll = ({ element, disabled }) => {
    useEffect(() => {
        if (!element) {
            return
        }

        element.style.overflowY = disabled ? 'hidden' : 'scroll'

        return () => {
            element.style.overflowY = 'scroll'
        }
    }, [disabled])
}


export { useImperativeDisableScroll }