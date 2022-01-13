import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ModalDataProps } from "../utils/Model";


export function ModalData({ isOpen, onClose, data, handleSimpan, isEditable = true, Judul = "Tambah Data" }: ModalDataProps) {
  const [nis, setNis] = useState(data.nis);
  const [nama, setNama] = useState(data.nama);
  const [jurusan, setJurusan] = useState(data.jurusan);
  const [kelas, setKelas] = useState(data.kelas);

  useEffect(() => {
    setNis(data.nis);
    setNama(data.nama);
    setJurusan(data.jurusan);
    setKelas(data.kelas);
  }, [data]);

  const handleSave = useCallback(
    () => {
      handleSimpan({ nis, nama, jurusan, kelas });
      onClose();
    },
    [handleSimpan, nis, nama, jurusan, kelas, onClose]
  );

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{Judul}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb='8px'>NIS</Text>
        <Input placeholder="NIS" value={nis} onChange={(e) => setNis(e.target.value)} />
        <Text mb='8px'>Nama</Text>
        <Input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        <Text mb='8px'>Kelas</Text>
        <Input placeholder="Kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} />
        <Text mb='8px'>Jurusan</Text>
        <Input placeholder="Jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
      </ModalBody>

      <ModalFooter>
        {isEditable && (
          <><Button colorScheme='blue' mr={3} onClick={handleSave}>
            Simpan
          </Button>
            <Button variant='ghost' onClick={onClose}>Batal</Button></>)}
      </ModalFooter>
    </ModalContent>
  </Modal>;
}