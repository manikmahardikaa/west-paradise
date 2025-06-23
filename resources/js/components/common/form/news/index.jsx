import {
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Space,
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import SupaImageUploader from "../../../../utils/image-uploader";
import { supabase } from "../../../../utils/supabase-client";

export default function FormNews({
    onSubmit,
    onCancel,
    process,
    initialValues,
    title,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleFinish = async (values) => {
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                thumbnail: initialValues?.thumbnail || "",
            });

            setThumbnailPreview(initialValues?.thumbnail || "");
        }
    }, [initialValues]);

    return (
        <div>
            <Card style={{ borderRadius: 10 }}>
                <Title level={4}>{title}</Title>
                <Divider />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={initialValues}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Judul Berita"
                                rules={[
                                    {
                                        required: true,
                                        message: "Masukkan Judul Berita",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Judul Berita..." />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Thumbnail"
                                name="thumbnail"
                                rules={[
                                    {
                                        required: true,
                                        message: "Upload thumbnail",
                                    },
                                ]}
                            >
                                <>
                                    {process === "update" &&
                                    thumbnailPreview ? (
                                        <div style={{ marginBottom: 10 }}>
                                            <img
                                                src={thumbnailPreview}
                                                alt="Thumbnail Preview"
                                                style={{
                                                    border: "1px dashed #ccc",
                                                    width: "100%",
                                                    marginBottom: 10,
                                                    borderRadius: 8,
                                                    maxHeight: 200,
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Popconfirm
                                                title="Hapus thumbnail ini?"
                                                onConfirm={async () => {
                                                    const path =
                                                        getPathFromUrl(
                                                            thumbnailPreview
                                                        ); // ambil path dari URL
                                                    const { error } =
                                                        await supabase.storage
                                                            .from("images") // ganti jika nama bucket beda
                                                            .remove([path]);

                                                    if (error) {
                                                        message.error(
                                                            "Gagal menghapus gambar: " +
                                                                error.message
                                                        );
                                                    } else {
                                                        message.success(
                                                            "Thumbnail berhasil dihapus!"
                                                        );
                                                        setThumbnailPreview("");
                                                        form.setFieldsValue({
                                                            thumbnail: "",
                                                        });
                                                    }
                                                }}
                                                okText="Ya"
                                                cancelText="Batal"
                                            >
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    danger
                                                    type="primary"
                                                    size="large"
                                                >
                                                    Hapus Thumbnail
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    ) : (
                                        <SupaImageUploader
                                            folder="thumbnails"
                                            bucket="images"
                                            label="Upload Thumbnail"
                                            onUpload={async (path) => {
                                                const { data } =
                                                    supabase.storage
                                                        .from("images")
                                                        .getPublicUrl(path);
                                                const imageUrl = data.publicUrl;
                                                form.setFieldsValue({
                                                    thumbnail: imageUrl,
                                                });
                                                setThumbnailPreview(imageUrl);
                                            }}
                                        />
                                    )}
                                </>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Deskripsi"
                                rules={[
                                    {
                                        required: true,
                                        message: "Deskripsi harus diisi",
                                    },
                                ]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    onChange={(content) =>
                                        form.setFieldsValue({
                                            description: content,
                                        })
                                    }
                                    placeholder="Tulis Deskripsi..."
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="is_published"
                                valuePropName="checked"
                            >
                                <Checkbox>
                                    Publish{" "}
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                            color: "#888",
                                        }}
                                    >
                                        * Centang jika Berita Wisata dipublish.
                                    </span>
                                </Checkbox>
                            </Form.Item>
                        </Col>

                        <Space>
                            <Button onClick={onCancel} size="large" danger>
                                Batal
                            </Button>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                loading={loading}
                                style={{
                                    backgroundColor: "#22C55E",
                                    borderColor: "#22C55E",
                                }}
                            >
                                Simpan
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}
