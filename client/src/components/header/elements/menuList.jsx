import Link from "next/link";
import { FaPlus, FaAngleDoubleRight } from "react-icons/fa";
const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/">
          Home 
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/shop/grid">
          Properties 
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/blog/grid">
          Blogs 
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/about">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      {/* <li style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <a style={{backgroundColor:'#C3D558',padding:'7px 10px', color:'white'}}>Get Inquiry</a>
      </li> */}
    </ul>
  );
};

export default MenuList;
