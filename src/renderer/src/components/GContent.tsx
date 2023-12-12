// import { ipcRenderer } from 'electron'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { cloneDeepWith } from 'lodash'
export interface AppInfo {
  path: string
  name: string
  img: string
}
interface ContentProps {
  appList: AppInfo[]
  setAppList: Dispatch<SetStateAction<AppInfo[]>>
}
const GContent = (props: ContentProps): ReactNode => {
  const { appList, setAppList } = props
  const dropApp = (e): void => {
    e.preventDefault()
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      window.electron.ipcRenderer.send(
        'getImage',
        JSON.stringify({
          name: e.dataTransfer.files[i].name,
          path: e.dataTransfer.files[i].path
        })
      )
    }
  }
  window.electron.ipcRenderer.on('getImage', (event, data) => {
    console.log(data)
    const newArr = cloneDeepWith(appList)
    newArr.push(JSON.parse(data))
    setAppList(newArr)
    console.log(appList)
  })
  const open = (e): void => {
    window.electron.ipcRenderer.send('open', e.path)
  }
  return (
    <div
      className="p-1 h-28 bg-slate-500"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={dropApp}
    >
      {appList.map((e) => {
        return (
          <div key={e.name} onClick={() => open(e)} className="h-32">
            <img src={e.img} key={e.name} className="h-2 w-10" />
            <span key={e.name}>{e.name}</span>
          </div>
        )
      })}
    </div>
  )
}
export default GContent
