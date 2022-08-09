import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Box, Group } from "@mantine/core";
import axios from "axios";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters" }),
});

const Login = ({ loginHandle }) => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        values
      );

      loginHandle(true, {
        message: "user successfully logged in",
        user: response.data.data,
      });
    } catch (e) {
      loginHandle(false, { message: e.response.data.error });
    }
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          mt="sm"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Login;
