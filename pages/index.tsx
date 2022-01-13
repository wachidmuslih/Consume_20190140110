import { Grid, GridItem, Td, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { Navbar, Container, Nav, NavDropdown, Table, Card, ButtonGroup, Button } from 'react-bootstrap'

import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';
import { supabase } from '../utils/SupabaseClient';
import { User } from '@supabase/supabase-js';
import { datasiswa } from '../utils/Model';
async function fetchData() {
  return await axios.get('http://localhost:8080/datasiswasma/smasatu').then(res => res.data);
}
export const DefaultData = {
  nis: '',
  nama: '',
  jurusan: '',
  kelas: ''
};
const Home: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();

  const handleLogOut: MouseEventHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/signin');
    }
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [data, setData] = useState<Array<any>>([]);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<datasiswa>(DefaultData);

  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const d = fetchData().then(res => setData(res));
  }, [isDirty]);

  const toast = useToast();
  function handleSimpan(data: datasiswa) {
    const { nis, nama, kelas, jurusan } = data;
    axios.put('http://localhost:8080/datasiswasma/smasatu', {
      nama,
      jurusan,
      kelas
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
        description: "Data gagal kami simpan." + JSON.stringify({ nama, kelas, jurusan }),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
    });
    onClose();
  }

  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);
      } else {
        router.push('/login');
      }
    };

    getProfile();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        <Head>
          <title>SMA N 1</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="google-signin-client_id"
            content="672312188455-avvi7k0i412t1ba2mc89o80j5n28r09b.apps.googleusercontent.com"
          />
        </Head>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">SMA N 1</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Learn</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Explore Us</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Information</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Grid mt={4} gap={3}>
          <GridItem>
            <button>Tambah</button>
          </GridItem>
          <GridItem>
          <body>
          <Card className='mt-2'>
            <Card.Body>
              <Table striped bordered hover className='mt-2' variant="dark">
                <thead>
                  <tr>
                    <th>NIS</th>
                    <th>NAMA</th>
                    <th>KELAS</th>
                    <th>JURUSAN</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                {
                data.map((data, nis) => (
                  <Tr key={nis}>
                    <Td>{data.nis}</Td>
                    <Td>{data.nama}</Td>
                    <Td>{data.kelas}</Td>
                    <Td>{data.jurusan}</Td>
                    <Td><ButtonGroup>
                      <Button variant='outline'  onClick={() => {
                        setSelectedId(data.nis);
                        return setIsAlertOpen(true);
                      }}>Delete</Button>
                      <Button variant='outline' onClick={() => {
                        setSelectedData(data);
                        setIsEditable(true);
                        onOpen();
                      }} >Edit</Button>
                      <Button variant='outline' onClick={() => {
                        setSelectedData(data);
                        setIsEditable(false);
                        onOpen();
                      }}>Details</Button>
                    </ButtonGroup></Td>
                  </Tr>
                ))
              }
                </tbody>
              </Table>
            </Card.Body>
          </Card>

        </body>
          </GridItem>
        </Grid>
       

      </div></>
  )
}

export default Home
