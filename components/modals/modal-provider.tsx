import DeleteConfirmationModal from "./delete-confirmation";
import ViewPasswordModal from "./view-password-modal";
import EditPasswordSheet from "./edit-password-sheet";

const ModalProvider = () => {
  return (
    <>
      <ViewPasswordModal />
      <DeleteConfirmationModal />
      <EditPasswordSheet />
    </>
  );
}

export default ModalProvider;
