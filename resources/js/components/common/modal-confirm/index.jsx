import { Modal } from "antd";

export default function ModalConfirm({
    title,
    description,
    actions,
    onOk,
    onCancel,
}) {
    const modalConfig = Modal.confirm({
        title: "Kamu yakin?",
        content: (
            <p>
                Apakah Anda yakin ingin melanjutkan <b>{actions.toUpperCase()}</b> untuk <b>{title.toUpperCase()}</b>: <b>{description}</b>? Tindakan ini tidak dapat dibatalkan. Apakah Anda ingin melanjutkan?
            </p>
        ),
        onOk: onOk,
        onCancel: onCancel,
    });

    return modalConfig;
}
