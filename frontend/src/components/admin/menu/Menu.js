import { Link } from 'react-router-dom'
import './menu.scss'

const menuItems = [
    
        {
          id: 1,
          title: "Homepage",
          url: "/ad-home",
        },
        {
          id: 2,
          title: "Users",
          url: "/ad-home/users",
        },
        {
            id: 3,
            title: "Properties",
            url: "/ad-home/properties",
        },
        {
            id: 4,
            title: "Maintenances",
            url: "/ad-home/maintenances",
        },
        {
            id: 5,
            title: "Inventories",
            url: "/ad-home/inventories",
        },
        
]
const Menu = () => {
    return(
        <div className='menu'>
            {menuItems.map((item)=> (

                <div className="item" key={item.id}>
                    

                        <Link to={item.url} className='listItem'>
                            <span className="listItemtitle">{item.title}</span>
                        </Link>
                </div>
            ))}
        </div>
    )
}

export default Menu

