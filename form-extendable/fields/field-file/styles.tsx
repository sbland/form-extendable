import styled from 'styled-components';

export const FileListStyle = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const FileListItemStyle = styled.li`
  position: relative;
  border: 1px solid grey;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0;
  padding: 0;
  max-height: 10rem;
  min-height: 1.6rem;
  padding: 0 0 0 0.4rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  line-height: 1.6rem;
  min-width: 3rem;

  display: flex;

  img {
    height: 100%;
    max-width: 100%;
    margin-right: 0.2rem;
  }
  p {
    margin: 0;
    padding: 0;
    margin-right: 0.2rem;
  }
`;

export const FileListImageItemStyle = styled(FileListItemStyle)`
  height: 10rem;
  padding: 0.4rem;
`;

export const FileItemDeleteBtn = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  line-height: 2rem;
  background: white;
  border: 1px solid grey;
  border-radius: 2rem;
  cursor: pointer;
  margin: 0;
  padding: 0;
  span {
    margin: 0;
    padding: 0;
  }

  border: none;
  color: #555;
  outline: 1px solid #ddd;
  &:hover {
    background: #ddd;
    outline: none;
  }
`;

export const ImageItemDeleteBtn = styled(FileItemDeleteBtn)`
  width: 3rem;
  height: 3rem;
`;

export const FileItemBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AddFileListItem = styled(FileListItemStyle)`
  border: none;
  display: wrap;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

export const AddFileButton = styled.button`
  height: 3rem;
  width: 3rem;
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 100;
  background: white;
  border-radius: 4rem;
  cursor: pointer;
  border: none;
  color: #555;
  outline: 1px solid #ddd;
  &:hover {
    background: #ddd;
    outline: none;
  }
`;
