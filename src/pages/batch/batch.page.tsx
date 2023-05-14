import { Button, Table } from "antd";
import { useContext } from "react";
import { ResultsContext } from "../../state/results";
import "./batch.scss";
import MultiUpload from "./multi-upload.component";
import { useNavigate } from "react-router-dom";
import useBlock from "../../hooks/block.hook";

const columns = [
  {
    title: 'File Name',
    dataIndex: 'name',
    key: 'name',
    width: '50%',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    render: (text: string, record: { size: number; }) => {
      const size = record.size / 1024; 
      return <span>{size.toFixed(2)} KB</span>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string, record: { status: string; }) => (
      <span>
        {record.status === 'done' && <span style={{ color: 'green' }}>Uploaded</span>}
        {record.status === 'uploading' && <span style={{ color: 'blue' }}>Uploading</span>}
        {record.status === 'error' && <span style={{ color: 'red' }}>Error</span>}
      </span>
    ),
  },
];


const Batch = () => {
  const { state: { busy, fileList } } = useContext(ResultsContext);
  useBlock(busy, 'Your files are still uploading, sure you want to leave?');
  const navigate = useNavigate();
  const disableBtn = busy || fileList.length === 0;
  return (
    <div className="container">
      <div className="multi-upload-container">
        <div className="multi-upload">
          <MultiUpload />
        </div>
      </div>
      <div className="file-list-container">
        <h2 className="text">Uploaded Files</h2>
        <Table columns={columns} dataSource={fileList} pagination={false} />
      </div>
      <div className="buttons">
        <Button className="results-btn" size="large" disabled={disableBtn} onClick={() => navigate('/results')}>
          See Results
        </Button>
      </div>
    </div>
  );
};

export default Batch;
