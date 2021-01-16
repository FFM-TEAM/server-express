import { Box, Button, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../components/InputField";
import React from "react";
import Wrapper from "../components/Wrapper";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface Props {}

function Register(props: Props) {
  const [, register] = useRegisterMutation()

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
          response.data.register?.user?.id
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              회원가입
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Register;
