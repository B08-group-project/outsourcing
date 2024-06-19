import supabase from "../../supabase/supabase";

export const createCourse = async (coursePlaces) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const result = await supabase.from("course").insert({ user_id: user.id }).select();

  for (const place of coursePlaces) {
    const placesData = {
      course_id: result.data[0].id,
      address_name: place.address_name,
      id: place.id,
      phone: place.phone,
      place_name: place.place_name,
      place_url: place.place_url,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
    };
    await createCoursePlaces(placesData);
  }
};

const createCoursePlaces = async (placesData) => {
  try {
    const result = await supabase.from("course_places").insert({
      id: placesData.id,
      course_id: placesData.course_id,
      place_name: placesData.place_name,
      road_address_name: placesData.road_address_name,
      address_name: placesData.address_name,
      phone: placesData.phone,
      place_url: placesData.place_url,
      x: placesData.x,
      y: placesData.y,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
