import './styles/topbar.css'
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare, FaInstagramSquare } from 'react-icons/fa'

const TopBar = () => {
  return (
    <div className="top">
      <div className="topLeft">
        <FaFacebookSquare />
        <FaTwitterSquare />
        <FaPinterestSquare />
        <FaInstagramSquare />
        </div>

      <div className="topCentre">
        <ul className='topList'>
          <li className='topListItem'><a href="#">HOME</a></li>
          <li className='topListItem'><a href="#">ABOUT</a></li>
          <li className='topListItem'><a href="#">CONTACT</a></li>
          <li className='topListItem'><a href="#">WRITE</a></li>
          <li className='topListItem'><a href="#">LOGOUT</a></li>

        </ul>
      </div>
      <div className="topRight">
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default TopBar