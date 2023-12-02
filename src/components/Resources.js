import React from "react";
import {
  Row,
  Typography,
  Icon,
  Upload,
  message,
  Button,
  Table,
  Divider,
} from "antd";
// import FileSaver from "file-saver";
import moment from "moment";

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = Math.pow(10, 2);
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / k ** i).toFixed(dm)) + " " + sizes[i];
}

class Resources extends React.Component {
  state = {
    previewFile: "",
    showPreview: false,
    fileList: [
      {
        uid: "rc-upload-1701161723383-3",
        lastModified: 1701058977589,
        url: "https://www.africau.edu/images/default/sample.pdf",
        lastModifiedDate: "2023-11-27T04:22:57.589Z",
        name: "simple.pdf",
        size: 9,
        type: "application/pdf",
        percent: 100,
        originFileObj: {
          uid: "rc-upload-1701161723383-3",
        },
        status: "done",
        response: "",
        xhr: {},
        uploadedDate: "28-Nov-23 13:00",
      },
      {
        uid: "rc-upload-1701322273426-7",
        lastModified: 1701322396957,
        lastModifiedDate: "2023-11-30T05:33:16.957Z",
        name: "Adobe.pdf",
        size: 7945,
        type: "application/pdf",
        percent: 100,
        url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
        originFileObj: {
          uid: "rc-upload-1701322273426-7",
        },
        status: "done",
        response: "",
        xhr: {},
      },
    ],
  };

  columns = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "File Format",
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{text.split("/")[1]}</span>,
    },
    {
      title: "File Size",
      dataIndex: "size",
      key: "size",
      render: (size) => <span>{formatBytes(size)}</span>,
    },
    {
      title: "Uploaded On",
      dataIndex: "uploadedDate",
      key: "uploadedDate",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <span>
          <a onClick={() => this.handleView(record)}>
            <Icon type="eye" />
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDownload(record)}>
            <Icon type="download" />
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>
            <Icon type="delete" />
          </a>
        </span>
      ),
    },
  ];

  handleView = (file) => {
    var blob = new Blob([file.originFileObj], { type: file.type });
    let preview = file.url || URL.createObjectURL(blob);

    this.setState({ showPreview: true, previewFile: preview });
  };

  handleDelete = ({ uid, name }) => {
    this.setState({
      fileList: [...this.state.fileList.filter((file) => file.uid !== uid)],
    });
    message.success(`${name} file deleted successfully`);
  };

  handleDownload = (file) => {
    var blob = new Blob([file], { type: file.type });

    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    downloadLink.download = file.name;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  handleFileChange = ({ file }) => {
    if (file.status !== "uploading") {
      console.log(file, this.state.fileList);
    }
    if (file.status === "done") {
      const now = new Date();
      const formattedDateTime = moment(now).format("DD-MMM-YY HH:mm");

      this.setState({
        fileList: [
          ...this.state.fileList,
          { ...file, uploadedDate: formattedDateTime },
        ],
      });
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  render() {
    return (
      <div
        style={{
          margin: 24,
          backgroundColor: "white",
          padding: 24,
        }}
      >
        <Row type="flex" justify="space-between" style={{ marginTop: 24 }}>
          <Typography.Title level={4}>Files</Typography.Title>
          <Upload
            action="https://run.mocky.io/v3/8d013d67-3d60-4ab4-aecf-51a2159c4652"
            showUploadList={false}
            accept=".pdf"
            onChange={this.handleFileChange}
          >
            <Button type="primary">Upload</Button>
          </Upload>
        </Row>
        <Table columns={this.columns} dataSource={this.state.fileList} />
        {this.state.showPreview && (
          <div style={{ width: "100%", height: "500px" }}>
            <iframe
              title="Preview"
              width="100%"
              height="100%"
              src={this.state.previewFile}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Resources;
