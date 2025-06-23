import { Input, Space } from "antd";

export default function SearchBar({ onSearch, onChange, value, width }) {
    return (
        <Space direction="horizontal">
            <Input.Search
                placeholder="Search..."
                allowClear
                enterButton="Search"
                onSearch={onSearch}
                onChange={(e) => onSearch(e.target.value)}
                value={value}
                style={{ width: width || 300 }}
            />
        </Space>
    );
}
