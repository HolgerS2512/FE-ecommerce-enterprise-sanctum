import React from 'react'
import { Heart, Profile, ShoppingCard } from '../icon/Icons';

const GetIconByName = ({ name, size = 24 }) => {
  switch (name) {
    case 'Heart': return <Heart size={size} /> 
    case 'ShoppingCard': return <ShoppingCard size={size} /> 
    case 'Profile': return <Profile size={size} /> 
    default: break;
  }
}

export default GetIconByName
