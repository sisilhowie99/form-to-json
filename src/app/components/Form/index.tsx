"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

enum PRODUCT_TYPES {
  CRUISE = "Cruise",
  TOUR = "Tour",
  ACCOMMODATION = "Accommodation",
  FLIGHT = "Flight",
  HOLIDAY_PACKAGE = "Holiday Package",
}

interface FormData {
  productName: string
  productType: string
  productPrice: string
  productItineraries: Itinerary
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
    productItineraries: {
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
      productItineraries: {
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
      productItineraries: {
        summary: "",
        image: "",
        itineraries: [
          {
            day: 1,
            icon: "https://example.com/icon.png",
            image: "https://example.com/image.png",
            content: "Day 1 content",
          },
          {
            day: 2,
            icon: "https://example.com/icon.png",
            image: "https://example.com/image.png",
            content: "Day 2 content",
          },
        ],
      },
      productInclusions: [],
      productExclusions: [],
    })

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
          <Stack direction="row" spacing={3}>
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
