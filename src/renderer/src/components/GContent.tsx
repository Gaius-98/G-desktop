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
    const newArr = cloneDeepWith(appList)
    newArr.push(JSON.parse(data))
    setAppList(newArr)
    console.log(event)
  })
  const open = (e): void => {
    window.electron.ipcRenderer.send('open', e.path)
  }
  return (
    <div
      className="p-1 h-full  grid grid-cols-6 gap-y-2"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={dropApp}
    >
      {appList.map((e) => {
        return (
          <div
            key={e.name}
            onClick={() => open(e)}
            className="h-20 w-20 flex flex-col justify-around items-center  rounded-sm cursor-pointer p-1"
          >
            <img src={e.img} key={e.name} />
            <div
              key={e.name}
              className=" max-w-full text-ellipsis overflow-hidden whitespace-nowrap"
              title={e.name}
            >
              {e.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default GContent
