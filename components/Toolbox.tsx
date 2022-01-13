import { Button, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { DefaultData } from '../pages/index';
import { datasiswa } from "../utils/Model";
import { ModalData } from "./ModalData";

export function Toolbox() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  function handleSimpan(data: datasiswa) {
    const { nis, nama, kelas, jurusan} = data;
    axios.post('http://localhost:8080/datasiswasma/smasatu', {
        nama, kelas, jurusan
    }).then(res => {
      toast({
        title: 'Sukses.',
        description: "Data sudah kami simpan." + JSON.stringify({ nama, kelas, jurusan }),
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
    }).catch(err => {
      toast({
        title: 'Gagal.',
        description: "Data gagal kami simpan." + JSON.stringify({ nama, kelas, jurusan}),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
    });
    onClose();
  }
  return (
    <>
      <Button onClick={onOpen}>Tambah</Button>

      <ModalData isOpen={isOpen} onClose={onClose} data={DefaultData} handleSimpan={e => handleSimpan(e)} />
    </>
  );
}
