import axios from "axios";
const mapboxKey = process.env.VUE_APP_MAPBOX_API_KEY;
const mapboxUrl = process.env.VUE_APP_MAPBOX_API_URl;
export default async (req, res) => {
  const { lon, lat } = req.query;
  try {
    const response = await axios.get(
      `${mapboxUrl}/${lon},${lat}.json?access_token=${mapboxKey}&types=country,place&limit=1`
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
  }
};
