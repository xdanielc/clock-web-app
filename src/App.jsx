import React, { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/Tabs.jsx';
import City from './components/City.jsx';
import Alarm from './components/Alarm.jsx';
import Timer from './components/Timer.jsx'
import Stopwatch from './components/Stopwatch.jsx';

export const Context = React.createContext()
export const Hora = React.createContext()
export const TabContext = React.createContext()

function App() {
  const [data, setData] = useState(null)
  const [date, setDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('World clock');

  useEffect(() => {
    fetch('./data/cities.json')
    .then(res => res.json())
    .then(jsonData => setData(jsonData))
    .catch(err => console.error('Error fetching data', err))
  },
  [])

  return (
    <Hora.Provider value={[date, setDate]}>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        <Tabs>
            {activeTab === 'Alarm' && <Alarm/>}
            {activeTab === 'World clock' && data && <Citylist data={data}/>}
            {activeTab === 'Timer' && <Timer/>}
            {activeTab === 'Stopwatch' && <Stopwatch/>}
        </Tabs>
      </TabContext.Provider>
    </Hora.Provider>
  );
}

const Citylist = ({ data }) => {

  const [viewOffset, setViewOffset] = useState(0)

  return(
    <Context.Provider value={[viewOffset, setViewOffset]}>
      <City city="Seoul" UTCOffset={data['Seoul']}/>
      <City city="Tokio" UTCOffset={data['Tokio']}/>
      <City city="Madrid" UTCOffset={data['Madrid']}/>
      <City city="Los Angeles" UTCOffset={data['Los Angeles']}/>
    </Context.Provider>
  )
}

export default App;