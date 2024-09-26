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
    <svg xmlns="http://www.w3.org/2000/svg" fill='none' height={`${size ?? 22}px`} width={`${size ?? 22}px`} viewBox="0 0 24 24" strokeWidth={stroke ?? 2} stroke="currentColor" className="size-6 no-action">
      <path className="no-action" strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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

export const Filter = ({ size = 22 }) => {
  return (
    <>
      <svg
      version="1.1"
      id="svg132"
      width={size + 'px'}
      height={size + 'px'}
      viewBox="0 0 454 454"
      sodipodi:docname="filter.png"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <defs
        id="defs136" />
      <sodipodi:namedview
        id="namedview134"
        pagecolor="#505050"
        bordercolor="#eeeeee"
        borderopacity="1"
        inkscape:showpageshadow="0"
        inkscape:pageopacity="0"
        inkscape:pagecheckerboard="0"
        inkscape:deskcolor="#505050"
        showgrid="false" />
      <g
        inkscape:groupmode="layer"
        inkscape:label="Image"
        id="g138">
        <image
          width="454"
          height="454"
          preserveAspectRatio="none"
          // style="image-rendering:optimizeQuality"
          xlinkHref="data:image/png;base64,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
    jLvvjOox1Z8bit32weqntyqKAMK4fr7U2ATgBdk+7vr6+2kM/85QAHPlVOr189hp1nNPL6GdcmFj
    kc0J1VlbfTBOpQLCuDHuUD2rsb8q1+wdjQv3T5rLAQkjIIwbZ/8pjE+tjvBy+hYvayxaet+cDkoY
    AWHceHerjm+cXmXcWPjExmeK583t4IQREMbNcePqgdVTqvuv6Ovpq9XvNFbvfmKuBymMgDBurltV
    D5kCedSKvI4url5avb6xGcIlcz5YYQSEcWscVR1bPaM6cklfP5dUL6lOrj5Qnb8IBy2MgDBunRtU
    t2mcWv3JxmeRy+CC6uWNlaYfbIafIwojIIzztr06pLp9dVz1uGqPBXwcb6v+cPr184sWRGEEhHGe
    DqgOrh5cPaq638yP96zGZ4evrz5Ufbm6bJGfAGEEhHGe9mqsZD2w+oHGgp37z2Qm+d7qlMbWbZ9p
    fHb41WUZeGEEhHH+9qz2rvarvqu6R3VM4zPJgza6E9V7GqtJT2/sVPPZxjZuFy/jYAsjIIwL9pxM
    odxj+vWw6k7V4dWtp69bVbec/vvOOrv6ZPXf1aemrzMau9Jc1Lhp8I4W/DSpMALCuBpuMAVz21V+
    v1fjM8u9GtvT7Tv9/xdPsTuvsYL0gil4l08zxLWr/H6lCCOwFGEEgM2aiQAAwggAwggAwggAwggA
    wggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggAwggA
    CCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMACCMA
    CCMACCMACCMACCMACCMAIIwAIIwAIIwAIIwAIIwAIIwAIIwAIIwAIIwAIIwAIIwAsOX2MATAtdm2
    bdsqPdz9q1tXt6luW92iOri66ZW+Dqz2rbZfx/e6vLq0Oqf68lW+vlB9pPpo9anq7OtzsGtra16g
    G/GaN7DAiofxqOru1XdMv//26pZTBDfS+VMUz5y+Pl69q3pbdZEwCiMgjJvpu6t7VXerjq5uXx0w
    g+P6WPXh6v3VW6tTq3OFURgBYdwIh1aPrO5X3a5xqnSfGR/vmVMoT6/+unqHMAojIIzr4S7Vj1b3
    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
    Lt+4wFDMajZ/avW8VR4Ei2+AzXvDufoVri9v7ACz3QhtuQ83LuR/yzfVcsU6YcYIbLUnNfYpZWt9
    vvrVq0ZxFQkjsNUua+zB+W5DsWW+1riE5jWGQhiB+cxWntA4lcfmuqj63VZ4sY0wAnP1/urHG9fP
    sTkurn67+mVDIYzAPL1tiuNHDcWG29G4gF8UhRGYudMaN8R1WnXjXFq9qPpFQyGMwGJ4c+Mzx7cb
    inV3bvXc6pmG4uq5jhHYvDecXb9Tx1GNRSEPMnrr4jNTFF+2K3/IdYwA83FG9Zjqzw3Fbvtg9dO7
    GsVVJIzA3H2psQnAC7J93PX199MY/p2huG5OpQKb94az+zc9fuw067mn0dwpFzYW2ZxQnXV9v8mq
    dUIYgUUKY9Udqmc19lflmr2jceH+Sbv7jYQRYN5hrNp/CuNTqyOM7Ld4WWPR0vvW45sJI8D8w3iF
    u1XHN06vMm4sfGLjM8Xz1uubCiPA4oSx6sbVA6unVPdf0aH9avU7jdW7n1jvby6MAIsVxivcqnrI
    FMijVmRIL65eWr2+sRnCJRvxlwgjwGKG8QpHVcdWz6iOXNKhvKR6SXVy9YHq/I38y4QRYLHDWOMa
    7ds0Tq3+ZOOzyGVwQfXyxkrTD66trZ3nVSWMgDDuiu3VIdXtq+Oqx1V7LODQva36w+nXzzctrPH+
    LYyAMO6OA6qDqwdXj6ruN/PhOqvx2eHrqw9VX64uu/L/4P1bGAFhXA97NVayHlj9QGPBzv1nMpN8
    b3VKY+u2zzQ+O/zqNf3P3r+FERDG9bZntXe1X/Vd1T2qYxqfSR60wX/3WvWexmrS0xs71Xy2sY3b
    xTv1Dbx/CyMgjBt5eFMo95h+Pay6U3V4devp61bVLaf/vrPOrj5Z/Xf1qenrjMauNBc1bhq8o6uc
    JhVGYQSEcY5uMAVz21V+v1fjM8u9GtvT7Tv9/xdPsTuvsYL0gil4l08zxLWr/H73ppzev4URADbj
    X0MAgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDACgDAC
    gDACgDACgDACgDACgDACAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMII
    AMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAMIIAAgjAAgjAAgjAAgjAAgjAAgjAAgjAAgjAAgj
    AAgjAAgjAAgjAAgjAAgjAAgjAAgjAAgjAAgjAAgjACyt/z8AsQN13jaUue8AAAAASUVORK5CYII=
    "
          id="image140" />
      </g>
    </svg>
    </>
  )
}
