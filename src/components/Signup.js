import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import axios from "axios";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 4 letters" }),
  email: z.string().email({ message: "Invalid email" }),
});

const Signup = ({ signupHandle }) => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
    },
  });

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        values
      );
      signupHandle(true, response.data.message);
    } catch (e) {
      signupHandle(false, e.response.data.error);
    }
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSignup(values))}>
        <TextInput
          required
          label="Name"
          placeholder="Naveed Ahsan"
          mt="sm"
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          mt="sm"
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Signup</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Signup;
