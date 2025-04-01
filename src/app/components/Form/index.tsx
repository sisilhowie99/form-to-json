"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat"
import HotelIcon from "@mui/icons-material/Hotel"
import BeachAccessIcon from "@mui/icons-material/BeachAccess"
import Image from "next/image"

enum PRODUCT_TYPES {
  CRUISE = "Cruise",
  TOUR = "Tour",
  ACCOMMODATION = "Accommodation",
  FLIGHT = "Flight",
  HOLIDAY_PACKAGE = "Holiday Package",
}

const PRODUCT_ICONS = {
  [PRODUCT_TYPES.CRUISE.toLowerCase()]: <DirectionsBoatIcon />,
  [PRODUCT_TYPES.TOUR.toLowerCase()]: <DirectionsBusIcon />,
  [PRODUCT_TYPES.ACCOMMODATION.toLowerCase()]: <HotelIcon />,
  [PRODUCT_TYPES.FLIGHT.toLowerCase()]: <AirplanemodeActiveIcon />,
  [PRODUCT_TYPES.HOLIDAY_PACKAGE.toLowerCase()]: <BeachAccessIcon />,
}

interface FormData {
  productName: string
  productType: string
  productPrice: string
  productItinerary: Itinerary
  productInclusions: string[]
  productExclusions: string[]
}

interface Itinerary {
  summary?: string
  image?: string
  itineraries?: ItineraryItem[]
}

interface ItineraryItem {
  day: number
  icon?: string
  image?: string
  content?: string
}

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productType: "",
    productPrice: "",
    productItinerary: {
      summary: "",
      image: "",
      itineraries: [],
    },
    productInclusions: [],
    productExclusions: [],
  })
  const [jsonOutput, setJsonOutput] = useState("")

  useEffect(() => {
    setJsonOutput(JSON.stringify(formData, null, 2))
  }, [formData])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    console.log("select changed ", e.target)
    setFormData({ ...formData, [name]: value })
  }

  const handleGenerateJson = () => {
    console.log("JSON output ", JSON.stringify(formData, null, 2))
    setJsonOutput(JSON.stringify(formData, null, 2))
  }

  const handleReset = () =>
    setFormData({
      productName: "",
      productType: "",
      productPrice: "",
      productItinerary: {
        summary: "",
        image: "",
        itineraries: [],
      },
      productInclusions: [],
      productExclusions: [],
    })

  const handleFillForm = () =>
    setFormData({
      productName: "Product XYZ",
      productType: PRODUCT_TYPES.CRUISE,
      productPrice: "1000",
      productItinerary: {
        summary: "This is a summary of the product's itinerary",
        image: "https://picsum.photos/id/49/1280/792",
        itineraries: [
          {
            day: 1,
            icon: "cruise",
            image: "https://picsum.photos/id/11/2500/1667",
            content: "Day 1 content",
          },
          {
            day: 2,
            icon: "accommodation",
            image: "https://picsum.photos/200",
            content: "Day 2 content",
          },
        ],
      },
      productInclusions: [],
      productExclusions: [],
    })

  const addItinerary = () => {
    const newItinerary: ItineraryItem = {
      day: formData.productItinerary?.itineraries
        ? formData.productItinerary?.itineraries.length + 1
        : 1,
      icon: "",
      image: "",
      content: "",
    }
    setFormData({
      ...formData,
      productItinerary: {
        ...formData.productItinerary,
        itineraries: [
          ...(formData.productItinerary?.itineraries ?? []),
          newItinerary,
        ],
      },
    })
  }

  const removeItinerary = (day: number) => {
    const filteredItineraries = formData.productItinerary?.itineraries?.filter(
      (itinerary) => itinerary.day !== day
    )

    // update the day numbers of the remaining itineraries
    const updatedItineraries = filteredItineraries?.map((itinerary, index) => ({
      ...itinerary,
      day: index + 1,
    }))

    setFormData({
      ...formData,
      productItinerary: {
        ...formData.productItinerary,
        itineraries: updatedItineraries,
      },
    })
  }

  const handleItineraryChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target
    const [type, day] = name.split("-") // Split the name to get the type and day number
    const parsedDay = parseInt(day, 10) // Extract the day number from the name
    const targetItinerary = formData.productItinerary?.itineraries?.find(
      (itinerary) => itinerary.day === parsedDay
    )

    if (!targetItinerary) return

    const updatedItinerary =
      formData.productItinerary?.itineraries?.indexOf(targetItinerary)

    if (updatedItinerary === -1) return

    // Update the specific itinerary based on the type (icon, image, content)
    const updatedItineraries = [
      ...(formData.productItinerary?.itineraries as ItineraryItem[]).slice(
        0,
        updatedItinerary
      ),
      {
        ...targetItinerary,
        [type]: value,
      },
      ...(formData.productItinerary?.itineraries as ItineraryItem[]).slice(
        (updatedItinerary as number) + 1
      ),
    ]

    setFormData({
      ...formData,
      productItinerary: {
        ...formData.productItinerary,
        itineraries: updatedItineraries,
      },
    })
  }

  const handleProductItineraryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const type = name.split("-")[1] // name should always be productItinerary-[type]

    setFormData({
      ...formData,
      productItinerary: {
        ...formData.productItinerary,
        [type]: value,
      },
    })
  }

  return (
    <Grid container direction="row" spacing={4} size={{ xs: 12, md: 6 }}>
      <Grid
        container
        direction="column"
        spacing={2}
        size={{ xs: 12, md: 6 }}
        border="1px solid lightgrey"
        borderRadius={2}
        p={2.5}
      >
        <Grid>
          <TextField
            fullWidth
            name="productName"
            label="Product name"
            aria-label="Product name"
            placeholder="Product XYZ"
            onChange={handleChange}
            value={formData.productName}
          />
        </Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="productType-label">Product Type</InputLabel>
            <Select
              fullWidth
              name="productType"
              labelId="productType-label"
              id="demo-simple-select-helper"
              value={formData.productType}
              label="Product Type"
              onChange={handleSelectChange}
            >
              <MenuItem value="">Select product type</MenuItem>
              {Object.values(PRODUCT_TYPES).map((productType) => (
                <MenuItem key={productType} value={productType}>
                  {productType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <TextField
            fullWidth
            name="productPrice"
            label="Product price"
            aria-label="Product price"
            placeholder="199.99"
            onChange={handleChange}
            value={formData.productPrice}
          />
        </Grid>
        <Grid>
          {formData.productItinerary?.summary?.length ||
          formData.productItinerary?.itineraries?.length ? (
            <>
              <Typography variant="h4" mb={2}>
                Itineraries
              </Typography>
              <Stack spacing={2} mb={2}>
                <TextField
                  fullWidth
                  name="productItinerary-summary"
                  label="Summary"
                  aria-label="Summary"
                  placeholder="Product XYZ summary"
                  onChange={handleProductItineraryChange}
                  value={formData.productItinerary?.summary}
                />
                <TextField
                  fullWidth
                  name="productItinerary-image"
                  label="Image URL"
                  aria-label="Image URL"
                  placeholder="https://picsum.photos/200"
                  onChange={handleProductItineraryChange}
                  value={formData.productItinerary?.image}
                />
                {formData.productItinerary?.image && (
                  <Image
                    src={formData.productItinerary?.image}
                    width="500"
                    height="200"
                    alt={formData.productName}
                  />
                )}
              </Stack>
            </>
          ) : null}
          {formData.productItinerary?.itineraries?.map((itinerary, idx) => (
            <Stack
              key={itinerary.day}
              spacing={2}
              mb={2}
              border="1px solid lightgrey"
              borderRadius={2}
              p={2.5}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Day {itinerary.day}</Typography>
                <DeleteIcon
                  color="error"
                  onClick={() => removeItinerary(itinerary.day)}
                  sx={{ cursor: "pointer" }}
                />
              </Stack>
              <Stack
                mb={
                  formData.productItinerary?.itineraries &&
                  formData.productItinerary?.itineraries?.length >= 1
                    ? 2
                    : 0
                }
                spacing={2}
              >
                <FormControl fullWidth>
                  <InputLabel id="icon-label">Icon</InputLabel>
                  <Select
                    fullWidth
                    name={`icon-${itinerary.day}`}
                    labelId="icon-label"
                    value={itinerary.icon}
                    label="Icon"
                    onChange={(e: SelectChangeEvent<string>) =>
                      handleItineraryChange(e)
                    }
                    startAdornment={
                      itinerary.icon ? (
                        <InputAdornment position="start">
                          {PRODUCT_ICONS[itinerary.icon as string]}
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="">Select icon</MenuItem>
                    {Object.values(PRODUCT_TYPES).map((type) => (
                      <MenuItem key={type} value={type.toLowerCase()}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  name={`image-${itinerary.day}`}
                  label="Image URL"
                  aria-label="Image URL"
                  placeholder="https://picsum.photos/200"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleItineraryChange(e)
                  }
                  value={formData.productItinerary?.itineraries?.[idx].image}
                />
                {itinerary.image && (
                  <Image
                    src={itinerary.image}
                    width="500"
                    height="200"
                    alt={`Day ${itinerary.day} image`}
                  />
                )}
                <TextField
                  fullWidth
                  name={`content-${itinerary.day}`}
                  label={`Day ${itinerary.day} content`}
                  aria-label={`Day ${itinerary.day} content`}
                  placeholder={`Departing from city`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleItineraryChange(e)
                  }
                  value={formData.productItinerary?.itineraries?.[idx].content}
                />
              </Stack>
            </Stack>
          ))}
          <Button variant="contained" color="success" onClick={addItinerary}>
            Add itinerary
          </Button>
        </Grid>
        <Grid>
          <Stack
            direction="row"
            spacing={3}
            border="1px solid lightgrey"
            borderRadius={2}
            p={2.5}
            mt={4}
          >
            <Button variant="contained" onClick={handleGenerateJson}>
              Generate JSON!
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleFillForm}
            >
              Fill form
            </Button>
            <Button variant="contained" color="warning" onClick={handleReset}>
              Reset form
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        direction="column"
        border="1px solid lightgrey"
        borderRadius={2}
        p={2.5}
      >
        <Grid>
          <Typography variant="h4">JSON Output</Typography>
          <Box
            sx={{
              my: 5,
              p: 5,
              backgroundColor: "lightgrey",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              overflow: "auto",
              minHeight: "400px",
              whiteSpace: "pre-wrap",
            }}
          >
            {jsonOutput}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
