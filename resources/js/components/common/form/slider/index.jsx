import { Form, Button, Space, Checkbox, Typography, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import SupaImageUploader from "../../../../utils/image-uploader";
import { supabase } from "../../../../utils/supabase-client";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function FormSlider({
    onSubmit,
    onCancel,
    title,
    process,
    initialValues,
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
        if (initialValues?.image_url) {
            setThumbnailPreview(initialValues.image_url);
            form.setFieldsValue({ image_url: initialValues.image_url });
        }
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
        >
            <h2>{title}</h2>

            <Form.Item
                label="Gambar"
                name="image_url"
                rules={[
                    { required: true, message: "Upload gambar diperlukan" },
                ]}
            >
                {/* <>
                    {thumbnailPreview && (
                        <img
                            src={thumbnailPreview}
                            alt="Preview"
                            style={{
                                border: "1px dashed #ccc",
                                width: "100%",
                                marginBottom: 10,
                                borderRadius: 8,
                            }}
                        />
                    )}
                    <SupaImageUploader
                        folder="sliders"
                        bucket="images"
                        label="Upload Gambar"
                        onUpload={(path) => {
                            const { data } = supabase.storage
                                .from("images")
                                .getPublicUrl(path);
                            const imageUrl = data.publicUrl;
                            setThumbnailPreview(imageUrl);
                            form.setFieldsValue({ image_url: imageUrl });
                        }}
                    />
                </> */}

                <>
                    {process === "update" && thumbnailPreview ? (
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
                                title="Hapus slider ini?"
                                onConfirm={async () => {
                                    const path =
                                        getPathFromUrl(thumbnailPreview); // ambil path dari URL
                                    const { error } = await supabase.storage
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
                                    Hapus Slider
                                </Button>
                            </Popconfirm>
                        </div>
                    ) : (
                        <SupaImageUploader
                            folder="thumbnails"
                            bucket="images"
                            label="Upload Slider"
                            onUpload={async (path) => {
                                const { data } = supabase.storage
                                    .from("images")
                                    .getPublicUrl(path);
                                const imageUrl = data.publicUrl;
                                form.setFieldsValue({
                                    image_url: imageUrl,
                                });
                                setThumbnailPreview(imageUrl);
                            }}
                        />
                    )}
                </>
            </Form.Item>

            <Form.Item name="is_published" valuePropName="checked">
                <Checkbox>
                    Publish{" "}
                    <Text italic type="secondary">
                        * Centang jika Destinasi Wisata dipublish.
                    </Text>
                </Checkbox>
            </Form.Item>

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
        </Form>
    );
}
