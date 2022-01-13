

export type datasiswa = { 
    nis: string;
     nama: string;
      jurusan: string;
       kelas: string; };

export type ModalDataProps = { isOpen: boolean;
    onClose: () => void;
     data: datasiswa; 
     handleSimpan: (e: datasiswa) => void;
      isEditable?: boolean;
       Judul?: string; };
