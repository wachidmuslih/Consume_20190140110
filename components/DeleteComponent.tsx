import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import axios from 'axios';

export function DeleteConfirm({ nis, isAlertOpen, setIsAlertOpen }: any) {

  const onAlertClose = () => setIsAlertOpen(false);
  const cancelRef = useRef();
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/datasiswasma/smasatu/{nis}`);
    onAlertClose();
  };
  return (<AlertDialog
    isOpen={isAlertOpen}
    leastDestructiveRef={cancelRef}
    onClose={onAlertClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Delete Pet {nis}?
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You cannot undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onAlertClose}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={handleDelete} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>);
}
