import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../components/InputField";
import React from "react";
import Wrapper from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function Register() {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
            router.push("/");
          }
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
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
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

export default withUrqlClient(createUrqlClient)(Register);
