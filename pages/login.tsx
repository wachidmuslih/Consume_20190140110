import React, { MouseEventHandler, useState } from 'react';

import { useRouter } from 'next/router';

import { supabase } from '../utils/SupabaseClient';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            alert(JSON.stringify(error));
        } else {
            router.push('/');
        }
    };

    const handleSignInWithGitHub: MouseEventHandler = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signIn(
            {
                provider: 'google',
            }, {
            redirectTo: 'http://localhost:3000/callback/',
        }
        );

        if (error) {
            alert(JSON.stringify(error));
        }
    };

    return (<>
        <Container>
            <Flex width="full" align="center" justifyContent="center">
                <Box p={2}>
                    <Box textAlign="center">
                        <Heading>Login</Heading>
                    </Box>
                    <Box my={4} borderRadius={6} boxShadow={'1px solid gray'} textAlign="left">

                        <form onSubmit={handleSignIn}>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="test@test.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Button width="full" mt={4} type="submit">
                                Sign In
                            </Button>

                            <Text align={"center"} mt={4}>Or</Text>

                            <Button mt={4} width="full"
                                onClick={handleSignInWithGitHub}
                            >
                                Sign In with Google
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </Container>
    </>
    );
};

export default Login;;