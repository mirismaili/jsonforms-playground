import React, {useContext, useLayoutEffect, useRef, useState} from 'react'

/**
 * Created on 1400/9/12 (2021/12/3).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const LocationContext = React.createContext(window.location)
export const useLocation = () => useContext(LocationContext)

function LocationProvider(props) {
  // https://stackoverflow.com/a/46428962/5318303
  const [location, setLocation] = useState(() => window.location)
  const hrefRef = useRef(window.location.href)
  
  useLayoutEffect(() => {
    const observer = new MutationObserver(mutations =>
      mutations.forEach(_ => {
        const newLocation = window.location
        if (hrefRef.current !== newLocation.href) {
          hrefRef.current = newLocation.href
          setLocation({...newLocation})
        }
      }))
    
    observer.observe(document.body, {childList: true})
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  const children = props.children instanceof Function ? props.children({location}) : props.children
  
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}

export default React.memo(LocationProvider)
