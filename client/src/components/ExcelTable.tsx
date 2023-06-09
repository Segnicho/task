import React, { useState } from "react";
import { Table, Button, Popconfirm, Input } from "antd";
import * as xlsx from "xlsx";
import axios from "axios";

interface RowData {
  key: number;
  [key: string]: string | number;
}

const ExcelToJsonTable: React.FC = () => {
  const [jsonData, setJsonData] = useState<RowData[]>([]);

  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet) as RowData[];
        const updatedJson = json.map((row, index) => ({ ...row, key: index }));
        setJsonData(updatedJson);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDelete = async (key: number) => {
    const updatedJson = jsonData.filter((row) => row.key !== key);
    setJsonData(updatedJson);
    try {
      await axios.delete(`/api/products/${key}`);
      console.log("Row deleted successfully");
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const handleFieldChange = async (
    value: string,
    dataIndex: string,
    key: number
  ) => {
    const updatedJson = jsonData.map((row) => {
      if (row.key === key) {
        return { ...row, [dataIndex]: value };
      }
      return row;
    });
    setJsonData(updatedJson);

    try {
      await axios.put(`/api/products/${key}`, { [dataIndex]: value });
      console.log("Field updated successfully");
    } catch (error) {
      console.error("Failed to update field:", error);
    }
  };

  const columns = jsonData.length
    ? Object.keys(jsonData[0]).map((key) => ({
        title: key,
        dataIndex: key,
        render: (_: any, record: RowData) => (
          <Input
            value={record[key]}
            onChange={(e) => handleFieldChange(e.target.value, key, record.key)}
          />
        ),
      }))
    : [];

  columns.push({
    title: "Action",
    dataIndex: "action",
    render: (_: any, record: RowData) => (
      <Popconfirm
        title="Are you sure you want to delete this row?"
        onConfirm={() => handleDelete(record.key)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link">Delete</Button>
      </Popconfirm>
    ),
  });

  return (
    <div>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>

      <Table dataSource={jsonData} columns={columns} />
    </div>
  );
};

export default ExcelToJsonTable;
