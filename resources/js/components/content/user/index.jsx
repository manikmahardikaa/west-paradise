import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import FormSelectUser from "../../common/select/user";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { UserColumns } from "./colums";

export default function UserContent() {
    const { users } = usePage().props;

    const columns = UserColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/accounts/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "User berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus user.",
                    });
                },
            });
        },
    });
    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectUser user={users} />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: 16 }}
                >
                    <AddButton
                        onClick={() => {
                            Inertia.get("/dashboard/accounts/create");
                        }}
                        title="Tambah Akun"
                    />

                    <SearchBar />
                </Flex>
                <Table columns={columns} dataSource={users} rowKey="id" />
            </Card>
        </div>
    );
}
