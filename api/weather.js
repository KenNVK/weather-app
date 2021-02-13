import axios from "axios";
const owmApiKey = process.env.VUE_APP_OWM_API_KEY;
const ownUrl = process.env.VUE_APP_OWM_API_URL;
export default async (req, res) => {
  const { lon, lat } = req.query;
  try {
    const response = await axios.get(
      `${ownUrl}?lon=${lon}&lat=${lat}&exclude=hourly,minutely,alerts&units=metric&appid=${owmApiKey}`
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
  }
};
