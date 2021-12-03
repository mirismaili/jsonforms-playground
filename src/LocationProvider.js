import React, {useContext, useLayoutEffect, useReducer, useRef} from 'react'

/**
 * Created on 1400/9/12 (2021/12/3).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const LocationContext = React.createContext(window.location)
export const useLocation = () => useContext(LocationContext).location
export const useParams = () => useContext(LocationContext).params

const reducer = (state, newLocation) => ({
  location: newLocation,
  search: newLocation.search,
  params: newLocation.search === state.search
    ? state.params
    : parseSearchParams(new URL(newLocation.href).searchParams),
})

function LocationProvider(props) {
  const hrefRef = useRef(window.location.href)
  
  const [{location, params}, dispatch] = useReducer(reducer, undefined, () => {
    const location = window.location
    return {
      location,
      search: location.search,
      params: parseSearchParams(new URL(location).searchParams),
    }
  })
  // console.debug({hash: location.hash, params})
  
  useLayoutEffect(() => {
    const observer = new MutationObserver(mutations =>
      mutations.forEach(_ => {
        const newLocation = window.location
        if (hrefRef.current !== newLocation.href) {
          hrefRef.current = newLocation.href
          dispatch({...newLocation})
        }
      }))
    
    observer.observe(document.body, {childList: true})
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  const providedValue = {location, params}
  
  const children = props.children instanceof Function ? props.children(providedValue) : props.children
  
  return (
    <LocationContext.Provider value={providedValue}>
      {children}
    </LocationContext.Provider>
  )
}

export default React.memo(LocationProvider)

// https://stackoverflow.com/a/52539264/5318303
export function parseSearchParams(params) {
  const result = {}
  for (const [key, value] of params.entries()) {
    if (!(key in result)) {
      result[key] = value
      continue
    }
    if (result[key] instanceof Array) {
      result[key].push(value)
      continue
    }
    result[key] = [result[key], value]
  }
  return result
}
