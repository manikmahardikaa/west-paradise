import {
    Form,
    Input,
    Select,
    DatePicker,
    TimePicker,
    Checkbox,
    Button,
    Card,
    Row,
    Col,
    Divider,
    Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import SupaImageUploader from "@/utils/image-uploader";
import { supabase } from "@/utils/supabase-client";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../../map";
import { usePage } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";

export default function FormEvent({
    onSubmit,
    onCancel,
    process,
    initialValues,
    title,
    categories,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleFinish = async (values) => {
        setLoading(true);
        const formattedValues = {
            ...values,
            start_time: values.start_time
                ? dayjs(values.start_time).format("HH:mm")
                : null,
            end_time: values.end_time
                ? dayjs(values.end_time).format("HH:mm")
                : null,
            start_date: values.start_date
                ? dayjs(values.start_date).format("YYYY-MM-DD")
                : null,
            end_date: values.end_date
                ? dayjs(values.end_date).format("YYYY-MM-DD")
                : null,
        };
        await onSubmit(formattedValues);
        setLoading(false);
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                start_date: initialValues?.start_date
                    ? dayjs(initialValues.start_date, "YYYY-MM-DD")
                    : null,
                end_date: initialValues?.end_date
                    ? dayjs(initialValues.end_date, "YYYY-MM-DD")
                    : null,
                start_time: initialValues?.start_time
                    ? dayjs(initialValues.start_time, "HH:mm")
                    : null,
                end_time: initialValues?.end_time
                    ? dayjs(initialValues.end_time, "HH:mm")
                    : null,
                thumbnail: initialValues.thumbnail || "",
                category_id:
                    initialValues?.category?.id || initialValues?.category_id,
            });
            setThumbnailPreview(initialValues.thumbnail || "");
        }
    }, [initialValues]);

    const defaultPosition = [-8.3556, 114.6418];
    const latlng =
        initialValues && initialValues.latitude
            ? parseFloat(initialValues.latitude)
            : null;
    const lnglng =
        initialValues && initialValues.longitude
            ? parseFloat(initialValues.longitude)
            : null;

    const defaultLatlng =
        latlng !== null && lnglng !== null ? [latlng, lnglng] : defaultPosition;

    const { category } = usePage().props;

    return (
        <Card style={{ borderRadius: 10 }}>
            <h3>{title}</h3>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    ...initialValues,
                    start_date: initialValues?.start_date
                        ? dayjs(initialValues.start_date, "YYYY-MM-DD")
                        : null,
                    end_date: initialValues?.end_date
                        ? dayjs(initialValues.end_date, "YYYY-MM-DD")
                        : null,
                    start_time: initialValues?.start_time
                        ? dayjs(initialValues.start_time, "HH:mm")
                        : null,
                    end_time: initialValues?.end_time
                        ? dayjs(initialValues.end_time, "HH:mm")
                        : null,
                    category_id:
                        initialValues?.category?.id ||
                        initialValues?.category_id,
                }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Nama Acara"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan Nama Acara",
                                },
                            ]}
                        >
                            <Input placeholder="Masukkan Nama Acara..." />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Jenis Kategori"
                            name="type_category"
                            rules={[
                                {
                                    required: true,
                                    message: "Pilih jenis kategori",
                                },
                            ]}
                        >
                            <Select placeholder="Pilih Jenis Kategori">
                                <Select.Option value="Umum">Umum</Select.Option>
                                <Select.Option value="Khusus">
                                    Khusus
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Kategori"
                            name="category_id"
                            rules={[
                                { required: true, message: "Pilih kategori" },
                            ]}
                        >
                            <Select placeholder="Pilih Kategori">
                                {category?.map((item) => (
                                    <Select.Option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name_category}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Thumbnail"
                            name="thumbnail"
                            rules={[
                                { required: true, message: "Upload thumbnail" },
                            ]}
                        >
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
                                            const { data } = supabase.storage
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
                            label="Deskripsi"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Deskripsi harus diisi",
                                },
                            ]}
                        >
                            <ReactQuill
                                theme="snow"
                                onChange={(value) =>
                                    form.setFieldsValue({ description: value })
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Tanggal Mulai"
                            name="start_date"
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tanggal Selesai"
                            name="end_date"
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Jam Mulai"
                            name="start_time"
                        >
                            <TimePicker
                                style={{ width: "100%" }}
                                format="HH:mm"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Jam Selesai"
                            name="end_time"
                        >
                            <TimePicker
                                style={{ width: "100%" }}
                                format="HH:mm"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="is_uncertain" valuePropName="checked">
                            <Checkbox>
                                Tanggal belum pasti
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        marginLeft: 5,
                                        color: "#888",
                                    }}
                                >
                                    * Centang jika Tanggal belum pasti.
                                </span>
                            </Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Kontak"
                            name="contact"
                            rules={[
                                { required: true, message: "Masukkan kontak" },
                            ]}
                        >
                            <Input placeholder="Masukkan Kontak..." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Kewenangan"
                            name="authority"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan kewenangan",
                                },
                            ]}
                        >
                            <Input placeholder="Masukkan Kewenangan..." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Alamat"
                            name="address"
                            rules={[
                                { required: true, message: "Masukkan alamat" },
                            ]}
                        >
                            <Input placeholder="Masukkan Alamat..." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Pilih Lokasi di Peta">
                            <MapContainer
                                center={defaultLatlng}
                                zoom={12}
                                style={{
                                    height: 300,
                                    borderRadius: 8,
                                    marginBottom: 24,
                                }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker
                                    initialPosition={
                                        latlng !== null && lnglng !== null
                                            ? { lat: latlng, lng: lnglng }
                                            : null
                                    }
                                    onLocationChange={(latlng) => {
                                        form.setFieldsValue({
                                            latitude: latlng.lat,
                                            longitude: latlng.lng,
                                        });
                                    }}
                                />
                            </MapContainer>
                            <Form.Item name="latitude" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="longitude" hidden>
                                <Input />
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="is_published" valuePropName="checked">
                            <Checkbox>
                                Publish
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        marginLeft: 5,
                                        color: "#888",
                                    }}
                                >
                                    * Centang jika Acara dipublish.
                                </span>
                            </Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{ textAlign: "left" }}>
                        <Button
                            onClick={onCancel}
                            style={{ marginRight: 8 }}
                            danger
                        >
                            Batal
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={loading}
                            style={{
                                backgroundColor: "#22C55E",
                                borderColor: "#22C55E",
                            }}
                        >
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
