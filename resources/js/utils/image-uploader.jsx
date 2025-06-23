import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload, Popconfirm } from "antd";
import { useState } from "react";
import { supabase } from "./supabase-client";

export default function SupaImageUploader({
    bucket = "images",
    folder = "",
    onUpload,
    label = "Upload Gambar",
    previewStyle = {
        width: "100%",
        maxHeight: 160,
        objectFit: "cover",
        borderRadius: 6,
    },
    multiple = false,
}) {
    const [previewImages, setPreviewImages] = useState([]);

    const handleUpload = async ({ file, onSuccess, onError }) => {
        const filePath = folder
            ? `${folder}/${Date.now()}-${file.name}`
            : `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (error) {
            message.error("Upload gagal: " + error.message);
            onError?.(error);
        } else {
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);
            const publicUrl = data?.publicUrl;
            if (publicUrl) {
                setPreviewImages((prev) => [
                    ...prev,
                    { url: publicUrl, path: filePath },
                ]);
                onUpload?.(filePath);
            }
            message.success("Upload berhasil!");
            onSuccess?.();
        }
    };

    const handleDelete = async (filePath) => {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);

        if (error) {
            message.error("Gagal menghapus gambar: " + error.message);
        } else {
            setPreviewImages((prev) =>
                prev.filter((img) => img.path !== filePath)
            );
            message.success("Gambar berhasil dihapus!");
        }
    };

    return (
        <div>
            <Upload
                customRequest={handleUpload}
                showUploadList={false}
                accept="image/*"
                multiple={multiple}
            >
                <Button icon={<UploadOutlined />}>{label}</Button>
            </Upload>

            {previewImages.length > 0 && (
                <div
                    style={{
                        marginTop: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {previewImages.map((img, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 16,
                                background: "#f5f5f5",
                                border: "1px dashed #d9d9d9",
                                padding: 12,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                src={img.url}
                                alt={`Preview ${i}`}
                                width={200} // tambahkan lebar eksplisit
                                style={{
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    maxHeight: 120,
                                }}
                            />
                            <Popconfirm
                                title="Hapus gambar ini?"
                                onConfirm={() => handleDelete(img.path)}
                                okText="Ya"
                                cancelText="Batal"
                            >
                                <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    type="primary"
                                >
                                    Hapus
                                </Button>
                            </Popconfirm>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
