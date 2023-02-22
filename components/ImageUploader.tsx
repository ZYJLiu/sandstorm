import {
  Text,
  Spinner,
  Input,
  Stack,
  Image,
  Container,
  AspectRatio,
  Box,
  Heading,
} from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { metaplex } from "../utils/metaplex"
import {
  MetaplexFile,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js"
import axios from "axios"

interface ImageUploaderProps {
  imageUrl: string
  setImageUrl: (imageUrl: string) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const [loading, setLoading] = useState(false)

  // upload image
  const handleImage = async (event: any) => {
    console.log("test")
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", event.target.files[0])

      try {
        console.log("2")
        const response = await axios.post("/api/aws", formData)

        if (response) {
          console.log("File uploaded successfully")
          console.log(response.data)
          setImageUrl(response.data.imageUri)
        } else {
          console.error("Error uploading file")
        }
      } catch (err) {
        console.error("Error uploading file:", err)
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <Container centerContent my="5">
      <AspectRatio width="60" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              {loading ? (
                <Stack
                  height="100%"
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner size="lg" color="blue.500" />
                </Stack>
              ) : imageUrl ? (
                <Image src={imageUrl} />
              ) : (
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="white" fontWeight="bold">
                      Drop image here
                    </Heading>
                    <Text fontWeight="light">Click to upload image</Text>
                  </Stack>
                </Stack>
              )}
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onChange={handleImage}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  )
}
