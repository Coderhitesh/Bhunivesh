import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer, // Dashboard
  cilImage,       // Banner & Images
  cilText,        // Testimonial & Blogs
  cilUser,        // All User
  cilGroup,       // All Provider
  cilChatBubble,  // All Chat
  cilWallet,      // Withdraw Request
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Banner',
    to: '/banner/all-banner',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All City',
    to: '/location/all-location',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Property Type',
    to: '/property-type/all-property-type',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Property',
    to: '/property/all-property',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Blogs',
    to: '/blogs/all_blogs',
    icon: <CIcon icon={cilText} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Property Inquiry',
    to: '/property_inquiry/all_property_inquiry',
    icon: <CIcon icon={cilText} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Inquiry',
    to: '/inquiry/all_inquiry',
    icon: <CIcon icon={cilText} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Company Image',
    to: '/company_image/all_company_image',
    icon: <CIcon icon={cilText} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Team',
    to: '/team/all_team',
    icon: <CIcon icon={cilText} customClassName="nav-icon" />,
  },
]

export default _nav
