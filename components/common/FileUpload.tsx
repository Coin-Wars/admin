import React from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import styled from 'styled-components'

export const FileUpload: React.VFC<DropzoneOptions> = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone(props)

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Перетащите сюда файлы, или нажмите, чтобы их выбрать</p>
      </Container>
    </div>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`
