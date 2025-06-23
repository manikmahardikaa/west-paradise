import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function AddButton({ onClick, title }) {
    return (
        <Button
            onClick={onClick}
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#C62828" }}
            color="#fff"
            type="primary"
        >
            {title}
        </Button>
    );
}
