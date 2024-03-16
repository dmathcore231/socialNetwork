import './styles.scss'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { TabsProps } from '../../types/interfaces/TabsProps'

export function Tabs({ tabName, className }: TabsProps): JSX.Element {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tabs">
      {tabName.map((item, index) => {
        if (item.path) {
          return (
            <Link to={item.path} key={item.name}
              className={"tabs__item" +
                (location.pathname === item.path ? " tabs__item_active" : "") +
                (className ? ` ${className}` : "")
              }
            >
              {item.name}
            </Link>
          )
        } else {
          return (
            <div key={item.name}
              className={"tabs__item" +
                (activeTab === index ? " tabs__item_active" : "")
              }
              onClick={() => setActiveTab(index)}
            >
              {item.name}
            </div>
          )
        }
      })}
    </div>
  )
}
