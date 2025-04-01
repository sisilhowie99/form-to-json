import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Form } from "@components/Form"

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={{ xs: 4 }} my={5}>
        <Box>
          <Typography variant="h1">Form to JSON generator</Typography>
        </Box>
        <Box>
          <Form />
        </Box>
      </Stack>
    </Container>
  )
}
