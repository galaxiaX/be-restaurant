import { Request, Response } from "express";
import axios from "axios";

class JenosizeController {
  public async searchRestaurants(req: Request, res: Response): Promise<void> {
    const { location = "bangkok", keyword = "food", radius = 3000 } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${location}&radius=${radius}&type=restaurant&key=${process.env.GOOGLE_API_KEY}`;

    try {
      const response = await axios.get(url);
      const restaurants = response.data.results.map((result: any) => ({
        name: result.name,
        address: result.formatted_address,
        rating: result.rating,
        status: result.business_status,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        placeId: result.place_id,
        photoUrl: result.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`
          : undefined,
      }));
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while searching for restaurants");
    }
  }
}

export default JenosizeController;
