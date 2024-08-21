import DeleteConfirmationModal from "./delete-confirmation";
import ViewPasswordModal from "./view-password-modal";
import EditPasswordSheet from "./edit-password-sheet";
import CreatePasswordModal from "./create-password-modal";

const ModalProvider = () => {
  return (
    <>
      <ViewPasswordModal />
      <DeleteConfirmationModal />
      <EditPasswordSheet />
      <CreatePasswordModal />
    </>
  );
}

export default ModalProvider;
