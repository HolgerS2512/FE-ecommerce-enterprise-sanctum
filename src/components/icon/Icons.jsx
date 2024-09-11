export const Visibility = ({ size, clr }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      height={`${size ?? 24}px`} viewBox="0 -960 960 960" 
      width={`${size ?? 24}px`}
      fill={`#${clr ?? '000'}`}><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
    </svg>
  )
}

export const VisibilityOff = ({ size, clr }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      height={`${size ?? 24}px`} viewBox="0 -960 960 960" 
      width={`${size ?? 24}px`} 
      fill={`#${clr ?? '000'}`}><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
    </svg>
  )
}

export const Xclose = ({ size, clr }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      height={`${size ?? 22}px`} viewBox="0 -960 960 960" 
      width={`${size ?? 22}px`} 
      fill={`#${clr ?? '000'}`}><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
    </svg>
  )
}

export const Checkmark = ({ size, clr }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      height={`${size ?? 22}px`} viewBox="0 -960 960 960" 
      width={`${size ?? 22}px`} 
      fill={`#${clr ?? '000'}`}><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z"/>
    </svg>
  )
}

export const Refresh = ({ size, clr }) => {
  return (
    <svg fill={`#${clr ?? '000'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 383.748 383.748" xmlSpace="preserve">
      <g>
        <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
          C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
          L2.081,34.641v113.365h113.91L62.772,95.042z"/>
        <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
          c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
          c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/>
      </g>
    </svg>
  )
}

export const Warning = ({ size, clr }) => {
  return (
    <svg height={`${size ?? 22}px`} width={`${size ?? 22}px`} xmlns="http://www.w3.org/2000/svg" fill={`#${clr ?? '000'}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  )
}

export const Close = ({ size, clr, stroke }) => {
  return (
    <svg fill={`#${clr ?? '000'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

export const Heart = ({ size, clr, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={`#${clr ?? '000'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  )
}

export const ShoppingCard = ({ size, clr, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={`#${clr ?? '000'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  )
}

export const Profile = ({ size, clr, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={`#${clr ?? '000'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
  )
}

export const ServiceHelp = ({ size, clr, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={`#${clr ?? 'fff'}`} height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  )
}

export const ArrowRight = ({ size, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill='none' height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 2} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export const ArrowDown = ({ size, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill='none' height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 2} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export const LinkIcon = ({ size, stroke }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill='none' height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  )
}

export const Gear = ({ size, clr = '6c757d' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={`${size ?? 22}px`} width={`${size ?? 22}px`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`#${clr}`} className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
    </svg>
  )
}
