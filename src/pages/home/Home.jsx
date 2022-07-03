

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HomeItem } from '../../components/HomeItem/HomeItem'
import "./_home.scss"
// import data from "../../data/db.json"

const Home = () => {

  const [items, setItems] = useState([])
  // const [items, setItems] = useState(data.parathas)

  useEffect(() => {
    axios.get("http://localhost:8000/parathas").then((res) => {
      setItems(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  return (
    <section className='home'>
      <h3 className='home__heading'>Top Most Featured</h3>
      <div className='home__grid'>
        {
          items?.map((item) => <HomeItem key={item.id} item={item} />)
        }
      </div>
    </section>
  )
}

export default Home