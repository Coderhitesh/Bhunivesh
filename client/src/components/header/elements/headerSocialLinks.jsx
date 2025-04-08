import Link from 'next/link';

import { FaDribbble,FaInstagram,FaTwitter,FaFacebookF} from 'react-icons/fa';
const HeaderSocialLinks = function () {
  return (
    <div className="ltn__social-media">
      <ul>
        <li>
          <Link target='_blank' href="https://www.facebook.com/share/1FDbZLdPnh">  <FaFacebookF /> </Link>
        </li>
        <li>
          <Link target='_blank' href="https://www.instagram.com/bhuniveshindiapvt?igsh=MXA5dXdyMjhtOW50YQ==">  <FaInstagram /> </Link>
        </li>
        <li>
          <Link href="#">  <FaTwitter /> </Link>
        </li>

        {/* <li>
          <Link href="#">  <FaDribbble /> </Link>
        </li> */}
      </ul>
    </div>
  );
};


export default HeaderSocialLinks;