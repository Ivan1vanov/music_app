import React, { useRef } from 'react'

interface IFileUpload {
    setFile: Function;
    accept: string
}

const FileUpload: React.FC<IFileUpload> = ({setFile, accept, children, }) => {
    const ref = useRef<HTMLInputElement>()

    const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

  return (
    <div onClick={() => ref.current.click()}>
        <input
        type="file"
        accept={accept}
        ref={ref}
        style={{display: 'none'}}
        onChange={onChangeUpload}
        />
        {children}
    </div>
  )
}

export default FileUpload