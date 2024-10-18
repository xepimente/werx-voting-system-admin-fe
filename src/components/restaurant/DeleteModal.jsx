import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";

export default function DeleteModal({ isOpen, onClose, buttonClick }) {
  return (
    <>
      <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto h-full w-full">
          <ModalBody>
            <div className="!z-[1] mx-auto mt-48 flex max-w-[450px] flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700 md:mt-5">
              <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
                <h1 className="mb-[20px] text-2xl font-bold">Are you sure you want to delete?</h1>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => buttonClick(isOpen)}
                  className="linear rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}